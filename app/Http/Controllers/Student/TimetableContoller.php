<?php

namespace App\Http\Controllers\Student;

use App\Models\TimetableDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class TimetableContoller extends Controller {

  function list() {
    return inertia('Student/Timetable/Timetable', [
      'days' => TimetableDay::with([
        'timetable' => fn($q) => $q->where('year', Auth::user()->year)
      ])->get()
    ]);
  }

}
