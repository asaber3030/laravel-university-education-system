<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentAnswer extends Model
{
  use HasFactory;

  protected $fillable = ['student', 'assignment', 'file', 'notes'];

  public function assignment() {
    return $this->belongsTo(Assignment::class, 'assignment', 'id');
  }
}
