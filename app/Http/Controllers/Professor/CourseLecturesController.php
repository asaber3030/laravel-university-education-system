<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\CourseLectures;
use App\Models\Courses;
use App\Models\Subjects;
use App\Models\YearsCourses;
use Illuminate\Http\Request;

class CourseLecturesController extends Controller {

  // List courses
  public function courses() {
    return inertia('Professor/Courses/List/ListCourses', [
      'courses' => Courses::with('year', 'subject', 'lectures')->latest()->get()
    ]);
  }

  // View2 Course
  public function viewCourse(Courses $course) {
    return inertia('Professor/Courses/View2/ViewCourse', [
      'course' => Courses::with([
        'year' => fn($q) => $q->with('department'),
        'subject' => fn($q) => $q->with('grades', 'chapters'),
        'lectures'
      ])->find($course->id)
    ]);
  }

  // View2 Lecture
  public function viewLecture(Courses $course, CourseLectures $lecture) {
    return inertia('Professor/Courses/View2/ViewLecture', [
      'lecture' => $lecture,
      'course' => Courses::with([
        'year' => fn($q) => $q->with('department'),
        'subject' => fn($q) => $q->with('grades', 'chapters'),
        'lectures'
      ])->find($course->id)
    ]);
  }

  // Create course
  public function addCourseView() {
    return inertia('Professor/Courses/Create/CreateCourse', [
      'courses' => Courses::with('year', 'subject', 'lectures')->latest()->get(),
      'years' => YearsCourses::all(),
      'subjects' => Subjects::all()
    ]);
  }
  public function addCourseAction(Request $request) {
    $request->validate([
      'title' => 'required|min:5',
      'info' => 'required|min:100|max:1500',
      'year' => 'required|exists:year_courses,id|integer',
      'subject' => 'required|exists:subjects,id|integer'
    ]);
    $findCourse = Courses::where('year', $request->input('year'))->where('subject', $request->input('subject'))->exists();
    if (!$findCourse) {
      Courses::createCourse(
        $request->input('title'),
        $request->input('info'),
        $request->input('subject'),
        $request->input('year')
      );
      message('Course has been created successfully!');
      return to_route('professors.courses.list');
    }
    message('Course already exists!', 'warning');
  }

  // Update Course
  public function updateCourseView(Courses $course) {
    return inertia('Professor/Courses/Update/UpdateCourse', [
      'course' => $course,
      'courses' => Courses::with('year', 'subject', 'lectures')->latest()->get(),
      'years' => YearsCourses::all(),
      'subjects' => Subjects::all()
    ]);
  }
  public function updateCourseAction(Request $request, Courses $course) {
    $request->validate([
      'title' => 'required|min:5',
      'info' => 'required|min:100|max:1500',
      'year' => 'required|exists:year_courses,id|integer',
      'subject' => 'required|exists:subjects,id|integer'
    ]);
    $findCourse = Courses::where('year', $request->input('year'))->where('subject', $request->input('subject'))->exists();
    if (!$findCourse) {
      Courses::updateCourse(
        $course->id,
        $request->input('title'),
        $request->input('info'),
        $request->input('subject'),
        $request->input('year')
      );
      message('Course has been updated successfully!');
      return to_route('professors.courses.list');
    }
    message('Course already exists!', 'warning');
  }

