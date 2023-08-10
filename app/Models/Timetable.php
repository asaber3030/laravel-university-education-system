<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timetable extends Model {
  use HasFactory;

  protected $table = 'timetable';
  protected $fillable = ['text', 'event', 'start', 'end', 'day', 'year'];

  public function day() {
    return $this->belongsTo(TimetableDay::class, 'day', 'id');
  }

  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
}
