<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\AssignmentAnswer;
use App\Models\AssignmentGrade;
use App\Models\AssignmentWarning;
use App\Models\Subjects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignmentController extends Controller {

  public function list(Subjects $subject = null) {
    $user = Auth::user();

    return inertia('Student/Assignments/List', [
      'assignments' => Subjects::where('year', $user->year)->where('department', $user->department)->with(['assignments'])->get(),
      'grades' => AssignmentGrade::where('student', $user->id)->with([
        'assignment' => fn($q) => $q->with('subject'),
        'answer',
        'student'
      ])->get(),
      'all_assignments' => Assignment::with([
        'subject',
        'year',
        'professor',
        'warnings' => fn($q) => $q->where('student', $user->getAuthIdentifier()),
        'answers' => fn($q) => $q->where('student', $user->getAuthIdentifier()),
        'grades' => fn($q) => $q->where('student', $user->getAuthIdentifier())
      ])->orderBy('id', 'desc')->where('year', $user->year)->get(),
      'type' => 2
    ]);

  }

  public function viewAssignment(Assignment $assignment, string $code) {
    $user = Auth::user();
    if ($code == $assignment->code && $assignment->year == $user->year) {
      return inertia('Student/Assignments/ViewAssignment', [
        'assignment' => Assignment::with([
          'subject', 'year', 'professor',
          'warnings' => fn($q) => $q->where('student', $user->getAuthIdentifier())
        ])->find($assignment->id),
        'answer' => AssignmentAnswer::where('assignment', $assignment->id)->where('student', $user->id)->get(),
        'warnings' => AssignmentWarning::where('assignment', $assignment->id)->where('student', auth()->id())->get(),
        'grade' => AssignmentGrade::where('assignment', $assignment->id)->where('student', $user->id)->get(),
      ]);
    } else {
      abort(404);
    }

  }

  public function viewAssignmentsOfSubject(Subjects $subject) {
    $user = Auth::user();
    $assignments = Assignment::where('subject', $subject->id)->with([
      'subject',
      'year',
      'professor',
      'warnings' => fn($q) => $q->where('student', $user->getAuthIdentifier()),
      'answers' => fn($q) => $q->where('student', $user->id),
      'grades' => fn($q) => $q->where('student', $user->id),
    ])->orderBy('id', 'desc')->get();

    return inertia('Student/Assignments/ViewSubjectAssignments', [
      'subject' => $subject,
      'assignments' => $assignments
    ]);
  }

  public function sendAssignmentView(Assignment $assignment, string $code) {
    $user = Auth::user();
    $findAnswer = AssignmentAnswer::where('assignment', $assignment->id)->where('student', $user->id)->exists();
    if ($code == $assignment->code && $assignment->year == $user->year && $assignment->accept_answer == 1 && !$findAnswer) {
      return inertia('Student/Assignments/SendAnswer', [
        'assignment' => Assignment::with('subject')->find($assignment->id)
      ]);

    } else {
      abort(404);
    }

  }
  public function sendAssignmentAction(Request $request, Assignment $assignment, string $code) {
    $user = Auth::user();
    $findAnswer = AssignmentAnswer::where('assignment', $assignment->id)->where('student', $user->id)->exists();
    if ($code == $assignment->code && $assignment->year == $user->year && $assignment->accept_answer == 1 && !$findAnswer) {
      $request->validate([
        'file' => 'required|mimes:pdf',
        'file.*' => 'required|mimes:pdf',
      ]);
      $fileName = '';

      if ($request->hasFile('file')) {
        $file = $request->file('file');
        $fileName = generateFileName() . $file->getClientOriginalExtension();
        $request->file('file')->move(ASSIGNMENT_ANSWERS_FILES_TARGET, $fileName);
      }

      $findAnswer = AssignmentAnswer::where('student', $user->id)->where('assignment', $assignment->id)->exists();
      if (!$findAnswer) {
        AssignmentAnswer::create([
          'student' => $user->id,
          'assignment' => $assignment->id,
          'file' => ASSIGNMENT_ANSWERS_FILES_TARGET . $fileName,
          'notes' => $request->input('notes')
        ]);
        message('Assignment answer has been sent successfully!');
        return to_route('students.assignments.view', [$assignment->id, $assignment->code]);
      } else {
        message('Assignment Answer has been sent before!', 'warning');
        return to_route('students.assignments.view', [$assignment->id, $assignment->code]);
      }
    } else {
      abort(404);
    }
  }

  public function updateAssignmentAnswerView(Assignment $assignment, string $code) {
    $user = Auth::user();
    if ($code == $assignment->code && $assignment->year == $user->year && $assignment->accept_answer == 1 && $assignment->allow_update == 1) {
      $findAnswer = AssignmentAnswer::where('student', $user->id)->where('assignment', $assignment->id)->get();
      return inertia('Student/Assignments/UpdateAnswer', [
        'assignment' => Assignment::with('subject')->find($assignment->id),
        'answer' => $findAnswer
      ]);

    } else {
      abort(404);
    }

  }
  public function updateAssignmentAnswerAction(Request $request, Assignment $assignment, string $code) {
    $user = Auth::user();
    if ($code == $assignment->code && $assignment->year == $user->year && $assignment->accept_answer == 1 && $assignment->allow_update == 1) {

      $fileName = '';

      if ($request->hasFile('file')) {

        $request->validate([
          'file' => 'mimes:pdf',
          'file.*' => 'mimes:pdf',
        ]);

        $file = $request->file('file');
        $fileName = generateFileName() . $file->getClientOriginalExtension();
        $request->file('file')->move(ASSIGNMENT_ANSWERS_FILES_TARGET, $fileName);

        $findAnswer = AssignmentAnswer::where('student', $user->id)->where('assignment', $assignment->id)->get()->first();

        if ($findAnswer) {
          AssignmentAnswer::where('id', $findAnswer->id)->update([
            'file' => ASSIGNMENT_ANSWERS_FILES_TARGET . $fileName,
            'notes' => $request->input('notes')
          ]);
          message('Assignment answer has been updated successfully!');
          return to_route('students.assignments.view', [$assignment->id, $assignment->code]);
        } else {
          message('Cannot find any answer to update!', 'warning');
          return to_route('students.assignments.view', [$assignment->id, $assignment->code]);
        }

      } else {
        $findAnswer = AssignmentAnswer::where('student', $user->id)->where('assignment', $assignment->id)->get()->first();
        AssignmentAnswer::where('id', $findAnswer->id)->update([
          'notes' => $request->input('notes')
        ]);
        message('Assignment answer has been updated successfully!');
        return to_route('students.assignments.view', [$assignment->id, $assignment->code]);
      }


    } else {
      abort(404);
    }
  }


}
