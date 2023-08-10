<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Department;
use App\Models\SubjectGrades;
use App\Models\Subjects;
use Illuminate\Http\Request;

class SubjectsController extends Controller {
  public function list() {
    return inertia('Professor/Subjects/Subjects/Subjects', [
      'subjects' => Subjects::orderBy('id', 'desc')->with('department')->withCount('chapters')->get()
    ]);
  }

  // Create Subject
  public function createSubjectView(Department $department = null) {
    return inertia('Professor/Subjects/Create/CreateSubject', [
      'subjects' => Subjects::where('department', professor()->getAuthIdentifier())->with('department')->withCount('chapters')->get(),
      'departments' => Department::select('id', 'title')->orderBy('id', 'desc')->get(),
      'department' => $department ? $department : null
    ]);
  }
  public function createSubjectAction(Request $request, Department $department = null) {
    $request->validate([
      'name' => 'required|min:3|max:255',
      'code' => 'required|min:3|max:50|unique:subjects|alphaNum',
      'information' => 'required|min:15',
      'department' => 'required|integer|exists:departments,id'
    ]);

    $fileName = '';
    if ($request->hasFile('reference')) {
      $file = $request->file('reference');
      $fileName = generateFileName() . $file->getClientOriginalExtension();
      $request->file('reference')->move(SUBJECT_REFERENCE, $fileName);
    }

    Subjects::create([
      'title' => $request->input('name'),
      'code' => $request->input('code'),
      'reference' => $fileName == '' ? null : SUBJECT_REFERENCE . $fileName,
      'information' => $request->input('information'),
      'department' => $department ? $department->id : $request->input('department'),
    ]);

    message('Subject has been added successfully!');
    return to_route('professors.subjects.list');
  }

  // Update Reference
  public function updateSubjectView(Subjects $subject) {
    return inertia('Professor/Subjects/Update/UpdateSubject', [
      'subjects' => Subjects::where('department', professor()->getAuthIdentifier())->with('department')->withCount('chapters')->get(),
      'departments' => Department::select('id', 'title')->orderBy('id', 'desc')->get(),
      'subject' => Subjects::with('department')->find($subject->id)
    ]);
  }
  public function updateSubjectAction(Request $request, Subjects $subject) {
    $request->validate([
      'name' => 'required|min:3|max:255',
      'information' => 'required|min:15',
      'department' => 'required|integer|exists:departments,id'
    ]);

    $fileName = '';
    if ($request->hasFile('reference')) {
      $file = $request->file('reference');
      $fileName = generateFileName() . $file->getClientOriginalExtension();
      $request->file('reference')->move(SUBJECT_REFERENCE, $fileName);
    }

    Subjects::where('id', $subject->id)->update([
      'title' => $request->input('name'),
      'reference' => $fileName == '' ? null : SUBJECT_REFERENCE . $fileName,
      'information' => $request->input('information'),
      'department' => $request->input('department'),
    ]);

    message('Subject has been updated successfully!');
    return to_route('professors.subjects.list');
  }

  // Subject chapters
  public function subjectChapters(Subjects $subject) {
    return inertia('Professor/Subjects/Chapters/SubjectChapters', [
      'subject' => Subjects::with([
        'department',
        'chapters' => fn($q) => $q->orderBy('number')
      ])
        ->find($subject->id)
    ]);
  }

  // Subject default grades
  public function defaultGradesView(Subjects $subject) {
    return inertia('Professor/Subjects/DefaultGrades/DefaultGrades', [
      'subject' => Subjects::with([
        'department',
        'grades',
      ])->withCount('chapters')->find($subject->id),
    ]);
  }
  public function defaultGradesAction(Request $request, Subjects $subject) {
    $request->validate([
      'oral' => 'required|integer|gte:0',
      'lab' => 'required|integer|gte:0',
      'quizzes' => 'required|integer|gte:0',
      'assignments' => 'required|integer|gte:0',
      'smart' => 'required|integer|gte:0',
      'final' => 'required|integer|gt:0',
      'midterm' => 'required|integer|gte:0',
    ]);
    $grades = [
      'oral' => $request->input('oral'),
      'lab' => $request->input('lab'),
      'quizzes' => $request->input('quizzes'),
      'assignments' => $request->input('assignments'),
      'smart' => $request->input('smart'),
      'final' => $request->input('final'),
      'midterm' => $request->input('midterm'),
    ];
    $type = $request->input('type');

    if ($type == 'update') {
      $totalGrade = 0;
      foreach ($grades as $key => $value) {
        $totalGrade += $value;
      }
      SubjectGrades::where('subject', $subject->id)->update([
        'total' => $totalGrade,
        'oral' => $grades['oral'],
        'lab' => $grades['lab'],
        'quizzes' => $grades['quizzes'],
        'assignments' => $grades['assignments'],
        'smart' => $grades['smart'],
        'final' => $grades['final'],
        'midterm' => $grades['midterm']
      ]);
      message("Subject {$subject->title} grades has been updated!");
    }

    elseif ($type = 'create') {
      $totalGrade = 0;
      foreach ($grades as $key => $value) {
        $totalGrade += $value;
      }
      SubjectGrades::create([
        'total' => $totalGrade,
        'subject' => $subject->id,
        'oral' => $grades['oral'],
        'lab' => $grades['lab'],
        'quizzes' => $grades['quizzes'],
        'assignments' => $grades['assignments'],
        'smart' => $grades['smart'],
        'final' => $grades['final'],
        'midterm' => $grades['midterm'],
      ]);
      message("Subject {$subject->title} grades has been added and total marks is {$totalGrade} marks!");
    }

  }

