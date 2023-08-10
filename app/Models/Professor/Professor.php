<?php

namespace App\Models\Professor;

use App\Models\Department;
use App\Models\StudentNotifications;
use App\Models\TeachingStaff;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class Professor extends Authenticatable {

  use HasApiTokens, HasFactory, Notifiable;

  // Props
  protected $table = 'professors';
  protected $primaryKey = 'id';
  protected $fillable = [
    'name', 'username', 'email', 'title', 'phone', 'password', 'department'
  ];

  // Relations
  public function department() {
    return $this->belongsTo(Department::class, 'department', 'id');
  }
  public function student_notifications() {
    return $this->hasMany(StudentNotifications::class, 'professor', 'id');
  }
  public function subjects() {
    return $this->hasMany(TeachingStaff::class, 'professor', 'id');
  }

  // Helpers
  public static function createProfessor($title, $name, $username, $phone, $email, $password, $department) {
    return self::create([
      'title' => $title,
      'name' => $name,
      'username' => $username,
      'phone' => $phone,
      'email' => $email,
      'password' => $password,
      'department' => $department,
    ]);
  }
  public static function updateProfessor($id, $title, $name, $username, $phone, $email, $password, $department) {
    return self::where('id', $id)->update([
      'title' => $title,
      'name' => $name,
      'username' => $username,
      'phone' => $phone,
      'email' => $email,
      'password' => $password,
      'department' => $department,
    ]);
  }

}
