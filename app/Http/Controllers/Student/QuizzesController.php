<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\QuestionMCQ;
use App\Models\QuizQuestions;
use App\Models\QuizStudentGrade;
use App\Models\Quizzes;
use App\Models\Subjects;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizzesController extends Controller {

  function list() {
    $user = Auth::user();
    return inertia('Student/Quizzes/List', [
      'quizzes' => Quizzes::with('year', 'subject')->where('year', $user->year)->orderBy('id', 'desc')->get(),
      'subjects' => Subjects::where('year', $user->year)->with('quizzes')->get(),
    ]);
  }
  function viewSubjectQuizzes(Subjects $subject) {
    $user = Auth::user();

    return inertia('Student/Quizzes/ViewSubjectQuizzes', [
      'quizzes' => Quizzes::with('year', 'subject')
        ->where('year', $user->year)
        ->where('subject', $subject->id)
        ->orderBy('id', 'desc')->get(),
      'subject' => $subject
    ]);
  }

  function joinQuizView(Quizzes $quiz) {

    $student =  Auth::user();

    $startingDate = Carbon::parse($quiz->start);
    $oldMinutes = $startingDate->format('i');

    $startingDate->setMinutes($oldMinutes + $quiz->minutes);

    return inertia('Student/Quizzes/JoinQuiz', [
      'quiz' => Quizzes::with([
        'subject',
        'year' => fn($q) => $q->with(['department']),
        'professor',
        'questions' => fn($q) => $q->with([
          'mcq' => fn($q) => $q->with([
            'student_answers' => fn($q) => $q->with('answer')
          ])
        ])
      ])->where('id', $quiz->id)->get()->first(),
      'quiz_answers' => QuizStudentGrade::with([
        'student',
        'quiz',
        'question' => fn($q) => $q->with('mcq'),
        'answer'
      ])->where('quiz', $quiz->id)->where('student', $student->getAuthIdentifier())->get(),
    ]);

  }

  function addAnswer(Request $request) {
    $user = Auth::user();

    $question = QuizQuestions::where('id', $request->input('questionID'))->get()->first();
    $mcq = QuestionMCQ::where('id', $request->input('answer'))->get()->first();

    $findQuizQuestionAnswer = QuizStudentGrade::where([
      'student' => $user->id,
      'question' => $question->id,
    ])->exists();

    if ($question != null && $mcq != null && !$findQuizQuestionAnswer) {

      QuizStudentGrade::create([
        'quiz' => $request->input('quiz'),
        'question' => $question->id,
        'student' => $user->id,
        'answer' => $mcq->id,
        'grade' => $question->answer == $mcq->title ? 1 : 0,
      ]);
    } else {
      QuizStudentGrade::where([
        'quiz' => $request->input('quiz'),
        'question' => $question->id,
        'student' => $user->id,
      ])->update([
        'answer' => $mcq->id,
        'grade' => $question->answer == $mcq->title ? 1 : 0,
      ]);
    }

  }

  function findAnswer(Request $request) {
    $user = Auth::user();
    $findQuizQuestionAnswer = QuizStudentGrade::where([
      'student' => $user->id,
      'question' => $request->input('question'),
      'quiz' => $request->input('quiz')
    ])->with('answer')->get();

    return $findQuizQuestionAnswer;
  }

  function viewAnswers(Quizzes $quiz) {
    $student = Auth::user();

    return inertia('Student/Quizzes/ViewAnswers', [
      'answers' => QuizStudentGrade::with([
        'quiz',
        'student',
        'question' => fn($q) => $q->with('mcq'),
        'answer'
      ])->where('quiz', $quiz->id)
        ->where('student', $student->getAuthIdentifier())
        ->get(),
      'quiz' => Quizzes::with('subject', 'professor')->withCount('questions')->where('id', $quiz->id)->get()->first()
    ]);
  }

}
