<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Subjects;
use App\Models\Summary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SummaryController extends Controller {

  function list(Subjects $subject = null) {
    $student = Auth::user();

    if ($subject != null) {
      return inertia('Student/Summary/Summary', [
        'summary' => Summary::with('subject', 'chapter')->where('subject', $subject->id)->where('student', $student->getAuthIdentifier())->get(),
        'subjects' => Subjects::where('year', $student->year)->get(),
        'subject' => $subject
      ]);
    } else {
      return inertia('Student/Summary/Summary', [
        'summary' => Summary::with('subject', 'chapter')->where('student', $student->getAuthIdentifier())->get(),
        'subjects' => Subjects::where('year', $student->year)->get()
      ]);
    }

  }

  function createSummary() {
    return inertia('Student/Summary/CreateSummary', [
      'subjects' => Subjects::where('year', Auth::user()->year)->get(),
      'chapters' => Chapter::all(),
    ]);
  }
  function createSummaryAction(Request $request) {
    $request->validate([
      'subject' => 'required|exists:subjects,id',
      'chapter' => 'required|exists:chapters,id',
      'file' => 'required|mimes:pdf,word,ttf,docx',
      'file.*' => 'required|mimes:pdf,word,ttf,docx',
      'quick_preview' => 'required|url|max:255',
    ]);

    $file = $request->file('file');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $uploadFile = $file->move(STUDENT_SUMMARY_TARGET, $fileName);

    Summary::create([
      'file' => STUDENT_SUMMARY_TARGET . $fileName,
      'student' => Auth::user()->getAuthIdentifier(),
      'year' => Auth::user()->year,
      'subject' => $request->input('subject'),
      'chapter' => $request->input('chapter'),
      'description' => $request->input('description'),
      'quick_preview' => $request->input('quick_preview'),
      'private' => $request->input('private') ? 1 : 0
    ]);

    message('New Summary Has been added to your list!');
    return to_route('students.summary.list');
  }

  function deleteSummaryView(Summary $summary) {
    $student = Auth::user();
    if ($summary->student == $student->getAuthIdentifier() && $summary->year == $student->year) {
      return inertia('Student/Summary/DeleteSummary', [
        'summary' => Summary::with('subject', 'chapter')->find($summary->id)
      ]);
    } else {
      abort(404);
    }

  }
  function deleteSummaryAction(Request $request, Summary $summary) {
    $summary->delete();
    message('Summary has been deleted!', 'warning');
    return to_route('students.summary.list');
  }

  function viewSummary(Summary $summary) {
    $student = Auth::user();
    if ($summary->student == $student->getAuthIdentifier() && $summary->year == $student->year) {
      return inertia('Student/Summary/ViewSummary', [
        'summary' => Summary::with('subject', 'chapter', 'year')->find($summary->id)
      ]);
    } else {
      abort(404);
    }
  }

  function viewSummaryAction(Request $request, Summary $summary) {
    $student = Auth::user();
    if ($summary->student == $student->getAuthIdentifier() && $summary->year == $student->year) {

      $finalFile = '';

      if ($request->hasFile('file')) {
        $request->validate([
          'file' => 'required|mimes:pdf,word,ttf,docx',
          'file.*' => 'required|mimes:pdf,word,ttf,docx',
          'quick_preview' => 'required|url|max:255',
        ]);

        $file = $request->file('file');
        $finalFile = generateFileName() . $file->getClientOriginalExtension();
        $uploadFile = $file->move(STUDENT_SUMMARY_TARGET, $finalFile);
      }

      Summary::where('id', $summary->id)->update([
        'file' => $request->hasFile('file') ? STUDENT_SUMMARY_TARGET . $finalFile : $summary->file,
        'description' => $request->input('description'),
        'quick_preview' => $request->input('quick_preview'),
        'private' => $request->input('private') ? 1 : 0
      ]);

      message('Summary Has been updated successfully!');

      return to_route('students.summary.list');

    } else {
      abort(404);
    }
  }

}
