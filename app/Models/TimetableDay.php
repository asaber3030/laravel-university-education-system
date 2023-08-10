<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimetableDay extends Model {
  use HasFactory;

  public function timetable() {
    return $this->hasMany(Timetable::class, 'day', 'id');
  }
}
