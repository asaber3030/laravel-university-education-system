<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Professor\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Concerns\Has;
use Illuminate\Support\Facades\Auth;

class ProfessorController extends Controller {

  // Dashboard
  function dashboard() {
    return inertia('Professor/Dashboard/ProfessorDashboard');
  }

  // Login
  function loginView() {
    return inertia('Professor/Login/ProfessorLogin');
  }
  function loginAction(Request $request) {
    $request->validate([
      'username' => 'required',
      'password' => 'required'
    ]);

    if (Auth::guard('professors')->attempt([
        'username' => $request->username,
        'password' => $request->password
      ], true))
    {
      message(message: 'Loggined as professor!');
      return redirect()->intended(route('professors.dashboard'));
    } else {
      message(message: 'Credentials are not valid!', type: 'warning');
      return redirect()->intended(route('professors.login'));
    }
  }

  // List
  function listAll() {
    return inertia('Professor/Professors/List/Professors', [
      'professors' => Professor::where('id', '!=', \professor()->getAuthIdentifier())->with('department')->orderBy('id', 'desc')->get()
    ]);
  }

  function createView() {
    return inertia('Professor/Professors/New/NewProfessor', [
      'departments' => Department::all()
    ]);
  }
  function createAction(Request $request) {
    $request->validate([
      'name' => 'required|min:4|max:255',
      'username' => 'required|unique:professors|regex:/\w*$/|max:255',
      'email' => 'required|email|unique:professors',
      'password' => 'required|min:8|max:255',
      'title' => 'required|max:20',
      'department' => 'required|exists:departments,id',
      'phone' => 'required|unique:professors',
      'picture' => 'required|mimes:png,jpg,jpeg',
      'picture.*' => 'required|mimes:png,jpg,jpeg',
    ]);

    $file = $request->file('picture');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $uploadFile = $file->move(PROFESSORS_PICTURES_TARGET, $fileName);

    Professor::create([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
      'title' => $request->input('title'),
      'department' => $request->input('department'),
      'phone' => $request->input('phone'),
      'picture' => PROFESSORS_PICTURES_TARGET . $fileName,
      'type' => $request->input('type'),
    ]);

    message('Professor has been created successfully!');
    return to_route('professors.list');

  }

  function updateView(Professor $professor) {
    return inertia('Professor/Professors/Update/Update', [
      'departments' => Department::all(),
      'current' => $professor
    ]);
  }
  function updateAction(Request $request, Professor $professor) {
    $request->validate([
      'name' => 'required|min:4|max:255',
      'username' => 'required|regex:/\w*$/|max:255|unique:professors,id,' . $professor->id . ',id',
      'email' => 'required|email|unique:professors,id,' . $professor->id . ',id',
      'title' => 'required|max:20',
      'department' => 'required|exists:departments,id',
      'phone' => 'required|unique:professors,id,' . $professor->id . ',id',
    ]);

    Professor::where('id', $professor->id)->update([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'title' => $request->input('title'),
      'department' => $request->input('department'),
      'phone' => $request->input('phone'),
      'type' => $request->input('type'),
    ]);

    message('Professor has been updated successfully!');
    return to_route('professors.list');
  }

  function deleteView(Professor $professor) {
    return inertia('Professor/Professors/Delete/Delete', [
      'current' => $professor
    ]);
  }
  function deleteAction(Request $request, Professor $professor) {
    $professor->delete();
    message('Professor has been deleted successfully!');
    return to_route('professors.list');
  }

  function viewProfessor(Professor $professor) {
    return inertia('Professor/Professors/View/View', [
      'current' => Professor::with([
        'department',
        'subjects' => fn($q) => $q->with('subject')
      ])->find($professor->id)
    ]);
  }

}
