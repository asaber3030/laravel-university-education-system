<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class Student  extends \Illuminate\Foundation\Auth\User
{
  use HasFactory, HasApiTokens, Notifiable;

  protected $guard = 'student';

  protected $fillable = [
    'username',
    'email',
    'name',
    'arabic_name',
    'national_id',
    'password',
    'phone',
    'address',
    'department',
    'picture',
    'university_code',
    'university_email',
    'year'
  ];

  public static $csvHeaders = [
    'username',
    'email',
    'name',
    'arabic_name',
    'national_id',
    'password',
    'phone',
    'address',
    'department',
    'university_code',
    'university_email',
    'year'
  ];

  // Accessors & Mutators
  protected function username(): Attribute {
    return new Attribute(
      get: fn($value) => $value,
      set: fn($value) => strtolower(Str::replace(' ', '', $value))
    );
  }

  // Relations
  public function quizzes_answers() {
    return $this->hasMany(QuizStudentGrade::class, 'student', 'id');
  }
  public function notifications() {
    return $this->hasMany(StudentNotifications::class, 'student', 'id');
  }
  public function department() {
    return $this->belongsTo(Department::class, 'department', 'id');
  }
  public function badges() {
    return $this->hasMany(StudentBadges::class, 'student', 'id');
  }
  public function semesters() {
    return $this->hasMany(StudentSemesters::class, 'student', 'id');
  }
  public function summaries() {
    return $this->hasMany(Summary::class, 'student', 'id');
  }
  public function mails() {
    return $this->hasMany(SentMails::class, 'student', 'id');
  }
  public function year() {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function assignments() {
    return $this->hasMany(Assignment::class, 'student', 'id');
  }
  public function assignments_answers() {
    return $this->hasMany(AssignmentAnswer::class, 'student', 'id');
  }
  public function assignments_grades() {
    return $this->hasMany(AssignmentGrade::class, 'student', 'id');
  }

  // Helper Functions
  public static function promote($student, $yearID) {
    return self::where('id', $student)->update(['year' => $yearID]);
  }

  // Create student with semester
  public static function createStudent(
    $username,
    $email,
    $name,
    $arabic_name,
    $national_id,
    $password,
    $phone,
    $address,
    $department,
    $university_code,
    $university_email,
    $year,
  ) {
    return Student::create([
      'username' => $username,
      'email' => $email,
      'name' => $name,
      'arabic_name' => $arabic_name,
      'national_id' => $national_id,
      'password' => $password,
      'phone' => $phone,
      'address' => $address,
      'department' => $department,
      'university_code' => $university_code,
      'university_email' => $university_email,
      'year' => $year
    ]);
  }

}
