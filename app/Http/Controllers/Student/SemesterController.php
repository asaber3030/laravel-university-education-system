<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\StudentSemesters;
use App\Models\YearsCourses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SemesterController extends Controller {

  function list() {
    $student = Auth::user();
    return inertia('Student/Semesters/List', [
      'semesters' => StudentSemesters::with('year')->where('student', $student->getAuthIdentifier())->orderBy('id', 'desc')->get()
    ]);
  }

  function viewSemesterGrades(StudentSemesters $semester) {
    $student = Auth::user();
    return inertia('Student/Semesters/SemesterGrades', [
      'semester' => StudentSemesters::with([
        'year',
        'grades' => fn($q) => $q->with(['subject' => fn($q) => $q->with('grades')]),
      ])->where('student', $student->getAuthIdentifier())
        ->where('id', $semester->id)
        ->get()->first()
    ]);
  }

  function viewSemesterStudyingContent(StudentSemesters $semester) {
    $student = Auth::user();
    return inertia('Student/Semesters/SemesterStudyingContent', [
      'semester' => StudentSemesters::with([
        'year' => fn($q) => $q->with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->with('chapters')])]),
      ])->where('student', $student->getAuthIdentifier())
        ->where('id', $semester->id)
        ->get()->first()
    ]);
  }


}
