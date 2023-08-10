<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizzes extends Model
{
  use HasFactory;
  protected $table = 'quizzes';
  protected $fillable = [
    'title', 'information', 'start', 'end', 'grade', 'minutes', 'year', 'subject'
  ];

  // Relations
  public function questions() {
    return $this->hasMany(QuizQuestions::class, 'quiz', 'id');
  }
  public function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function answers() {
    return $this->hasMany(QuizStudentGrade::class, 'quiz', 'id');
  }
  public function professor() {
    return $this->belongsTo(Professor::class, 'professor', 'id');
  }

}
