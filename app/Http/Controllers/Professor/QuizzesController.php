<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\QuestionMCQ;
use App\Models\QuizQuestions;
use App\Models\QuizStudentGrade;
use App\Models\Quizzes;
use App\Models\Student;
use App\Models\Subjects;
use App\Models\YearsCourses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\Console\Question\Question;

class QuizzesController extends Controller {

  // List Quizzes
  public function quizzesList(YearsCourses $year = null) {
    if ($year == null) {
      return inertia('Professor/Quizzes/List/List', [
        'quizzes' => Quizzes::with('subject', 'questions')->get(),
        'subjects' => Subjects::all(),
        'semesters' => YearsCourses::all()
      ]);
    }
    return inertia('Professor/Quizzes/List/List', [
      'quizzes' => Quizzes::with('subject', 'questions')->where('year', $year->id)->get(),
      'year' => $year,
      'subjects' => Subjects::all(),
      'semesters' => YearsCourses::all()
    ]);
  }

  // Create quiz
  public function createQuizView() {
    return inertia('Professor/Quizzes/Create/CreateQuiz', [
      'subjects' => Subjects::select('title', 'id', 'code', 'department')->get(),
      'years' => YearsCourses::select('title', 'id', 'term_name', 'department')->get()
    ]);
  }
  public function createQuizAction(Request $request) {

    $request->validate([
      'title' => 'required|min:10|max:255',
      'information' => 'required|min:10|max:1500',
      'subject' => 'required|exists:subjects,id',
      'year' => 'required|exists:year_courses,id',
      'start' => 'required|date',
      'end' => 'required|date|after:start',
      'grade' => 'required|integer|lt:100',
      'numberOfQuestions' => 'required|integer|lte:100'
    ]);

    $quiz = Quizzes::create([
      'title' => $request->input('title'),
      'information' => $request->input('information'),
      'subject' => $request->input('subject'),
      'year' => $request->input('year'),
      'start' => $request->input('start'),
      'end' => $request->input('end'),
      'grade' => $request->input('grade'),
      'minutes' => $request->input('time')
    ]);

    $arrOfQ = [];
    $arrOfM = [];
    for ($i = 1; $i <= (int)$request->input('numberOfQuestions'); $i++) {
      $arrOfQ[] = $i;
    }
    for ($i = 1; $i <= (int)$request->input('numberOfMcq'); $i++) {
      $arrOfM[] = $i;
    }

    foreach ($arrOfQ as $key => $val) {
      $createdQuestion = QuizQuestions::create([
        'quiz' => $quiz->id,
        'title' => 'N/A',
        'answer' => 'N/A',
        'grade' => 1
      ]);

      foreach ($arrOfM as $k => $v) {
        QuestionMCQ::create([
          'title' => 'N/A',
          'question' => $createdQuestion->id,
          'is_correct' => 0,
          'type' => 0
        ]);
      }
    }

    message('Quiz has been created');
    return to_route('professors.quiz.view', $quiz->id);

  }

  // Update quiz
  public function updateQuizView(Quizzes $quiz) {
    return inertia('Professor/Quizzes/Update/UpdateQuiz', [
      'subjects' => Subjects::select('title', 'id', 'code', 'department')->get(),
      'quiz' => $quiz->with('subject', 'year')->find($quiz->id),
      'years' => YearsCourses::select('title', 'id', 'term_name', 'department')->get()
    ]);
  }
  public function updateQuizAction(Request $request, Quizzes $quiz) {

    $request->validate([
      'title'       => 'required|min:10|max:255',
      'information' => 'required|min:10|max:1500',
      'start'       => 'required|date',
      'end'         => 'required|date|after:start',
      'grade'       => 'required|integer',
      'time'        => 'required|gt:0',
      'status'      => 'required|in:0,1,2'
    ]);

    Quizzes::where('id', $quiz->id)->update([
      'title' => $request->input('title'),
      'information' => $request->input('information'),
      'start' => $request->input('start'),
      'end' => $request->input('end'),
      'grade' => $request->input('grade'),
      'minutes' => $request->input('time'),
      'status' => $request->input('status')
    ]);

    message('Quiz with id: #' . $quiz->id . ' has been update');
    return to_route('professors.quiz.view', $quiz->id);
  }

  // View2 Quiz
  public function quizView(Quizzes $quiz) {
    return inertia('Professor/Quizzes/View/View', [
      'quiz' => Quizzes::with([
        'questions' => fn($q) => $q->with('mcq'),
        'subject' => fn($q) => $q->with([
          'chapters',
          'department' => fn($q) => $q->select('id', 'title')
        ])
      ])->find($quiz->id)
    ]);
  }

  // Make MCQ Correct
  public function makeMCQCorrect(QuestionMCQ $mcqID) {
    QuestionMCQ::where('id', '!=', $mcqID->id)
      ->where('question', $mcqID->question)->update([
      'is_correct' => 0,
    ]);
    QuestionMCQ::where('id', $mcqID->id)
      ->where('question', $mcqID->question)->update([
      'is_correct' => 1,
    ]);
    QuizQuestions::where('id', $mcqID->question)->update([
      'answer' => $mcqID->title
    ]);
  }

  // Change MCQ Title Value
  public function changeMCQTitle(Request $request, QuestionMCQ $mcqID) {
    QuestionMCQ::where('id', $mcqID->id)->update([
      'title' => $request->input('mcq_title'),
    ]);
  }

