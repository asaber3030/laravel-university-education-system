<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Timetable;
use App\Models\TimetableDay;
use App\Models\YearsCourses;
use Illuminate\Http\Request;

class TimetableController extends Controller {

  function list() {
    return inertia('Professor/Timetable/ListYears', [
      'departments' => Department::with('years')->orderBy('title')->get()
    ]);
  }

  function yearTimetable(YearsCourses $year) {
    return inertia('Professor/Timetable/YearTimetable', [
      'days' => TimetableDay::with([
        'timetable' => fn($q) => $q->where('year', $year->id)
      ])->get(),
      'year' => $year
    ]);
  }

  function addTimeTableEventView(YearsCourses $year, TimetableDay $selectedDay) {
    return inertia('Professor/Timetable/Add', [
      'year' => $year,
      'days' => TimetableDay::all(),
      'selectedDay' => $selectedDay
    ]);
  }
  function addTimeTableEventAction(Request $request, YearsCourses $year, TimetableDay $selectedDay) {
    $request->validate([
      'title' => 'required|max:40|min:3',
      'event' => 'required|max:20|min:2',
      'start' => 'required|date_format:H:i',
      'end' => 'required|date_format:H:i',
      'day' => 'required|exists:timetable_days,id'
    ]);

    Timetable::create([
      'text' => $request->input('title'),
      'event' => $request->input('event'),
      'day' => $request->input('day'),
      'start' => $request->input('start'),
      'end' => $request->input('end'),
      'year' => $year->id
    ]);

    message('Event has been added successfully!');

    return to_route('professors.timetable.view-year', $year->id);
  }

  function updateTimeTableEventView(YearsCourses $year, Timetable $event) {
    return inertia('Professor/Timetable/Update', [
      'year' => $year,
      'event' => $event,
      'days' => TimetableDay::all()
    ]);
  }
  function updateTimeTableEventAction(Request $request, YearsCourses $year, Timetable $event) {
    $request->validate([
      'title' => 'required|max:40|min:3',
      'event' => 'required|max:20|min:2',
      'start' => 'required',
      'end' => 'required',
      'day' => 'required|exists:timetable_days,id'
    ]);

    Timetable::where('id', $event->id)->update([
      'text' => $request->input('title'),
      'event' => $request->input('event'),
      'day' => $request->input('day'),
      'start' => $request->input('start'),
      'end' => $request->input('end'),
    ]);

    message('Event has been updated successfully!');

    return to_route('professors.timetable.view-year', $year->id);
  }

  function deleteEvent(YearsCourses $year, Timetable $event) {
    $event->delete();
    message('Event has been deleted successfully!');
    return to_route('professors.timetable.view-year', $year->id);
  }

}
