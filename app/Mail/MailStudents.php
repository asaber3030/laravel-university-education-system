<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailStudents extends Mailable
{
  use Queueable, SerializesModels;

  public $messageSubject;
  public $messageFrom;
  public $messageContent;

  public function __construct($messageSubject, $messageFrom, $messageContent) {
    $this->messageSubject = $messageSubject;
    $this->messageFrom = $messageFrom;
    $this->messageContent = $messageContent;
  }

  public function build() {
    return $this->subject($this->messageSubject)
      ->view('mails.students');
  }
}
