<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Department;
use App\Models\YearsCourses;
use Illuminate\Http\Request;

class AnnoucementsController extends Controller {

  function list() {
    return inertia('Professor/Announcements/Years', [
      'departments' => Department::with('years')->get()
    ]);
  }

  function viewYear(YearsCourses $year) {
    return inertia('Professor/Announcements/ViewYear', [
      'year' => YearsCourses::with([
        'announcements' => fn($q) => $q->with('professor')
      ])->orderBy('id', 'desc')->find($year->id)
    ]);
  }

  function handleDelete(Announcement $id) {
    $id->delete();
    message('Announcement has been deleted!');
  }

}
