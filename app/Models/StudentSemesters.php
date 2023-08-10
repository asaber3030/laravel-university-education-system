<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentSemesters extends Model
{
  use HasFactory;
  public $timestamps = false;

  protected $fillable = [
    'student',
    'year',
    'grade',
    'information',
    'default_grade',
    'title',
    'is_done',
    'started',
    'ended'
  ];

  // Relations
  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function courses() {
    return $this->hasMany(Courses::class, 'year', 'id');
  }

  public function grades() {
    return $this->hasMany(CourseGrade::class, 'semester', 'id');
  }

  // Helpers
  public static function createSemester(
    $year,
    $student,
    $information,
    $grade,
    $default_grade,
    $is_done,
    $stared = '',
    $ended = '',
    $title
  ) {
    return self::create([
      'student' => $student,
      'title' => $title,
      'year' => $year,
      'grade' => $grade,
      'information' => $information,
      'default_grade' => $default_grade,
      'is_done' => $is_done,
      'started' => $stared,
      'ended' => $ended
    ]);
  }
}

