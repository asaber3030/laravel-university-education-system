<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YearsCourses extends Model {

  use HasFactory;

  protected $table = 'year_courses';
  public $timestamps = false;

  protected $fillable = [
    'title', 'department', 'next_year', 'term_name', 'start', 'end', 'grade', 'information'
  ];

  public function announcements() {
    return $this->hasMany(Announcement::class, 'year', 'id');
  }
  public function department() {
    return $this->belongsTo(Department::class, 'department', 'id');
  }
  public function semesters() {
    return $this->hasMany(StudentSemesters::class, 'year', 'id');
  }
  public function courses() {
    return $this->hasMany(Courses::class, 'year', 'id');
  }
  public function students() {
    return $this->hasMany(Student::class, 'year', 'id');
  }
  public function grades() {
    return $this->hasMany(CourseGrade::class, 'year', 'id');
  }
  public function assignments() {
    return $this->hasMany(Assignment::class, 'year', 'id');
  }

  // Helpers
  static function add($title, $department, $information, $start, $end, $grade, $next_year, $term_name) {
    return self::create([
      'title' => $title,
      'department' => $department,
      'next_year' => $next_year,
      'term_name' => $term_name,
      'start' => $start,
      'end' => $end,
      'grade' => $grade,
      'information' => $information,
    ]);
  }
  static function updateYear($year, $title, $department, $information, $start, $end, $grade, $next_year, $term_name) {
    return self::where('id', $year)->update([
      'title' => $title,
      'department' => $department,
      'next_year' => $next_year,
      'term_name' => $term_name,
      'start' => $start,
      'end' => $end,
      'grade' => $grade,
      'information' => $information,
    ]);
  }

}
