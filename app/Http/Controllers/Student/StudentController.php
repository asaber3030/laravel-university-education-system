<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Badge;
use App\Models\Report;
use App\Models\Student;
use App\Models\StudentBadges;
use App\Models\StudentNotifications;
use App\Models\StudentSemesters;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;

class StudentController extends Controller {

  function loginView() {
    return inertia('Student/Login/Login');
  }

  function dashboard() {
    return inertia('Student/Dashboard/Dashboard', [
      'user' => Auth::user()
    ]);

  }

  function announcements() {
    return inertia('Student/Announcements/Announcements', [
      'announcements' => Announcement::where('year', Auth::user()->year)->with('professor')->orderBy('id', 'desc')->get()
    ]);
  }

  function profile() {
    return inertia('Student/Profile/Profile');
  }

  function profileAction(Request $request) {
    $student = Auth::user();
    $request->validate([
      'username' => 'required|min:5|max:100|unique:users,id,' . $student->getAuthIdentifier() . ',id',
      'email' => 'required|email|min:5|max:100|unique:users,id,' . $student->getAuthIdentifier() . ',id',
      'phone' => 'required|min:5|max:100|unique:users,id,' . $student->getAuthIdentifier() . ',id|regex:' . PHONE_REGEX ,
      'name' => 'required|min:10|max:255'
    ]);

    Student::where('id', $student->getAuthIdentifier())->update([
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'phone' => $request->input('phone'),
      'name' => $request->input('name'),
    ]);

    message('Account information has been updated successfully!');
  }

  function picture() {
    return inertia('Student/Profile/Picture');
  }
  function pictureAction(Request $request) {
    $student = Auth::user();
    $request->validate([
      'picture' => 'required|mimes:png,jpg,jpeg',
      'picture.*' => 'required|mimes:png,jpg,jpeg'
    ]);

    $file = $request->file('picture');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $file->move(STUDENTS_PICTURES_TARGET, $fileName);

    Student::where('id', $student->getAuthIdentifier())->update([
      'picture' => STUDENTS_PICTURES_TARGET . $fileName,
    ]);

    message('Account picture has been updated successfully!');
  }

  function password() {
    return inertia('Student/Profile/Password');
  }
  function passwordAction(Request $request) {
    $student = Auth::user();
    $request->validate([
      'old_password' => 'required',
      'new_password' => 'required|min:8|max:100'
    ]);

    if (Hash::check($request->input('old_password'), $student->getAuthPassword())) {

      Student::where('id', $student->getAuthIdentifier())->update([
        'password' => Hash::make($request->input('new_password')),
      ]);

      message('Account password has been updated successfully!');

    } else {
      message("Wrong password!", 'error');
    }
  }

  function badges() {
    return inertia('Student/Profile/Badges', [
      'badges' => StudentBadges::with('badge')->where('student', Auth::user()->getAuthIdentifier())->get()
    ]);
  }

  function notifications() {
    return inertia('Student/Profile/Notifications', [
      'notifications' => StudentNotifications::with('professor')->where('student', auth()->id())->orderBy('id', 'desc')->get(),
    ]);
  }

  function allStudyingContent() {
    return inertia('Student/Profile/StudyContent', [
      'all_years' => StudentSemesters::with([
        'year' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with('subject')
        ])
      ])->where('student', auth()->id())->where('is_done', 1)->orderBy('id', 'desc')->get(),
      'current_year' => StudentSemesters::with([
        'year' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with('subject')
        ])
      ])->where('student', auth()->id())->where('is_done', 0)->get()->first()
    ]);
  }

  function reportProblem() {
    return inertia('Student/Profile/ReportProblem', [
      'problems' => Report::with([
        'year',
        'answer' => fn($q) => $q->with('professor')
      ])->where('student', \auth()->id())->orderBy('id', 'desc')->get()
    ]);
  }
  function reportProblemAction(Request $request) {
    $request->validate([
      'title' => 'required|min:5|max:255',
      'description' => 'required|min:100|max:2500',
    ]);

    $student = auth();

    Report::create([
      'student' => $student->id(),
      'year' => Auth::user()->year,
      'title' => $request->input('title'),
      'description' => $request->input('description'),
    ]);

    message('New report has been sent successfully. Wait for response!');

  }

  function viewReport(Report $report) {
    return inertia('Student/Profile/ViewReport', [
      'report' => Report::with([
        'year',
        'answer' => fn($q) => $q->with('professor')
      ])->where('id', $report->id)->get()->first()
    ]);
  }

  function activateNotifications() {
    StudentNotifications::where('student', \auth()->id())->update([
      'is_read' => 1
    ]);
  }

  function activateSpecificNotification(Request $request) {
    $notification = StudentNotifications::find($request->input('id'));
    if ($notification->student == \auth()->id()) {
      $notification->update([
        'is_read' => 1
      ]);
    }
  }

}
