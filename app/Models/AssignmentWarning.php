<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentWarning extends Model
{
  public $timestamps = false;
  protected $table = 'assignment_warnings';
  protected $fillable = ['student', 'assignment', 'reason'];

  use HasFactory;
  public function assignment() {
    return $this->belongsTo(Assignment::class, 'assignment', 'id');
  }
  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }
}
