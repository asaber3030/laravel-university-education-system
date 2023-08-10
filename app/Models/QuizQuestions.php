<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestions extends Model
{
  use HasFactory;

  protected $table = 'quiz_questions';
  protected $fillable = [
    'quiz', 'title', 'answer', 'grade'
  ];

  public function mcq() {
    return $this->hasMany(QuestionMCQ::class, 'question', 'id');
  }

  public function quiz() {
    return $this->belongsTo(Quizzes::class, 'quiz', 'id');
  }
}
