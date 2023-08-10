<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeachingStaff extends Model {

  use HasFactory;

  protected $table = 'teaching_staff';
  protected $fillable = ['year', 'subject', 'professor'];

  function year(): BelongsTo {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  function professor(): BelongsTo {
    return $this->belongsTo(Professor\Professor::class, 'professor', 'id');
  }
  function subject(): BelongsTo {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }

}
