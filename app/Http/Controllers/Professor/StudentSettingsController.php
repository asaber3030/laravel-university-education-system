<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\App;
use Illuminate\Http\Request;

class StudentSettingsController extends Controller
{
  public function studentSettings() {
    return inertia('Professor/Settings/Students/Settings', [
      'activePage' => 'student_settings',
      'settings' => App::all()
    ]);
  }

  // Change Students Theme
  public function changeTheme($id, $theme) {
    App::where('id', $id)->update([
      'value' => $theme
    ]);
    message('Default theme for students has been changed to ' . $theme);
  }

  // Change Students Language
  public function changeLanguage($id, $lang) {
    App::where('id', $id)->update([
      'value' => $lang
    ]);
    message('Default language for students has been changed to ' . $lang);
  }

  // Students Can Update Personal Information
  public function changeUpdatingPersonalInformationStatus($id, $status) {
    App::where('id', $id)->update([
      'value' => $status
    ]);
    message('Updating personal information status of students has been updated to: ' . $status == 1 ? ' Allowed' : 'Disabled');
  }

  // Students Can Reset password
  public function studentsCanResetPassword($id, $status) {
    App::where('id', $id)->update([
      'value' => $status
    ]);
    message('Reset password status of students has been updated to: ' . $status == 1 ? ' Allowed' : 'Disabled');
  }

  // Students Can Login or not
  public function studentsCanLogin($id, $status) {
    App::where('id', $id)->update([
      'value' => $status
    ]);
    message('Login status of students has been set to: ' . $status == 1 ? ' Allowed' : 'Disabled');
  }


}
