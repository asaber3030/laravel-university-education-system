<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Courses;
use App\Models\Student;
use App\Models\Subjects;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SubjectsController extends Controller {

  function list() {
    $user = Auth::user();
    return inertia('Student/Subjects/List', [
      'subjects' => Subjects::where('year', $user->year)->with('chapters', 'course')->get()
    ]);
  }

  function viewSubject(Subjects $subject) {
    return inertia('Student/Subjects/ViewSubject', [
      'subject' => Subjects::with([
        'course',
        'chapters' => fn($q) => $q->orderBy('number', 'asc'),
        'grades'
      ])->where('id', $subject->id)->get()->first()
    ]);
  }

  function viewSubjectCourse(Subjects $subject) {
    if ($subject->year == Auth::user()->year) {
      return inertia('Student/Subjects/ViewSubjectCourse', [
        'subject' => Subjects::with([
          'course' => fn($q) => $q->with('lectures'),
          'chapters' => fn($q) => $q->orderBy('number', 'asc')
        ])->where('id', $subject->id)->get()->first()
      ]);
    } else {
      abort(404);
    }
  }

  function viewSubjectSummaries(Subjects $subject) {
    return inertia('Student/Subjects/ViewSubjectSummaries', [
      'subject' => Subjects::with([
        'summaries' => fn($q) => $q->with([
          'chapter',
          'student' => fn($q) => $q->with('year'),
        ])->where('student', '!=', auth()->id()),
        'chapters'
      ])->where('id', $subject->id)->get()->first(),
      'students' => Student::where('id', '!=', auth()->id())->where('year', Auth::user()->year)->whereHas('summaries')->get()
    ]);
  }

  function summariesSearchStudent(Subjects $subject, Student $student) {
    return inertia('Student/Subjects/ViewSubjectSummaries', [
      'subject' => Subjects::with([
        'summaries' => fn($q) => $q->with([
          'chapter',
          'student' => fn($q) => $q->with('year'),
        ])->where('student', $student->id)->where('student', '!=', auth()->id()),
        'chapters'
      ])->where('id', $subject->id)->get()->first(),
      'students' => Student::where('id', '!=', auth()->id())->where('year', Auth::user()->year)->whereHas('summaries')->get(),
      'selectedStudentID' => $student->id
    ]);
  }

  function summariesSearchChapter(Subjects $subject, Chapter $chapter) {
    return inertia('Student/Subjects/ViewSubjectSummaries', [
      'subject' => Subjects::with([
        'summaries' => fn($q) => $q->with([
          'chapter',
          'student' => fn($q) => $q->with('year'),
        ])->where('chapter', $chapter->id)->where('student', '!=', auth()->id()),
        'chapters'
      ])->where('id', $subject->id)->get()->first(),
      'students' => Student::where('id', '!=', auth()->id())->where('year', Auth::user()->year)->whereHas('summaries')->get(),
      'selectedChapterID' => $chapter->id
    ]);
  }

  function summariesSearchBoth(Subjects $subject, Student $student, Chapter $chapter) {
    return inertia('Student/Subjects/ViewSubjectSummaries', [
      'subject' => Subjects::with([
        'summaries' => fn($q) => $q->with([
          'chapter',
          'student' => fn($q) => $q->with('year'),
        ])->where('student', $student->id)->where('student', '!=', auth()->id())->where('chapter', $chapter->id),
        'chapters'
      ])->where('id', $subject->id)->get()->first(),
      'students' => Student::where('id', '!=', auth()->id())->where('year', Auth::user()->year)->whereHas('summaries')->get(),
      'selectedStudentID' => $student->id,
      'selectedChapterID' => $chapter->id
    ]);
  }


}