  // Add Chapter
  public function addChapterView(Subjects $subject) {
    $hasChapters = Subjects::whereHas('chapters')->find($subject->id);
    $lastChapterID = 1;
    if ($hasChapters) {
      $lastChapterID = Chapter::where('subject', $subject->id)->orderBy('number', 'desc')->first()->number + 1;
    }
    return inertia('Professor/Subjects/AddChapter/AddChapter', [
      'subject' => Subjects::with([
        'department',
        'chapters' => fn($q) => $q->orderBy('number')->with('subject')
      ])->find($subject->id),
      'lastChapterNumber' => $lastChapterID
    ]);
  }
  public function addChapterAction(Request $request, Subjects $subject) {
    $request->validate([
      'name' => 'required|min:5|max:255',
      'file' => 'required|mimes:pdf',
      'info' => 'required|min:100',
      'order' => 'required|integer',
    ], [
      'info.required' => 'Description field is required',
      'info.min' => 'Minimum characters for description is 100 character'
    ]);

    $file = $request->file('file');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $file->move(CHAPTER_FILE, $fileName);

    Chapter::create([
      'name' => $request->input('name'),
      'info' => $request->input('info'),
      'number' => $request->input('order'),
      'file' => CHAPTER_FILE . $fileName,
      'subject' => $subject->id,
    ]);

    message("Chapter has been created successfully for subject {$subject->title}");
    return to_route('professors.subjects.chapters', $subject->id);

  }

  // Update Chapter
  public function updateChapterView(Subjects $subject, Chapter $chapter) {
    if ($chapter->subject == $subject->id) {
      return inertia('Professor/Subjects/UpdateChapter/UpdateChapter', [
        'subject' => Subjects::with([
          'chapters' => fn($q) => $q->orderBy('number')->with('subject')
        ])->find($subject->id),
        'chapter' => $chapter
      ]);
    }
    return abort(404);

  }
  public function updateChapterAction(Request $request, Subjects $subject, Chapter $chapter) {
    if ($chapter->subject == $subject->id) {
      $request->validate([
        'name' => 'required|min:5|max:255',
        'info' => 'required|min:100',
        'order' => 'required|integer',
      ], [
        'info.required' => 'Description field is required',
        'info.min' => 'Minimum characters for description is 100 character'
      ]);

      $completedFileName = '';
      if ($request->hasFile('file')) {
        $file = $request->file('file');
        $fileName = generateFileName() . $file->getClientOriginalExtension();
        $file->move(CHAPTER_FILE, $fileName);
        $completedFileName = CHAPTER_FILE . $fileName;
      } else {
        $completedFileName = $chapter->file;
      }

      Chapter::where('id', $chapter->id)->update([
        'name' => $request->input('name'),
        'info' => $request->input('info'),
        'number' => $request->input('order'),
        'file' => $completedFileName,
        'subject' => $subject->id,
      ]);

      message("Chapter {$chapter->name} has been updated successfully!");
      return to_route('professors.subjects.chapters', $subject->id);
    } else {
      abort(403);
    }
  }

  // Delete Chapter
  public function deleteChapterView(Subjects $subject, Chapter $chapter) {
    if ($chapter->subject == $subject->id) {
      return inertia('Professor/Subjects/DeleteChapter/DeleteChapter', [
        'subject' => Subjects::with([
          'department',
          'chapters' => fn($q) => $q->orderBy('number')->with('subject')
        ])->find($subject->id),
        'lastChapterNumber' => Chapter::where('subject', $subject->id)->orderBy('number', 'desc')->first()->number + 1,
        'chapter' => $chapter
      ]);
    }
    return abort(403);
  }
  public function deleteChapterAction(Request $request, Subjects $subject, Chapter $chapter) {
    if ($chapter->subject == $subject->id) {
      $chapter->delete();
      message("Chapter {$chapter->name} has been updated successfully!");
      return to_route('professors.subjects.chapters', $subject->id);
    }
    return abort(403);
  }
}
