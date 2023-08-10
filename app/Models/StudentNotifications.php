<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentNotifications extends Model
{
  use HasFactory;

  protected $fillable = ['title', 'message', 'student', 'url', 'professor', 'is_read'];
  protected $table = 'student_notifications';
  public $timestamps = false;

  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
  public function professor() {
    return $this->belongsTo(Professor::class, 'professor', 'id');
  }

  public static function notify(
    $title,
    $message,
    $student,
    $url,
  ) {
    return self::create([
      'title' => $title,
      'message' => $message,
      'student' => $student,
      'url' => $url,
      'professor' => professor()->getAuthIdentifier()
    ]);
  }

}
