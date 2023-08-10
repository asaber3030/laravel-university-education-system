<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Assignment extends Model
{
  use HasFactory;

  protected $fillable = [
    'professor', 'course', 'year',
    'title', 'information', 'file', 'subject', 'link', 'deadline', 'code', 'accept_answer', 'allow_update',
  ];

  // Relations
  public function year(): BelongsTo {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }
  public function answers(): HasMany {
    return $this->hasMany(AssignmentAnswer::class, 'assignment', 'id');
  }
  public function course(): BelongsTo {
    return $this->belongsTo(Courses::class, 'course', 'id');
  }
  public function subject(): BelongsTo {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
  public function professor(): BelongsTo {
    return $this->belongsTo(Professor::class, 'professor', 'id');
  }
  public function grades(): HasMany {
    return $this->hasMany(AssignmentGrade::class, 'assignment', 'id');
  }
  public function warnings(): HasMany {
    return $this->hasMany(AssignmentWarning::class, 'assignment', 'id');
  }

}
