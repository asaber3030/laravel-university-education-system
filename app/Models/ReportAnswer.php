<?php

namespace App\Models;

use App\Models\Professor\Professor;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportAnswer extends Model
{
  use HasFactory;

  protected $table = 'report_answer';

  function report() {
    return $this->belongsTo(Report::class, 'report', 'id');
  }

  function professor() {
    return $this->belongsTo(Professor::class, 'professor', 'id');
  }
}