  // Update Lecture
  public function updateLectureView(Courses $course, CourseLectures $lecture) {
    return inertia('Professor/Courses/Update/UpdateLecture', [
      'course' => $course,
      'lecture' => $lecture,
    ]);
  }
  public function updateLectureAction(Request $request, Courses $course, CourseLectures $lecture) {
    $request->validate([
      'title' => 'required|min:5',
      'information' => 'required|min:100|max:1500',
    ]);

    $finalLectureFile = $lecture->file;
    $finalLectureVideo = $lecture->video;

    if ($request->hasFile('file')) {
      $lectureFileReq = $request->file('file');
      $newLectureFileName = generateFileName() . $lectureFileReq->getClientOriginalExtension();
      $lectureFileReq->move(LECTURE_FILES_TARGET, $newLectureFileName);
      $finalLectureFile = LECTURE_FILES_TARGET . $newLectureFileName;
      $oldFile = public_path(LECTURE_FILES_TARGET) . '/' . $lecture->file;
      if (file_exists($oldFile)) {
        unlink(public_path(LECTURE_FILES_TARGET) . $lecture->file);
      }
    }

    if ($request->hasFile('video')) {
      $lectureVideoReq = $request->file('video');
      $newLectureVideoName = generateFileName() . $lectureVideoReq->getClientOriginalExtension();
      $lectureVideoReq->move(LECTURE_VIDEOS_TARGET, $newLectureVideoName);
      $finalLectureVideo = LECTURE_VIDEOS_TARGET . $newLectureVideoName;

      $oldVideo = public_path(LECTURE_VIDEOS_TARGET) . '/' . $lecture->video;
      if (file_exists($oldVideo)) {
        unlink(public_path(LECTURE_VIDEOS_TARGET) . $lecture->video);
      }
    }

    CourseLectures::where('id', $lecture->id)->update([
      'title' => $request->input('title'),
      'information' => $request->input('information'),
      'file' => $finalLectureFile,
      'video' => $finalLectureVideo,
    ]);

    message('Course lecture has been updated successfully!');
    return to_route('professors.courses.view', $course->id);

  }

  // Add Lecture
  public function addLectureView(Courses $course) {
    return inertia('Professor/Courses/Create/CreateLecture', [
      'course' => Courses::with('year', 'subject')->find($course->id),
    ]);
  }
  public function addLectureAction(Request $request, Courses $course) {
    $request->validate([
      'title' => 'required|min:5|max:255',
      'information' => 'required|min:100|max:1500',
      'video.*' => 'required|mimes:mp4,wmv,mov,avi,mkv',
    ]);

    $videoReq = $request->file('video');
    $videoFileName = generateFileName() . $videoReq->getClientOriginalExtension();
    $videoReq->move(LECTURE_VIDEOS_TARGET, $videoFileName);

    if ($request->hasFile('file')) {
      $fileReq = $request->file('file');
      $lectureFileName = generateFileName() . $fileReq->getClientOriginalExtension();
      $fileReq->move(LECTURE_FILES_TARGET, $lectureFileName);

      CourseLectures::create([
        'course' => $course->id,
        'title' => $request->input('title'),
        'information' => $request->input('information'),
        'file' => LECTURE_FILES_TARGET . $lectureFileName,
        'video' => LECTURE_VIDEOS_TARGET . $videoFileName,
      ]);
    } else {
      CourseLectures::create([
        'course' => $course->id,
        'title' => $request->input('title'),
        'information' => $request->input('information'),
        'file' => null,
        'video' => LECTURE_VIDEOS_TARGET . $videoFileName,
      ]);
    }

    message('Course lecture has been added successfully!');
    return to_route('professors.courses.view', $course->id);
  }

  // Delete course
  public function deleteCourseView(Courses $course) {
    return inertia('Professor/Courses/Delete/DeleteCourse', [
      'course' => Courses::with('year', 'subject')->find($course->id),
    ]);
  }
  public function deleteCourseAction(Request $request, Courses $course) {
    $course->delete();
    message('Course has been deleted successfully!', 'warning');
    return to_route('professors.courses.list');
  }

  // Delete Lecture
  public function deleteLectureView(Courses $course, CourseLectures $lecture) {
    return inertia('Professor/Courses/Delete/DeleteLecture', [
      'course' => $course,
      'lecture' => $lecture,
    ]);
  }
  public function deleteLectureAction(Request $request, Courses $course, CourseLectures $lecture) {
    $lecture->delete();
    message('Course Lecture has been deleted successfully!', 'warning');
    return to_route('professors.courses.view', $course->id);
  }
}
