<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseGrade extends Model
{
  use HasFactory;
  public $timestamps = false;

  protected $fillable = [
    'student', 'year', 'course', 'subject',
    'oral', 'midterm', 'final', 'assignments', 'lab',
    'smart', 'total', 'semester', 'quizzes'
  ];

  protected $table = 'course_grade';

  public function course() {
    return $this->belongsTo(Courses::class, 'course', 'id');
  }
  public function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function semester() {
    return $this->belongsTo(StudentSemesters::class, 'semester', 'id');
  }


}
