<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subjects extends Model {
  use HasFactory;

  protected $fillable = [
    'department', 'title', 'code', 'reference', 'information'
  ];

  function chapters() {
    return $this->hasMany(Chapter::class, 'subject', 'id');
  }

  function grades() {
    return $this->hasOne(SubjectGrades::class, 'subject', 'id');
  }

  function department() {
    return $this->belongsTo(Department::class, 'department', 'id');
  }

  function course() {
    return $this->hasOne(Courses::class, 'subject', 'id');
  }

  function summaries() {
    return $this->hasMany(Summary::class, 'subject', 'id');
  }

  function assignments() {
    return $this->hasMany(Assignment::class, 'subject', 'id');
  }

  function quizzes() {
    return $this->hasMany(Quizzes::class, 'subject', 'id');
  }

  function teaching_staff() {
    return $this->hasMany(TeachingStaff::class, 'subject', 'id');
  }

}
