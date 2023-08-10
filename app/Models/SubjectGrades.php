<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectGrades extends Model
{
  use HasFactory;
  public $timestamps = false;
  public $table = 'subject_grades';
  protected $fillable = ['subject', 'total', 'oral', 'final', 'midterm', 'assignments', 'quizzes', 'lab', 'smart'];

  public function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
}
