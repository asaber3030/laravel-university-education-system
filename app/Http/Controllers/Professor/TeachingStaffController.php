<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Subjects;
use App\Models\TeachingStaff;
use App\Models\YearsCourses;
use Illuminate\Http\Request;

class TeachingStaffController extends Controller {

  function list() {
    return inertia('Professor/TeachingStaff/List', [
      'staff' => TeachingStaff::with('year', 'subject', 'professor')->orderBy('year', 'desc')->get(),
      'years' => Department::with([
        'years' => fn($q) => $q->orderBy('id', 'asc')
      ])->get(),
      'subjects' => Subjects::all()
    ]);
  }

  function addStaffView(YearsCourses $year = null) {
    return inertia('Professor/TeachingStaff/Add', [
      'years' => Department::with([
        'years' => fn($q) => $q->orderBy('id', 'asc')
      ])->get(),
      'subjects' => Subjects::all(),
      'professors' => Department::with([
        'professors' => fn($q) => $q->orderBy('name')
      ])->get()
    ]);
  }

  function addStaffAction(Request $request, YearsCourses $year = null) {

    $request->validate([
      'type' => 'required|in:0,1',
      'year' => 'required|exists:year_courses,id',
      'subject' => 'required|exists:subjects,id',
      'professor' => 'required|exists:professors,id',
    ]);

    TeachingStaff::create([
      'year' => $year ? $year->id : $request->input('year'),
      'type' => $request->input('type'),
      'subject' => $request->input('subject'),
      'professor' => $request->input('professor'),
    ]);

    message('New member has been added to the teaching staff of selected year!');

    return to_route('professors.staff.list');

  }

  function deleteStaffView(TeachingStaff $staff) {
    return inertia('Professor/TeachingStaff/Delete', [
      'staff' => TeachingStaff::with('year', 'subject', 'professor')->find($staff->id)
    ]);
  }

  function deleteStaffAction(Request $request, TeachingStaff $staff) {
    $staff->delete();
    message('Staff memeber has been deleted successfully!');
    return to_route('professors.staff.list');
  }

}
