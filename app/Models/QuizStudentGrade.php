<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizStudentGrade extends Model
{
  use HasFactory;

  protected $table = 'quiz_student_grade';
  protected $fillable = [
    'quiz', 'answer', 'student', 'grade', 'question'
  ];

  // Relations
  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  public function answer() {
    return $this->belongsTo(QuestionMCQ::class, 'answer', 'id');
  }
  public function quiz() {
    return $this->belongsTo(Quizzes::class, 'quiz', 'id');
  }
  public function question() {
    return $this->belongsTo(QuizQuestions::class, 'question', 'id');
  }

}
