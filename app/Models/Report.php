<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'description', 'student', 'year'];

  function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }

  function answer() {
    return $this->hasOne(ReportAnswer::class, 'report', 'id');
  }
}
