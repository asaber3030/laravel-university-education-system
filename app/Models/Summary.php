<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Summary extends Model {
  use HasFactory;

  protected $table = 'subject_summary';

  protected $fillable = ['subject', 'chapter', 'year', 'student', 'file', 'private', 'description', 'quick_preview'];

  function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
  function chapter() {
    return $this->belongsTo(Chapter::class, 'chapter', 'id');
  }
  function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }

}
