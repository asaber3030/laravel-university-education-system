<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
  use HasFactory;

  protected $fillable = ['file', 'name', 'info', 'subject', 'number'];

  public function subject() {
    return $this->belongsTo(Subjects::class, 'subject', 'id');
  }
}
