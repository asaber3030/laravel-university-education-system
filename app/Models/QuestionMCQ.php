<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionMCQ extends Model
{
  use HasFactory;
  protected $table = 'question_mcq';
  protected $fillable = ['title', 'question', 'is_correct', 'type'];

  function student_answers() {
    return $this->hasMany(QuizStudentGrade::class, 'answer', 'id');
  }

}
