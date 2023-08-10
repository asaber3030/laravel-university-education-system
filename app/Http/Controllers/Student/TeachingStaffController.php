<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\TeachingStaff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeachingStaffController extends Controller
{
  function list() {
    $student = Auth::user();

    return inertia('Student/TeachingStaff/TeachingStaff', [
      'professors' => TeachingStaff::with('subject', 'professor')->where('year', $student->year)->where('type', 0)->get(),
      'assistants' => TeachingStaff::with('subject', 'professor')->where('year', $student->year)->where('type', 1)->get(),
    ]);
  }

}