  // Change MCQ Title Value
  public function changeQuestionTitle(Request $request, QuizQuestions $question) {

    QuizQuestions::where('id', $question->id)->update([
      'title' => $request->input('title'),
    ]);
  }

  // Create Question
  public function createQuestionView(Quizzes $quiz) {
    return inertia('Professor/Quizzes/CreateQuestion/CreateQuestion', [
      'quiz' => Quizzes::with('subject', 'questions')->find($quiz->id),
    ]);
  }
  public function createQuestionAction(Request $request, Quizzes $quiz) {
    $request->validate([
      'title' => 'required|min:10',
      'grade' => 'required|integer|gt:0|lte:5',
      'answer' => 'required|min:1',
      'numberOfMCQ' => 'required|integer|gt:0'
    ]);

    $fileName = null;

    if ($request->hasFile('file')) {
      $request->validate([
        'file' => 'mimes:jpg,png,jpeg,gif,mp4',
        'file.*' => 'mimes:jpg,png,jpeg,gif,mp4',
      ]);

      $file = $request->file('file');
      $generatedFileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(QUIZ_FILES_TARGET, $generatedFileName);

      $fileName = QUIZ_FILES_TARGET . $generatedFileName;

    }

    $createdQuestion = QuizQuestions::create([
      'image' => $fileName,
      'title' => $request->input('title'),
      'answer' => $request->input('title'),
      'grade' => $request->input('grade'),
      'quiz' => $quiz->id
    ]);

    $mcqVals = [];
    for ($i = 1; $i <= (int)$request->input('numberOfMCQ'); $i++) {
      $mcqVals[] = $i;
    }

    foreach ($mcqVals as $key => $val) {
      QuestionMCQ::create([
        'title' => 'N/A',
        'question' => $createdQuestion->id,
        'is_correct' => 0,
        'type' => 0
      ]);
    }

    message('Question has been updated successfully!');
    return to_route('professors.quiz.view', $quiz->id);

  }

  // Update Question & Its MCQs
  public function updateQuestionView(QuizQuestions $question) {
    return inertia('Professor/Quizzes/UpdateQuestion/UpdateQuestion', [
      'question' => QuizQuestions::with('mcq')->find($question->id),
      'quiz' => Quizzes::with('subject')->find($question->quiz),
    ]);
  }
  public function updateQuestionAction(Request $request, QuizQuestions $question) {
    $request->validate([
      'title' => 'required|min:10',
      'grade' => 'required|integer|gt:0|lte:5',
      'answer' => 'required|min:1',
    ]);

    $fileName = $question->image;

    if ($request->hasFile('file')) {
      $request->validate([
        'file' => 'mimes:jpg,png,jpeg,gif,mp4',
        'file.*' => 'mimes:jpg,png,jpeg,gif,mp4',
      ]);

      $file = $request->file('file');
      $generatedFileName = generateFileName() . $file->getClientOriginalExtension();
      $file->move(QUIZ_FILES_TARGET, $generatedFileName);

      $fileName = QUIZ_FILES_TARGET . $generatedFileName;

    }

    QuizQuestions::where('id', $question->id)->update([
      'image' => $fileName,
      'title' => $request->input('title'),
      'answer' => $request->input('title'),
      'grade' => $request->input('grade')
    ]);

    message('Question has been updated successfully!');
    return to_route('professors.quiz.view', $question->quiz);

  }

  // Create MCQ for specific question
  public function createQuestionMCQ(Request $request, QuizQuestions $question) {
    $request->validate([
      'title' => 'required|min:1'
    ]);
    QuestionMCQ::create([
      'title' => $request->input('title'),
      'question' => $question->id,
    ]);
    message('Question ' . $question->title . ' MCQ has been added!');
  }

  // Delete MCQ
  public function deleteQuestionMCQ(Request $request, QuestionMCQ $mcqID) {
    $mcqID->delete();
    message('MCQ ' . $mcqID->title . ' has been deleted!', 'warning');
  }

  // Delete Question
  public function deleteQuestionAction(Request $request, QuizQuestions $question) {
    $question->delete();
    message('Question for quiz id: ' . $question->id . ' has been deleted!', 'warning');
  }

  // Quiz Answers List
  public function quizAnswersView(Quizzes $quiz) {
    return inertia('Professor/Quizzes/Answers/Answers', [
      'quiz' => $quiz->with([
        'subject' => fn($q) => $q->with('chapters'),
        'year',
      ])->find($quiz->id),
      'answers' => QuizStudentGrade::select('id', 'student', 'quiz')->groupBy('quiz','id', 'student',)->get(),
      'studentsWithAnswers' => Student::with([
        'quizzes_answers' => fn($q) => $q->with('answer', 'question')->where('quiz', $quiz->id)
      ])->get()
    ]);
  }

  // {student} answer for {quiz}
  public function answersOfStudentView(Quizzes $quiz, Student $student) {
    return inertia('Professor/Quizzes/StudentAnswer/StudentAnswer', [
      'quiz' => $quiz->with([
        'subject' => fn($q) => $q->with('chapters'),
        'questions' => fn($q) => $q->with('mcq'),
        'year',
      ])->find($quiz->id),
      'student' => Student::with([
        'quizzes_answers' => fn($q) => $q->with([
          'answer',
          'question' => fn($q) => $q->with('mcq')
        ])->where('quiz', $quiz->id)->where('student', $student->id),
        'department'
      ])->find($student->id)
    ]);
  }


}
