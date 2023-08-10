<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentGrade extends Model
{
  use HasFactory;

  protected $fillable = ['assignment', 'student', 'grade'];

  protected $table = 'assignment_grade';

  public function assignment() {
    return $this->belongsTo(Assignment::class, 'assignment', 'id');
  }
  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  public function answer() {
    return $this->belongsTo(AssignmentAnswer::class, 'answer', 'id');
  }
}
