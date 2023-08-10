<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentBadges extends Model
{
  use HasFactory;

  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }

  public function badge() {
    return $this->belongsTo(Badge::class, 'badge', 'id');
  }

}
