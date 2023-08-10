<?php

use App\Http\Controllers\Professor\SettingsController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Professor\CourseLecturesController;
use App\Http\Controllers\Professor\QuizzesController;
use App\Http\Controllers\Professor\SubjectsController;
use App\Http\Controllers\Professor\ProfessorController;
use App\Http\Controllers\Professor\StudentController;
use App\Http\Controllers\Professor\DepartmentsController;
use App\Http\Controllers\Professor\AssignmentsController;
use App\Http\Controllers\Professor\AppSettingsController;
use App\Http\Controllers\Professor\StudentSettingsController;
use App\Http\Controllers\Professor\TeachingStaffController;
use App\Http\Controllers\Professor\TimetableController;
use App\Http\Controllers\Professor\AnnoucementsController;

Route::group(['as' => 'professors.', 'prefix' => 'professors'], function () {

  Route::controller(ProfessorController::class)->group(function () {

    Route::get('/', 'dashboard')->name('dashboard');

    // Login Routes
    Route::get('login', 'loginView')->name('login');
    Route::post('login', 'loginAction');

    // List
    Route::get('list', 'listAll')->name('list');

    // Create
    Route::get('create', 'createView')->name('create');
    Route::post('create', 'createAction');

    // Update
    Route::get('update/{professor}', 'updateView')->name('update');
    Route::post('update/{professor}', 'updateAction');

    // Delete
    Route::get('delete/{professor}', 'deleteView')->name('delete');
    Route::post('delete/{professor}', 'deleteAction');

    // View
    Route::get('view/{professor}', 'viewProfessor')->name('view');

  });

  Route::group(['prefix' => 'students', 'as' => 'students.'], function () {

    Route::controller(StudentController::class)->group(function () {

      Route::get('list/{department?}/{year?}', 'students')->name('list');

      Route::get('/create', 'createView')->name('create');
      Route::post('/create', 'createAction');

      Route::get('import', 'importStudentsView')->name('import');
      Route::post('import', 'importStudentsAction');

      Route::prefix('{student}')->group(function () {

        // View2 Student
        Route::get('/', 'viewStudent')->name('view');

        Route::get('quizzes', 'viewStudentQuizzes')->name('quizzes');

        // Current Semester
        Route::get('current-semester', 'currentSemester')->name('current-semester');

        // Edit
        Route::get('update', 'updateView')->name('update');
        Route::post('update', 'updateAction');

        // Send Mail
        Route::get('mail', 'sendMailView')->name('mail');
        Route::post('mail', 'sendMailAction');

        // Student mails
        Route::get('all-mails/{mail?}', 'allStudentMails')->name('mails');

        // Delete Mail
        Route::get('delete/mail/{mail}', 'deleteMailView')->name('mail.delete');
        Route::post('delete/mail/{mail}', 'deleteMailAction');

        // Assign Student Semester
        Route::get('assign-semester', 'assignSemesterView')->name('semester.assign');
        Route::post('assign-semester', 'assignSemesterAction');

        // Update Semester
        Route::get('semesters/{semester}/update', 'updateSemesterView')->name('semesters.update');
        Route::post('semesters/{semester}/update', 'updateSemesterAction');

        // Add New Subject Grade for {student} and {semester}
        Route::get('semesters/{semester}/add-grades', 'addSemesterGradesView')->name('semesters.grades.add');
        Route::post('semesters/{semester}/add-grades', 'addSemesterGradesAction');

        // Update Semester Grades
        Route::get('semesters/{semester}/update-grades', 'updateSemesterGradesView')->name('semesters.grades.update');

        Route::get('semesters/{semester}/update-grades/{grade}', 'updateFinalGradeView')->name('semesters.grades.update.final');
        Route::post('semesters/{semester}/update-grades/{grade}', 'updateFinalGradeAction');

        // All Done Semesters
        Route::get('semesters', 'allSemesters')->name('semesters');

        // View2 Specific Semester
        Route::get('semesters/{semester}', 'viewSemester')->name('semesters.view');

      });

    });

  });

  Route::group(['prefix' => 'subjects', 'as' => 'subjects.'], function () {

    Route::controller(SubjectsController::class)->group(function() {

      // List Subjects
      Route::get('/', 'list')->name('list');

      Route::get('create/{department?}', 'createSubjectView')->name('create');
      Route::post('create/{department?}', 'createSubjectAction');

      Route::prefix('{subject}')->group(function () {

        Route::get('/')->name('viewSubjeect')->name('view');

        Route::get('grades', 'defaultGradesView')->name('grades');
        Route::post('grades', 'defaultGradesAction');

        Route::get('update', 'updateSubjectView')->name('update');
        Route::post('update', 'updateSubjectAction');

        Route::get('delete', 'deleteSubjectView')->name('delete');
        Route::post('delete', 'deleteSubjectAction');

        Route::prefix('chapters')->group(function () {
          Route::get('/', 'subjectChapters')->name('chapters');

          Route::get('add', 'addChapterView')->name('create.chapter');
          Route::post('add', 'addChapterAction');

          Route::get('{chapter}/update', 'updateChapterView')->name('update.chapter');
          Route::post('{chapter}/update', 'updateChapterAction');

          Route::get('{chapter}delete', 'deleteChapterView')->name('delete.chapter');
          Route::post('{chapter}delete', 'deleteChapterAction');
        });


      });

    });

  });

  Route::group(['prefix' => 'departments', 'as' => 'deps.'], function () {

    Route::controller(DepartmentsController::class)->group(function() {

      // List Subjects
      Route::get('/', 'list')->name('list');

      Route::get('create', 'createDepartmentView')->name('create');
      Route::post('create', 'createDepartmentAction');

      Route::prefix('{department}')->group(function () {

        Route::get('/')->name('viewDepartment');

        Route::get('update', 'updateDepartmentView')->name('update');
        Route::post('update', 'updateDepartmentAction');

        Route::get('students/add/manual', 'addStudentManualView')->name('students.add.manual');
        Route::post('students/add/manual', 'addStudentManualAction');

        Route::prefix('professors')->group(function () {

          Route::get('/', 'departmentProfessors')->name('professors');

          Route::get('create', 'createDepartmentProfessorView')->name('create.professor');
          Route::post('create', 'createDepartmentProfessorAction');

        });

        Route::prefix('studying-years')->group(function () {

          Route::get('/', 'departmentYears')->name('years');

          Route::get('add', 'addYearView')->name('year.add');
          Route::post('add', 'addYearAction');

          Route::prefix('{year}')->group(function () {

            Route::get('update', 'updateYearView')->name('year.update');
            Route::post('update', 'updateYearAction');

            Route::get('delete', 'deleteYearView')->name('year.delete');
            Route::post('delete', 'deleteYearAction');

            Route::get('grades', 'yearGrades')->name('year.grades');

            Route::get('semesters', 'yearSemesters')->name('year.semesters');

            Route::get('semesters/{semester}', 'viewSemester')->name('year.semesters.view');

            Route::get('semesters/{semester}/update', 'updateYearSemesterView')->name('year.semesters.update');
            Route::post('semesters/{semester}/update', 'updateYearSemesterAction');

            Route::get('content', 'yearContent')->name('year.content');

            Route::get('content/{course}/update', 'updateCourseView')->name('year.content.update');
            Route::post('content/{course}/update', 'updateCourseAction');

            Route::get('content/{course}/delete', 'deleteCourseView')->name('year.content.delete');
            Route::post('content/{course}/delete', 'deleteCourseAction');

            Route::get('content/add', 'createCourseView')->name('year.content.add');
            Route::post('content/add', 'createCourseAction');

            Route::get('announcements/add', 'addAnnView')->name('year.ann.add');
            Route::post('announcements/add', 'addAnnAction');

            Route::group(['prefix' => 'students'], function () {
              Route::get('/', 'yearStudentsView')->name('year.students');

              Route::get('add', 'addStudentsView')->name('year.students.add');
              Route::post('add', 'addStudentsAction');

              Route::get('promote-succeeded', 'promoteStudentsView')->name('year.students.promote.succeeded');
              Route::post('promote-succeeded', 'promoteStudentsAction');

              Route::get('add/grades-csv', 'addGradesCSVView')->name('year.students.add.grades');
              Route::post('add/grades-csv', 'addGradesCSVAction');

              Route::get('update/grades-csv', 'updateGradesCSVView')->name('year.grades.update');
              Route::post('update/grades-csv', 'updateGradesCSVAction');

              Route::get('add/grades-manually/{student}/{course}', 'addGradesManuallyView')->name('year.students.add.grades.manual');
              Route::post('add/grades-manullay/{student}/{course}', 'addGradesManuallyAction');

              Route::get('update/grades-manually/{student}/{grade}', 'updateStudentGradeManuallyView')->name('year.students.update.grades');
              Route::post('update/grades-manually/{student}/{grade}', 'updateStudentGradeManuallyAction');

            });

          });

        });

        Route::get('subjects', 'departmentSubjects')->name('subjects');
        Route::get('students', 'departmentStudents')->name('students');

      });

    });

  });

  Route::group(['prefix' => 'courses', 'as' => 'courses.'], function () {

    Route::controller(CourseLecturesController::class)->group(function () {

      Route::get('/', 'courses')->name('list');

      Route::get('add', 'addCourseView')->name('add');
      Route::post('add', 'addCourseAction');

      Route::get('{course}', 'viewCourse')->name('view');

      Route::get('{course}/view/lecture/{lecture}', 'viewLecture')->name('view.lecture');

      Route::get('{course}/update', 'updateCourseView')->name('update');
      Route::post('{course}/update', 'updateCourseAction');

      Route::get('{course}/delete', 'deleteCourseView')->name('delete');
      Route::post('{course}/delete', 'deleteCourseAction');

      Route::get('{course}/add/lecture', 'addLectureView')->name('add.lecture');
      Route::post('{course}/add/lecture', 'addLectureAction');

      Route::get('{course}/update/lecture/{lecture}', 'updateLectureView')->name('update.lecture');
      Route::post('{course}/update/lecture/{lecture}', 'updateLectureAction');

      Route::get('{course}/delete/lecture/{lecture}', 'deleteLectureView')->name('delete.lecture');
      Route::post('{course}/delete/lecture/{lecture}', 'deleteLectureAction');

    });

  });

  Route::group(['prefix' => 'assignments', 'as' => 'ass.'], function () {

    Route::controller(AssignmentsController::class)->group(function () {

      Route::get('/', 'listAssignments')->name('list');

      Route::get('year/{year}', 'yearAssignments')->name('year');

      Route::get('choose-year', 'chooseYear')->name('choose-year');

      Route::get('new-assignment/{year}', 'newYearAssignmentView')->name('new');
      Route::post('new-assignment/{year}', 'newYearAssignmentAction');

      Route::post('send-warning/{assignment}', 'sendWarning')->name('send-warning');
      Route::post('delete/{assignment}', 'deleteAssignment')->name('delete');

      Route::get('view/{assignment}/{panel?}', 'viewAssignmentPage')->name('view');
      Route::post('view/{assignment}/{panel?}', 'viewAssignmentAction');

    });

  });

  Route::group(['prefix' => 'announcements', 'as' => 'ann.'], function () {

    Route::controller(AnnoucementsController::class)->group(function () {

      Route::get('/', 'listAnnoucements')->name('list');

      Route::get('add/{year}', 'addView')->name('add');
      Route::post('add/{year}', 'addAction');

      Route::get('announcements/{year}', 'yearAnnouncements')->name('view-year');

    });

  });

  Route::group(['prefix' => 'quizzes', 'as' => 'quiz.'], function () {

    Route::controller(QuizzesController::class)->group(function () {

      Route::get('/{year?}', 'quizzesList')->name('list');

      Route::prefix('quiz')->group(function () {

        Route::get('create', 'createQuizView')->name('create');
        Route::post('create', 'createQuizAction');

        Route::get('view/{quiz}', 'quizView')->name('view');
        Route::post('view/{quiz}', 'quizAction');

        Route::get('update/{quiz}', 'updateQuizView')->name('update');
        Route::post('update/{quiz}', 'updateQuizAction');

        Route::prefix('answers')->group(function () {

          Route::get('{quiz}', 'quizAnswersView')->name('answers');

          Route::get('student/{quiz}/{student}', 'answersOfStudentView')->name('answers.student');

        });

        Route::prefix('question')->group(function () {

          Route::get('{quiz}/create', 'createQuestionView')->name('create.question');
          Route::post('{quiz}/create', 'createQuestionAction');

          Route::get('update/{question}', 'updateQuestionView')->name('update.question');
          Route::post('update/{question}', 'updateQuestionAction');

          Route::post('delete/{question}', 'deleteQuestionAction')->name('delete.question');

          // APIs:
          Route::post('make-question-title/{question}', 'changeQuestionTitle')->name('question.change-title');
          Route::post('make-correct/{mcqID}', 'makeMCQCorrect')->name('mcq.make-correct');
          Route::post('change-title/{mcqID}', 'changeMCQTitle')->name('mcq.change-title');

          # Create MCQ for {question}
          Route::post('mcq/create/{question}', 'createQuestionMCQ')->name('create.mcq');

          # Delete MCQ of {question}
          Route::post('mcq/delete/{mcqID}', 'deleteQuestionMCQ')->name('delete.mcq');

        });

      });

    });

  });

  Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {

    Route::controller(SettingsController::class)->group(function () {

      Route::get('app', 'appView')->name('app');
      Route::post('app', 'appAction');

      Route::get('departments', 'departments')->name('departments');
      Route::get('professors', 'professors')->name('professors');
      Route::get('assistants', 'assistants')->name('assistants');

      Route::post('change-app-mode', 'changeAppMode')->name('change.mode');
      Route::post('change-app-details', 'changeAppDetails')->name('change.details');
      Route::post('change-app-logo', 'changeAppLogo')->name('change.logo');

    });

    Route::group(['prefix' => 'students', 'as' => 'students.'], function () {

      Route::controller(StudentSettingsController::class)->group(function () {

        Route::get('/', 'studentSettings')->name('main');

        Route::post('update-theme/{id}/{theme}', 'changeTheme')->name('update.theme');
        Route::post('update-language/{id}/{lang}', 'changeLanguage')->name('update.language');
        Route::post('update-personal-info/{id}/{status}', 'changeUpdatingPersonalInformationStatus')->name('update.personal');
        Route::post('update-reset/{id}/{status}', 'studentsCanResetPassword')->name('update.reset');
        Route::post('update-login/{id}/{status}', 'studentsCanLogin')->name('update.login');

      });

    });

  });

  Route::group(['prefix' => 'teaching-staff', 'as' => 'staff.'], function () {

    Route::controller(TeachingStaffController::class)->group(function () {

      Route::get('/', 'list')->name('list');

      Route::get('delete/{staff}', 'deleteStaffView')->name('delete');
      Route::post('delete/{staff}', 'deleteStaffAction');

      Route::get('add/{year?}', 'addStaffView')->name('add');
      Route::post('add/{year?}', 'addStaffAction');

    });

  });

  Route::group(['prefix' => 'timetable', 'as' => 'timetable.'], function () {

    Route::controller(TimetableController::class)->group(function () {

      Route::get('/', 'list')->name('list');
      Route::get('view-year/{year}', 'yearTimetable')->name('view-year');

      Route::get('delete/{year}/event/{event}', 'deleteEvent')->name('delete');

      Route::get('add/{year}/event/{selectedDay}', 'addTimeTableEventView')->name('add');
      Route::post('add/{year}/event/{selectedDay}', 'addTimeTableEventAction');

      Route::get('update/{year}/event/{event}', 'updateTimeTableEventView')->name('update');
      Route::post('update/{year}/event/{event}', 'updateTimeTableEventAction');

    });

  });

  Route::group(['prefix' => 'announcements', 'as' => 'ann.'], function () {

    Route::controller(AnnoucementsController::class)->group(function () {

      Route::get('/', 'list')->name('list');

      Route::get('view-year/{year}', 'viewYear')->name('year.view');

      Route::post('delete/{id}', 'handleDelete')->name('delete');

    });

  });

});

