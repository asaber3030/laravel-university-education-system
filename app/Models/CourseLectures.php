<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseLectures extends Model
{
  use HasFactory;
  protected $fillable = ['course', 'title', 'information', 'video', 'file'];

  public function course() {
    return $this->belongsTo(Courses::class, 'course', 'id');
  }
}
