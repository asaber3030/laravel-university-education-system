<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model {
  use HasFactory;

  function students() {
    return $this->hasMany(StudentBadges::class, 'badge', 'id');
  }

}
