<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\App;
use App\Models\Department;
use Illuminate\Http\Request;

class SettingsController extends Controller {

  function appView() {
    return inertia('Professor/Settings/App', [
      'app' => App::all(),
      'activePage' => 'app',
      'appName' => App::where('key', 'app_name')->get()->first()->value,
      'appDescription' => App::where('key', 'app_description')->get()->first()->value,
      'appLogo' => App::where('key', 'app_logo')->get()->first()->value,
      'appMode' => App::where('key', 'app_mode')->get()->first()->value,
    ]);
  }

  function changeAppMode(Request $request) {
    App::where('key', 'app_mode')->update([
      'value' => $request->input('mode')
    ]);
    message('App mode has changed!');
  }
  function changeAppDetails(Request $request) {
    $request->validate([
      'name' => 'required',
      'description' => 'required',
    ]);

    App::where('key', 'app_name')->update([
      'value' => $request->input('name')
    ]);

    App::where('key', 'app_description')->update([
      'value' => $request->input('description')
    ]);

    message('App details saved!');
  }
  function changeAppLogo(Request $request) {
    $request->validate([
      'logo' => 'required|mimes:png,jpg,svg,jpeg',
      'logo.*' => 'required|mimes:png,jpg,svg,jpeg',
    ]);

    $file = $request->file('logo');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $request->file('logo')->move(APP_LOGO_TARGET, $fileName);

    App::where('key', 'app_logo')->update([
      'value' => APP_LOGO_TARGET . $fileName
    ]);

    message('Application Logo has been changed successfully!');
  }

  // Departments
  function departments() {
    return inertia('Professor/Settings/Departments', [
      'settings' => App::all(),
      'departments' => Department::withCount('students', 'years')->get(),
      'activePage' => 'departments'
    ]);
  }

  // Departments
  function professors() {
    return inertia('Professor/Settings/Professors', [
      'settings' => App::all(),
      'departments' => Department::whereHas('professors')->with([
        'professors' => fn($q) => $q->where('type', 0)
      ])->get(),
      'activePage' => 'professors'
    ]);
  }

  // Departments
  function assistants() {
    return inertia('Professor/Settings/Assistants', [
      'settings' => App::all(),
      'departments' => Department::whereHas('professors')->with([
        'professors' => fn($q) => $q->where('type', 1)
      ])->get(),
      'activePage' => 'assistants'
    ]);
  }

}
