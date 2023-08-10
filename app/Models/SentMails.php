<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SentMails extends Model
{
  use HasFactory;
  protected $table = 'sent_emails';
  protected $fillable = ['professor', 'student', 'content', 'subject', 'email', 'importance'];
  public $timestamps = false;

  public function student() {
    return $this->belongsTo(Student::class, 'student', 'id');
  }

}
