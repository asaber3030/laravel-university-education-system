<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Announcement extends Model {

  use HasFactory;

  protected $fillable = ['title', 'description', 'year', 'professor'];

  function professor(): BelongsTo {
    return $this->belongsTo(Professor::class, 'professor', 'id');
  }

  function year(): BelongsTo {
    return $this->belongsTo(YearsCourses::class, 'year', 'id');
  }

}
