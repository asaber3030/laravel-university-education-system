<?php

use App\Http\Controllers\Student\AssignmentController;
use App\Http\Controllers\Student\BadgeController;
use App\Http\Controllers\Student\QuizzesController;
use App\Http\Controllers\Student\SemesterController;
use App\Http\Controllers\Student\StudentController;
use App\Http\Controllers\Student\SubjectsController;
use App\Http\Controllers\Student\SummaryController;
use App\Http\Controllers\Student\TeachingStaffController;
use App\Http\Controllers\Student\TimetableContoller;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  Route::controller(StudentController::class)->group(function () {

    Route::get('login', 'loginView')->name('students.login');
    Route::post('login', 'loginAction')->name('students.login.action');

    Route::middleware('students.loggined')->group(function () {

      Route::group(['as' => 'students.'], function () {

        Route::get('/', 'dashboard')->name('dashboard');

        Route::get('/announcements', 'announcements')->name('ann');

        Route::group(['as' => 'profile.', 'prefix' => 'profile'], function () {

          Route::get('/', 'profile')->name('main');
          Route::post('/', 'profileAction');

          Route::get('picture', 'picture')->name('picture');
          Route::post('picture', 'pictureAction');

          Route::get('change-password', 'password')->name('password');
          Route::post('change-password', 'passwordAction');

          Route::get('badges', 'badges')->name('badges');
          Route::get('notifications', 'notifications')->name('notifications');

          Route::get('study-content', 'allStudyingContent')->name('study');

          Route::get('report-problem', 'reportProblem')->name('report');
          Route::post('report-problem', 'reportProblemAction');

          Route::get('report-problem/{report}', 'viewReport')->name('report.view');

        });

        Route::post('activateAllNotifications', 'activateNotifications')->name('activate.notifications');
        Route::post('activateSpecificNotifications', 'activateSpecificNotification')->name('activate.notification');

      });

    });

  });

  Route::controller(SummaryController::class)->group(function () {

    Route::group(['as' => 'students.summary.', 'prefix' => 'summary'], function () {

      Route::get('list/{subject?}', 'list')->name('list');

      Route::get('new/create', 'createSummary')->name('create');
      Route::post('new/create', 'createSummaryAction');

      Route::prefix('summary/{summary}')->group(function () {

        Route::get('view', 'viewSummary')->name('view');
        Route::post('view', 'viewSummaryAction');

        Route::get('delete', 'deleteSummaryView')->name('delete');
        Route::post('delete', 'deleteSummaryAction');

      });

    });

  });

  Route::controller(SubjectsController::class)->group(function () {

    Route::group(['as' => 'students.subjects.', 'prefix' => 'subjects'], function () {

      Route::get('/', 'list')->name('list');

      Route::prefix('view')->group(function () {

        Route::get('{subject}', 'viewSubject')->name('view');
        Route::get('{subject}/course', 'viewSubjectCourse')->name('view.course');

        Route::get('{subject}/summaries', 'viewSubjectSummaries')->name('view.summaries');
        Route::get('{subject}/summaries/search-username/{student}', 'summariesSearchStudent')->name('search.username.summaries');
        Route::get('{subject}/summaries/search-chapter/{chapter}', 'summariesSearchChapter')->name('search.chapter.summaries');
        Route::get('{subject}/summaries/search-both/{student}/{chapter}', 'summariesSearchBoth')->name('search.both.summaries');

      });

    });

  });

  Route::controller(AssignmentController::class)->group(function () {

    Route::group(['as' => 'students.assignments.', 'prefix' => 'assignments'], function () {

      Route::get('/', 'list')->name('list');

      Route::get("view/{assignment}/{code}", 'viewAssignment')->name('view');

      Route::get("subject/{subject}/", 'viewAssignmentsOfSubject')->name('view.subject');

      Route::get("answer/{assignment}/{code}", 'sendAssignmentView')->name('answer');
      Route::post("answer/{assignment}/{code}", 'sendAssignmentAction');


      Route::get("answer/update/{assignment}/{code}", 'updateAssignmentAnswerView')->name('answer.update');
      Route::post("answer/update/{assignment}/{code}", 'updateAssignmentAnswerAction');

    });

  });

  Route::controller(QuizzesController::class)->group(function () {

    Route::group(['as' => 'students.quizzes.', 'prefix' => 'quizzes'], function () {

      Route::get('/', 'list')->name('list');

      Route::get("view/{quiz}/answers", 'viewAnswers')->name('view.answers');

      Route::get("join/{quiz}", 'joinQuizView')->name('join');

      Route::post('add-answer', 'addAnswer')->name('add.answer');
      Route::post('find-answer', 'findAnswer')->name('find.answer');

      Route::get("subject/{subject}", 'viewSubjectQuizzes')->name('view.subject');

      Route::get("answer/{quiz}/{code}", 'sendQuizView')->name('answer');
      Route::post("answer/{quiz}/{code}", 'sendQuizAction');


      Route::get("answer/update/{quiz}/{code}", 'updateQuizAnswerView')->name('answer.update');
      Route::post("answer/update/{quiz}/{code}", 'updateQuizAnswerAction');

    });

  });

  Route::controller(BadgeController::class)->group(function () {

    Route::group(['as' => 'students.badges.', 'prefix' => 'badges'], function () {

      Route::get('/', 'list')->name('list');

      Route::get('view/{badge}', 'viewBadge')->name('view');

    });

  });

  Route::controller(SemesterController::class)->group(function () {

    Route::group(['as' => 'students.semesters.', 'prefix' => 'semesters'], function () {

      Route::get('/', 'list')->name('list');

      Route::group(['as' => 'view.' , 'prefix' => 'view'], function () {

        Route::get('{semester}', 'viewSemester')->name('semester');

        Route::get('{semester}/grades', 'viewSemesterGrades')->name('semester.grades');
        Route::get('{semester}/studying-content', 'viewSemesterStudyingContent')->name('semester.content');

      });

    });

  });

  Route::controller(TimetableContoller::class)->group(function () {

    Route::group(['as' => 'students.timetable.', 'prefix' => 'timetable'], function () {

      Route::get('/', 'list')->name('list');

    });

  });

  Route::controller(TeachingStaffController::class)->group(function () {

    Route::group(['as' => 'students.staff.', 'prefix' => 'staff'], function () {

      Route::get('/', 'list')->name('list');

    });

  });
});


