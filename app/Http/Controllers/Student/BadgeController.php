<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\StudentBadges;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BadgeController extends Controller {

  function list() {

    $student = Auth::user();

    return inertia('Student/Badges/List', [
      'badges' => StudentBadges::with('badge')->where('student', $student->getAuthIdentifier())->get(),
    ]);
  }

  function viewBadge(Badge $badge) {
    return inertia('Student/Badges/ViewBadge', [
      'badge' => Badge::with(['students' => fn($q) => $q->with('student')])->where('id', $badge->id)->get()->first(),
    ]);
  }

}
