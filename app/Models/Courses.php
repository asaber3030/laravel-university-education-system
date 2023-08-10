<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courses extends Model
{
  use HasFactory;
  protected $fillable = ['subject', 'year', 'title', 'info'];

  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
  public function student_grades() {
    return $this->hasOne(CourseGrade::class, 'course', 'id');
  }
  public function lectures() {
    return $this->hasMany(CourseLectures::class, 'course', 'id');
  }
  public function assignments() {
    return $this->hasMany(Assignment::class, 'course', 'id');
  }

  // Helpers
  static function createCourse($title, $info, $subject, $year) {
    return self::create([
      'title' => $title,
      'info' => $info,
      'subject' => $subject,
      'year' => $year
    ]);
  }
  static function updateCourse($courseID, $title, $info, $subject, $year) {
    return self::create([
      'title' => $title,
      'info' => $info,
      'subject' => $subject,
      'year' => $year
    ]);
  }

}
