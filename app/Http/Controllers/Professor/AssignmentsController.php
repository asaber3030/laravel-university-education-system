<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentAnswer;
use App\Models\AssignmentGrade;
use App\Models\AssignmentWarning;
use App\Models\CourseGrade;
use App\Models\Courses;
use App\Models\Department;
use App\Models\Student;
use App\Models\YearsCourses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssignmentsController extends Controller {

  // List assignments!
  public function listAssignments() {
    return inertia('Professor/Assignments/List/List', [
      'assignments' => YearsCourses::whereHas('assignments')->with([
        'assignments' => fn($q) => $q->with(['course' => fn($q) => $q->with('subject'), 'professor', 'answers', 'grades', 'warnings'])
      ])->get(),
      'departments' => Department::with('years')->get()
    ]);
  }

  // Group By View
  public function viewAssignmentPage(Assignment $assignment, string $panel = 'settings') {
    return inertia('Professor/Assignments/View/ViewAssignment', [
      'assignment' => Assignment::with([
        'answers',
        'grades',
        'warnings',
        'year',
        'subject',
        'professor',
        'course' => fn($q) => $q->with(['subject' => fn($q) => $q->with('chapters'), 'lectures']),
      ])->find($assignment->id),
      'studentsWithNoAnswers' => Student::whereDoesntHave('assignments_answers')->with([
        'assignments_answers' => fn($q) => $q->where('assignment', $assignment->id)
      ])->where('year', $assignment->year)->get(),
      'studentsWithAnswers' => Student::whereHas('assignments_answers')->with([
        'assignments_answers' => fn($q) => $q->with([
          'assignment' => fn($q) => $q->with([
            'course' => fn($q) => $q->with('subject'),
          ])])->where('assignment', $assignment->id)
      ])->where('year', $assignment->year)->get(),
      'panel' => $panel
    ]);
  }
  public function viewAssignmentAction(Request $request, Assignment $assignment, string $panel = 'settings') {
    if ($panel == 'settings') {
      $request->validate([
        'title' => 'required|min:10|max:255',
        'deadline' => 'required|date|after:today',
        'accept_answers' => 'in:1,0',
        'allow_update' => 'in:1,0',
        'code' => 'unique:assignments,id,' . $assignment->id . ',id|alpha_num'
      ]);
      $fileName = '';
      if ($request->hasFile('file')) {
        $request->validate([
          'file' => 'required|mimes:pdf,csv,xlsx,png,jpg,jpeg',
          'file.*' => 'required|mimes:pdf,csv,xlsx,png,jpg,jpeg'
        ]);
        $file = $request->file('file');
        $fileName = generateFileName() . $file->getClientOriginalExtension();
        $file->move(ASSIGNMENT_FILES_TARGET, $fileName);
      }

      Assignment::where('id', $assignment->id)->update([
        'title' => $request->input('title'),
        'information' => $request->input('information'),
        'link' => $request->input('link') != '' ? $request->input('link') : '',
        'file' => $request->hasFile('file') ? ASSIGNMENT_FILES_TARGET . $fileName : $assignment->file,
        'deadline' => $request->input('deadline'),
        'code' => $request->input('code'),
        'allow_update' => $request->input('allow_update') ? 1 : 0,
        'accept_answer' => $request->input('accept_answers') ? 1 : 0,
      ]);

      message('Assignment with code ' . $assignment->code . ' has been updated successfully!');

    }

    if ($panel == 'warnings') {
      $all_a = Assignment::whereDoesntHave('answer')->where('code', $code)->get();

      foreach ($all_a as $a) {
        AssignmentWarning::create([
          'student' => $a->student,
          'assignment' => $a->id,
          'reason' => $request->input('reason')
        ]);

        notify(
          title: 'Warning for assignment with code: ' . $code,
          message: $request->input('reason'),
          type: 2,
          student: $a->student
        );
      }

      message('Warnings has been sent to students!');
    }
  }

  // {year} Assignments
  public function yearAssignments(YearsCourses $year) {
    return inertia('Professor/Assignments/Year/YearAssignments', [
      'courses' => Courses::whereHas('assignments')->with([
        'assignments' => fn($q) => $q->with([
          'professor',
          'course' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')])
        ]),
        'subject' => fn($q) => $q->withCount('chapters'),
      ])->where('year', $year->id)->get(),
      'year' => YearsCourses::with([
        'department',
        'assignments' => fn($q) => $q->with('professor'),
      ])->find($year->id)
    ]);
  }

  // Choose Year to make new assignment
  public function chooseYear() {
    return inertia('Professor/Assignments/New/ChooseYear', [
      'departments' => Department::with('years')->get()
    ]);
  }

  // New Assignment for {year}
  public function newYearAssignmentView(YearsCourses $year) {
    return inertia('Professor/Assignments/New/NewAll', [
      'year' => YearsCourses::with([
        'courses' => fn($q) => $q->with('subject'),
        'department',
        'students'
      ])->find($year->id)
    ]);
  }
  public function newYearAssignmentAction(Request $request, YearsCourses $year) {

    $request->validate([
      'title' => 'required|min:10|max:255',
      'code' => 'required|max:20|unique:assignments',
      'deadline' => 'required|date|after:today',
      'activeCourse' => 'required|exists:courses,id',
    ]);
    $course = Courses::with('subject')->find($request->input('activeCourse'));

    if ($course->year == $year->id) {

      $fileName = '';
      if ($request->hasFile('file')) {
        $request->validate([
          'file' => 'required|mimes:pdf,csv,xlsx,png,jpg,jpeg',
          'file.*' => 'required|mimes:pdf,csv,xlsx,png,jpg,jpeg'
        ]);

        $file = $request->file('file');
        $fileName = generateFileName() . $file->getClientOriginalExtension();
        $file->move(ASSIGNMENT_FILES_TARGET, $fileName);

      }

      $students = Student::where('year', $year->id)->get();

      Assignment::create([
        'title' => $request->input('title'),
        'information' => $request->input('information'),
        'link' => $request->input('url') != '' ? $request->input('url') : null,
        'file' => $request->hasFile('file') ? ASSIGNMENT_FILES_TARGET . $fileName : null,
        'deadline' => $request->input('deadline'),
        'course' => $course->id,
        'subject' => $course->subject,
        'year' => $year->id,
        'code' => $request->input('code'),
        'professor' => professor()->getAuthIdentifier()
      ]);

      foreach ($students as $student) {

        notify(
          title: 'New Assignment: ' . $request->input('title'),
          student: $student->id,
          message: "You have to send your answer before the deadline: " . $request->input('deadline'),
          type: 1
        );
      }
      message('Assignments has been sent to students of year ' . $year->title);
//      return to_route();
    } else {
      message('Selected course does not belong to current year ' . $year->title);
    }

  }

  public function sendWarning(Request $request, Assignment $assignment) {
    $students = Student::whereDoesntHave('assignments_answers')->with([
      'assignments_answers' => fn($q) => $q->where('assignment', $assignment->id)
    ])->where('year', $assignment->year)->get();

    $request->validate([
      'reason' => 'required'
    ]);

    foreach ($students as $student) {
      AssignmentWarning::create([
        'student' => $student->id,
        'assignment' => $assignment->id,
        'reason' => $request->input('reason')
      ]);

      notify(
        title: 'Assignment ' . $assignment->code . ' warning!',
        student: $student->id,
        type: 'student',
        message: $request->input('reason'),
        url: to_route('students.assignments.view', [$assignment->id, $assignment->code])
      );


    }

    message('Warnings has been sent to all students that didn\'t answered!');
  }

  public function deleteAssignment(Assignment $assignment) {
    $assignment->delete();
    message('Assignment has been deleted!', 'warning');
    return to_route('professors.ass.list');
  }



}
