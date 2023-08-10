<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\CourseGrade;
use App\Models\Courses;
use App\Models\Department;
use App\Models\Professor\Professor;
use App\Models\Student;
use App\Models\StudentSemesters;
use App\Models\SubjectGrades;
use App\Models\Subjects;
use App\Models\YearsCourses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentsController extends Controller {

  // List departments
  public function list() {
    return inertia('Professor/Departments/List/ListDepartments', [
      'departments' => Department::select('*')
        ->orderBy('id', 'desc')
        ->withCount('years', 'students', 'subjects', 'professors')
        ->get()
    ]);
  }

  // Create Department
  public function createDepartmentView() {
    return inertia('Professor/Departments/Create/CreateDepartment', [
      'departments' => Department::select('*')
        ->orderBy('id', 'desc')
        ->withCount('years', 'students', 'subjects')
        ->get()
    ]);
  }
  public function createDepartmentAction(Request $request) {
    $request->validate([
      'info' => 'required|min:100|max:1500',
      'title' => 'required|min:5|max:255|unique:departments',
      'icon.*' => 'required|file|mimes:png,svg'
    ]);
    Department::createDepartment(
      title: $request->input('title'),
      icon: $request->file('icon'),
      info: $request->input('info')
    );
    message('Department has been created successfully!', 'success');
    return to_route('professors.deps.list');
  }

  // Update Department
  public function updateDepartmentView(Department $department) {
    return inertia('Professor/Departments/Update/UpdateDepartment', [
      'departments' => Department::select('*')
        ->orderBy('id', 'desc')
        ->withCount('years', 'students', 'subjects')
        ->get(),
      'department' => $department
    ]);
  }
  public function updateDepartmentAction(Request $request, Department $department) {
    $request->validate([
      'info' => 'required|min:100|max:1500',
      'title' => 'required|min:5|max:255|unique:departments,id,' . $department->id . ',id',
      'icon.*' => 'required|file|mimes:png,svg'
    ]);

    Department::updateDepartment(
      hasFile: $request->hasFile('icon'),
      department: $department,
      title: $request->input('title'),
      icon: $request->file('icon'),
      info: $request->input('info')
    );

    message('Department has been updated successfully!', 'success');
    return to_route('professors.deps.list');
  }

  // Professors
  public function departmentProfessors(Department $department) {
    return inertia('Professor/Departments/Professors/DepartmentProfessors', [
      'department' => Department::with(['professors' => fn($q) => $q->with('department')])
        ->find($department->id)
    ]);
  }

  // Subjects
  public function departmentSubjects(Department $department) {
    return inertia('Professor/Departments/Subjects/DepartmentSubjects', [
      'department' => Department::with(['professors' => fn($q) => $q->with('department')])
        ->find($department->id),
      'subjects' => Subjects::where('department', $department->id)->with('department')->get()
    ]);
  }

  // Subjects
  public function departmentStudents(Department $department) {
    return inertia('Professor/Departments/Students/DepartmentStudents', [
      'department' => Department::with(['students' => fn($q) => $q->with('department')])
        ->find($department->id),
    ]);
  }

  // Professors
  public function createDepartmentProfessorView(Department $department) {
    return inertia('Professor/Departments/CreateProfessor/CreateProfessor', [
      'department' => Department::with(['professors' => fn($q) => $q->with('department')])
        ->find($department->id),
      'departments' => Department::select('id', 'title')->get()
    ]);
  }
  public function createDepartmentProfessorAction(Request $request, Department $department) {
    $request->validate([
      'title' => 'required|min:10|max:255',
      'name' => 'required|max:255|min:10',
      'phone' => 'required|regex:/^01[0125][0-9]{8}$/u|unique:professors',
      'email' => 'required|unique:professors|email',
      'department' => 'required|exists:departments,id',
      'username' => 'required|min:3|unique:professors',
      'password' => 'required|regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/|'
    ]);

    Professor::createProfessor(
      title: $request->input('title'),
      name: $request->input('name'),
      username: $request->input('username'),
      phone: $request->input('phone'),
      email: $request->input('email'),
      password: $request->input('password'),
      department: $request->input('department'),
    );

    message("Professor {$request->input('name')} has been added for department {$request->input('department')}");

    return to_route('professors.deps.professors', $request->input('department'));
  }

  // Department Years
  public function departmentYears(Department $department) {
    return inertia('Professor/Departments/Years/DepartmentYears', [
      'department' => Department::with([
        'years' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with('subject', fn($q) => $q->withCount('chapters')->with('grades'))
        ]),
      ])->withCount('students')->find($department->id)
    ]);
  }

  // Department Year Content
  public function departmentYearContent(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/Years/DepartmentYears', [
      'department' => Department::with([
        'years' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with('subject', fn($q) => $q->withCount('chapters')->with('grades'))
        ]),
      ])->withCount('students')->find($department->id)
    ]);
  }

  // Year Semesters
  public function yearSemesters(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/YearSemesters/YearSemesters', [
      'year' => YearsCourses::with(['semesters' => fn($q) => $q->with('student', 'year')])->find($year->id)
    ]);
  }

  // Update Semester
  public function updateYearSemesterView(Department $department, YearsCourses $year, StudentSemesters $semester) {
    return inertia('Professor/Departments/UpdateSemester/UpdateSemester', [
      'year' => YearsCourses::with(['semesters' => fn($q) => $q->with('student'), 'department'])->find($year->id),
      'semester' => StudentSemesters::with('student', 'year')->find($semester->id),
    ]);
  }
  public function updateYearSemesterAction(Request $request, Department $department, YearsCourses $year, StudentSemesters $semester) {
    $request->validate([
      'grade' => 'required|lte:' . $year->grade,
      'started' => 'required|date',
    ]);
    StudentSemesters::where('student', $semester->student)->where('year', $semester->year)->update([
      'grade' => $request->input('grade'),
      'information' => $request->input('information') ?? 'N/A',
      'started' => $request->input('started'),
      'ended' => $request->input('ended'),
      'is_done' => $request->input('is_done'),
    ]);
    message("Semester has been updated successfully!");
    return to_route('professors.deps.year.semesters', [$department->id, $year->id]);
  }

  // View2 semester
  public function viewSemester(Department $department, YearsCourses $year, StudentSemesters $semester) {
    return inertia('Professor/Departments/ViewSemester/ViewSemester', [
      'year' => YearsCourses::with(['semesters' => fn($q) => $q->with('student'), 'department'])->find($year->id),
      'semester' => StudentSemesters::with([
        'student',
        'year',
        'grades' => fn($q) => $q->with(['subject' => fn($q) => $q->with('grades')])
      ])->find($semester->id),
    ]);
  }

  // Year Students
  public function yearStudentsView(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/YearStudents/YearStudents', [
      'semesters' => StudentSemesters::with([
        'student' => fn($q) => $q->with('department'),
        'year' => fn($q) => $q->with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')->with('grades')])])
      ])->where('year', $year->id)->get(),
      'year' => YearsCourses::with([
        'courses' => fn($q) => $q->with([
          'subject' => fn($q) => $q->withCount('chapters')->with('grades')
        ])
      ])->find($year->id),
      'students' => '',
      'department' => Department::withCount('students')->find($department->id),
      'can_promote' => DB::table('year_courses')
        ->where('id', $year->next_year)
        ->whereMonth('start', Carbon::today()->month)
        ->whereDay('start', Carbon::today()->day)
        ->whereYear('start', Carbon::today()->year)
        ->exists()
    ]);
  }

  // Year Grades
  public function yearGrades(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/YearGrades/YearGrades', [
      'year' => YearsCourses::with([
        'department',
        'courses',
        'grades' => fn($q) => $q->with(['course', 'subject' => fn($q) => $q->with('grades'), 'student']),
        'semesters' => fn($q) => $q->with('student', 'courses', 'grades'),
        'students' => fn($q) => $q->where('year', $year->id)->get(),
      ])->find($year->id),

    ]);
  }

  // Promote Students
  public function promoteStudentsView(Department $department, YearsCourses $year) {

    $nextYear = YearsCourses::with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')->with('grades')])])->find($year->next_year);

    $date = Carbon::now();
    $nextYearDate = [
      'day' => $date->format('d'),
      'month' => $date->format('m'),
      'year' => $date->format('Y')
    ];

    return inertia('Professor/Departments/Promote/PromoteStudents', [
      'semesters' => StudentSemesters::with([
        'student' => fn($q) => $q->with('department'),
        'year' => fn($q) => $q->with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')->with('grades')])])
      ])->where('year', $year->id)->get(),
      'year' => YearsCourses::with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')->with('grades')])])->find($year->id),
      'students' => '',
      'succeeded_students' => StudentSemesters::where('year', $year->id)
        ->where('grade', '>=', $year->grade / 2)
        ->where('is_done', 0)
        ->orderBy('grade', 'desc')
        ->with(['student' => fn($q) => $q->with('department')])
        ->get(),
      'failed_students' => StudentSemesters::where('year', $year->id)
        ->where('grade', '<', $year->grade / 2)
        ->where('is_done', 0)
        ->with(['student' => fn($q) => $q->with('department')])
        ->get(),
      'highest_student' => StudentSemesters::where('year', $year->id)->where('is_done', 0)->orderBy('grade', 'desc')->with('student')->get()->first(),
      'next_year' => YearsCourses::with(['courses' => fn($q) => $q->with(['subject' => fn($q) => $q->withCount('chapters')->with('grades')])])->find($year->next_year),
      'department' => Department::withCount('students')->find($department->id),
      'can_promote' => DB::table('year_courses')
        ->where('id', $nextYear->id)
        ->whereMonth('start', $nextYearDate['month'])
        ->whereDay('start', $nextYearDate['day'])
        ->whereYear('start', $nextYearDate['year'])
        ->exists()
    ]);
  }
  public function promoteStudentsAction(Request $request, Department $department, YearsCourses $year) {
    $nextYear          = YearsCourses::find($year->next_year);
    if ($nextYear) {
      $succeededStudents = StudentSemesters::where('year', $year->id)
        ->where('grade', '>=', $year->grade / 2)
        ->orderBy('grade', 'desc')
        ->with(['student' => fn($q) => $q->with('department')])
        ->get();
      foreach ($succeededStudents as $student) {
        $findSemester = StudentSemesters::where('year', $nextYear->id)
          ->where('student', $student->student)
          ->exists();
        if (!$findSemester) {
          StudentSemesters::create([
            'student' => $student->student,
            'year' => $nextYear->id,
            'grade' => 0,
            'default_grade' => $nextYear->grade,
            'title' => 'N/A',
            'is_done' => 0,
            'started' => Carbon::now(),
            'ended' => null,
            'information' => 'N/A',
          ]);
          StudentSemesters::where('id', $student->id)
            ->where('student', $student->student)
            ->update([
              'is_done' => 1
            ]);
          Student::promote($student->student, $nextYear->id);
          message("Students have been promoted to semester {$nextYear->title}", "success");
          notify(
            title: "Congratulations, You have been promoted to next semester! Prepare to next studying semester!",
            message: "You have been promoted to semester: <b>{$nextYear->title}</b>. Starting semester at {$nextYear->started}",
            student: $student->student
          );
        } else {
          message('Cannot promote!', "error");
        }
      }
      return to_route('professors.deps.year.students', [$department->id, $nextYear->id]);

    } else {
      abort(404);
    }
  }

  // Year Content ( Studying Subject )
  public function yearContent(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/YearContent/YearContent', [
      'year' => YearsCourses::with([
        'courses' => fn($q) => $q->orderBy('created_at', 'desc')->with(['subject' => fn($q) => $q->with(['chapters' => fn($q) => $q->orderBy('number'), 'grades'])]),
        'department'
      ])->find($year->id)
    ]);
  }

  // Add Year for department
  public function addYearView(Department $department) {
    return inertia('Professor/Departments/AddYear/AddYear', [
      'department' => $department,
      'years' => YearsCourses::with('department')->get()
    ]);
  }
  public function addYearAction(Request $request, Department $department) {
    $request->validate([
      'title' => 'required|min:10|max:255',
      'next_year' => 'required|integer|exists:year_courses,id',
      'term_name' => 'required',
      'start' => 'required|date',
      'end' => 'required|date|after:start',
      'grade' => 'required|integer|gt:0',
      'information' => 'required|min:100|max:1500',
    ]);

    if (!in_array($request->input('term_name'), ['First Term', 'Second Term'])) {
      message("Unable to understand the term name!");
      return to_route('professors.deps.year.add', $department->id);
    }

    $is_exists = YearsCourses::where('department', $department->id)
      ->where('title', $request->input('title'))
      ->where('term_name', $request->input('term_name'))
      ->exists();

    if (!$is_exists) {
      $createdSemester = YearsCourses::add(
        title:        $request->input('title'),
        department:   $department->id,
        next_year:    $request->input('next_year'),
        term_name:    $request->input('term_name'),
        start:        $request->input('start'),
        end:          $request->input('end'),
        grade:        $request->input('grade'),
        information:  $request->input('information'),
      );
      message("Semester for department {$department->title} has been added successfully!", "success");
      return to_route('professors.deps.years', $department->id);
    } else {
      message("Semester for department {$department->title} has already been added before!", "warning");
    }

  }

  // Update Year for department
  public function updateYearView(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/UpdateYear/UpdateYear', [
      'department' => $department,
      'years' => YearsCourses::with('department')->get(),
      'year' => $year,
    ]);
  }
  public function updateYearAction(Request $request, Department $department, YearsCourses $year) {
    $request->validate([
      'title' => 'required|min:10|max:255',
      'next_year' => 'required|integer|exists:year_courses,id',
      'term_name' => 'required',
      'start' => 'required|date',
      'end' => 'required|date|after:start',
      'grade' => 'required|integer|gt:0',
      'information' => 'required|min:100|max:1500',
    ]);


    YearsCourses::updateYear(
      year:         $year->id,
      title:        $request->input('title'),
      department:   $department->id,
      next_year:    $request->input('next_year'),
      term_name:    $request->input('term_name'),
      start:        $request->input('start'),
      end:          $request->input('end'),
      grade:        $request->input('grade'),
      information:  $request->input('information'),
    );
    message("Semester for department {$department->title} has been updated successfully!", "success");
    return to_route('professors.deps.years', $department->id);
  }

  // Delete Year for department
  public function deleteYearView(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/DeleteYear/DeleteYear', [
      'department' => $department,
      'years' => YearsCourses::with('department')->get(),
      'year' => $year,
    ]);
  }
  public function deleteYearAction(Request $request, Department $department, YearsCourses $year) {
    $year->delete();
    message("Semester has been earsed with all its related data!", "error");
    return to_route('professors.deps.years', $department->id);
  }

  // Create course for semester
  public function createCourseView(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/CreateCourse/CreateCourse', [
      'year' => YearsCourses::with([
        'courses' => fn($q) => $q->with([
          'subject' => fn($q) => $q->with([
            'chapters' => fn($q) => $q->orderBy('number'),
            'grades'])
        ]),
        'department'
      ])->find($year->id),
      'subjects' => Subjects::all()
    ]);
  }
  public function createCourseAction(Request $request, Department $department, YearsCourses $year) {
    $request->validate([
      'title' => 'required|min:4|max:255',
      'info' => 'required|min:100|max:1500',
      'subject' => 'required|exists:subjects,id'
    ]);

    $findCourse = Courses::where('year', $year->id)
      ->where('subject', $request->input('subject'))
      ->exists();

    if (!$findCourse) {
      Courses::createCourse(
        title: $request->input('title'),
        info: $request->input('info'),
        subject: $request->input('subject'),
        year: $year->id
      );
      message("Course has been added to semester {$year->title} successfully!", "success");
      return to_route('professors.deps.year.content', [$department->id, $year->id]);
    }
    message("Cannot create course because it's already added before!", "error");
  }

  // Update course for semesetr
  public function updateCourseView(Department $department, YearsCourses $year, Courses $course) {
    if ($course->year == $year->id && $year->department == $department->id) {
      return inertia('Professor/Departments/UpdateCourse/UpdateCourse', [
        'year' => YearsCourses::with([
          'courses' => fn($q) => $q->with([
            'subject' => fn($q) => $q->with([
              'chapters' => fn($q) => $q->orderBy('number'),
              'grades'])
          ]),
          'department'
        ])->find($year->id),
        'subjects' => Subjects::all(),
        'course' => $course
      ]);
    }
    abort(404);
  }
  public function updateCourseAction(Request $request, Department $department, YearsCourses $year, Courses $course) {
    $request->validate([
      'title' => 'required|min:4|max:255',
      'info' => 'required|min:100|max:1500',
      'subject' => 'required|exists:subjects,id'
    ]);

    Courses::updateCourse(
      courseID: $course->id,
      title: $request->input('title'),
      info: $request->input('info'),
      subject: $request->input('subject'),
      year: $year->id
    );
    message("Course has been updated successfully!", "success");
    return to_route('professors.deps.year.content', [$department->id, $year->id]);
  }

  // Delete course for semesetr
  public function deleteCourseView(Department $department, YearsCourses $year, Courses $course) {
    if ($course->year == $year->id && $year->department == $department->id) {
      return inertia('Professor/Departments/DeleteCourse/DeleteCourse', [
        'year' => YearsCourses::with([
          'courses' => fn($q) => $q->with([
            'subject' => fn($q) => $q->with([
              'chapters' => fn($q) => $q->orderBy('number'),
              'grades'])
          ]),
          'department'
        ])->find($year->id),
        'course' => $course
      ]);
    }
    abort(404);
  }
  public function deleteCourseAction(Request $request, Department $department, YearsCourses $year, Courses $course) {
    if ($course->year == $year->id && $year->department == $department->id) {
      $course->delete();
      message("Course has been deleted with all its videos successfully!", "error");
      return to_route('professors.deps.year.content', [$department->id, $year->id]);
    }
    abort(404);
  }

  // Add Students with CSV
  public function addStudentsView(Department $department, YearsCourses $year) {
    if ($year->department == $department->id) {
      return inertia('Professor/Departments/AddStudents/AddStudentsCSV', [
        'year' => YearsCourses::with('department')->find($year->id),
      ]);
    }
    abort(404);
  }
  public function addStudentsAction(Request $request, Department $department, YearsCourses $year) {
    $validation = $request->validate([
      'file' => 'required|file|mimes:csv',
      'file.*' => 'required|file|mimes:csv',
    ]);

    $file = $request->file('file');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $uploadFile = $file->move(STUDENTS_CSV_TARGET, $fileName);

    $csvFile = STUDENTS_CSV_TARGET . $fileName;

    $openCSV = public_path($csvFile);
    $csvHeaders = getCSVHeader($openCSV);
    $studentsCSVData = csvToArray($csvFile);

    $errors = [];

    if (array_equal($csvHeaders, Student::$csvHeaders)) {

      foreach ($studentsCSVData as $student) {
        // Username exists:
        $isUsernameExists = Student::where('username', $student['username'])->exists();
        if ($isUsernameExists) {
          $errors['username'][] = $student['username'];
        }
        // Email exists:
        $isEmailExists = Student::where('email', $student['email'])->exists();
        if ($isEmailExists) {
          $errors['email'][] = $student['email'];
        }
        // National exists:
        $isNationalExists = Student::where('national_id', $student['national_id'])->exists();
        if ($isNationalExists) {
          $errors['national_id'][] = $student['national_id'];
        }
        // University View exists:
        $isUniCodeExists = Student::where('university_code', $student['university_code'])->exists();
        if ($isUniCodeExists) {
          $errors['university_code'][] = $student['university_code'];
        }
        // University Email exists:
        $isUniEmailExists = Student::where('university_email', $student['university_email'])->exists();
        if ($isUniEmailExists) {
          $errors['university_email'][] = $student['university_email'];
        }

      }

      if (empty($errors)) {
        foreach ($studentsCSVData as $student) {
          $createdStudent = Student::createStudent(
            username: $student['username'],
            email: $student['email'],
            name: $student['name'],
            arabic_name: $student['arabic_name'],
            national_id: $student['national_id'],
            password: $student['password'],
            phone: $student['phone'],
            address: $student['address'],
            university_code: $student['university_code'],
            university_email: $student['university_email'],
            department: $student['department'],
            year: $student['year']
          );
          StudentSemesters::createSemester(
            student: $createdStudent->id,
            year: $student['year'],
            information: $year->information,
            title: $year->title,
            grade: 0,
            is_done: 0,
            stared: Carbon::now(),
            ended: null,
            default_grade: $year->grade,
          );
        }
        message("Students has been added to {$year->title} of department {$department->title}");
        return to_route('professors.deps.year.students', [$department->id, $year->id]);
      }

    } else {
      $cols = '';
      foreach ($csvHeaders as $header) {
        $errors['colsErrors'][] = $header;
      }
    }
    session()->flash('customErrors', $errors);
    return to_route('professors.deps.year.students.add', [$department->id, $year->id]);
  }

  // Add student manually
  public function addStudentManualView(Department $department) {
    return inertia('Professor/Departments/AddStudents/AddStudentManual', [
      'department' => Department::with('students', 'years')->find($department->id),
    ]);
  }
  public function addStudentManualAction(Request $request, Department $department) {
    $year = YearsCourses::find($request->input('year'));
    $request->validate([
      'student' => 'required|integer|exists:students,id',
      'year' => 'required|integer|exists:year_courses,id',
      'grade' => 'required|integer|lte:' . $year->grade,
    ]);
    $findSemester = StudentSemesters::where('id', $year->id)->where('student', $request->input('student'))->exists();
    if (!$findSemester) {
      StudentSemesters::createSemester(
        year: $year->id,
        student: $request->input('student'),
        is_done: $request->input('is_done'),
        default_grade: $year->grade,
        grade: $request->input('grade'),
        information: $year->information,
      );
      message("Student semester has been created successfully!");
      return to_route('professors.deps.year.grades', [$department->id, $year->id]);
    }
    message('Student Semester already exists!', 'warning');
  }

  // Add Students Grades
  public function addGradesCSVView(Department $department, YearsCourses $year) {
    if ($department->id == $year->department) {
      return inertia('Professor/Departments/StudentGrades/AddGradesCSV', [
        'year' => YearsCourses::with([
          'department',
          'courses' => fn($q) => $q->with(['subject' => fn($q) => $q->with('grades')])
        ])->find($year->id)
      ]);
    }
    abort(404);
  }
  public function addGradesCSVAction(Request $request, Department $department, YearsCourses $year) {


    $errors = [];

    $request->validate([
      'file.*' => 'required|mimes:csv',
    ]);

    $file = $request->file('file');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $uploadFile = $file->move(STUDENTS_CSV_TARGET, $fileName);

    $csvFile = STUDENTS_CSV_TARGET . $fileName;

    $openCSV = public_path($csvFile);
    $csvHeaders = getCSVHeader($openCSV);
    $studentsCSVData = csvToArray($csvFile);

    foreach ($studentsCSVData as $student) {

      $studentArray = Student::find($student['student_id']);
      $isCourseGradeExists = CourseGrade::where('course', $student['course_id'])
        ->where('student', $student['student_id'])
        ->where('year', $year->id)
        ->where('subject', $student['subject_id'])
        ->exists();

      if ($isCourseGradeExists) {
        $errors['gradeExists'][] = $studentArray->username;
      }

      if ($studentArray->department != $department->id) {
        $errors['notSameDepartment'][] = $studentArray->username;
      }

      $findStudentYear = StudentSemesters::where('year', $year->id)
        ->where('student', $studentArray->year)
        ->exists();

      if ($findStudentYear) {
        $errors['notSameYear'][] = $studentArray->username;
      }
    }


    if (empty($errors)) {
      foreach ($studentsCSVData as $student) {

        $findSemester = StudentSemesters::where('year', $year->id)
          ->where('student', $student['student_id'])
          ->get()->first();
        $totalGradesResults = $student['total'];

        if ($findSemester) {
          StudentSemesters::where('student', $student['student_id'])
            ->where('year', $year->id)
            ->update([
              'grade' => $findSemester->grade + $totalGradesResults
            ]);
          CourseGrade::create([
            'student' => $student['student_id'],
            'year' => $year->id,
            'semester' => $findSemester->id,
            'course' => $student['course_id'],
            'subject' => $student['subject_id'],
            'oral' => $student['oral'],
            'midterm' => $student['midterm'],
            'final' => $student['final'],
            'assignments' => $student['assignments'],
            'lab' => $student['lab'],
            'smart' => $student['smart'],
            'total' => $student['total'],
            'quizzes' => $student['quizzes']
          ]);
        }

        notify(
          title: "Semester {$year->title} grades has been added",
          message: "Your grades for semester {$year->title} has been added!",
          student: $student['student_id']
        );
        $countCSVDATA = count($studentsCSVData);
        message("Grades has been added for {$countCSVDATA} students - for semester {$year->title} successfully!");
      }
      return to_route('professors.deps.year.students', [$department->id, $year->id]);
    }
    session()->flash('customErrors', $errors);
  }

  // Update Student Grades
  public function updateGradesCSVView(Department $department, YearsCourses $year) {
    if ($department->id == $year->department) {
      return inertia('Professor/Departments/StudentGrades/UpdateStudentGradesCSV', [
        'year' => YearsCourses::with([
          'department',
          'courses' => fn($q) => $q->with(['subject' => fn($q) => $q->with('grades')])
        ])->find($year->id)
      ]);
    }
    abort(404);
  }
  public function updateGradesCSVAction(Request $request, Department $department, YearsCourses $year) {

    $errors = [];

    $request->validate([
      'file.*' => 'required|mimes:csv',
    ]);


    $file = $request->file('file');
    $fileName = generateFileName() . $file->getClientOriginalExtension();
    $uploadFile = $file->move(STUDENTS_CSV_TARGET, $fileName);

    $csvFile = STUDENTS_CSV_TARGET . $fileName;

    $openCSV = public_path($csvFile);
    $studentsCSVData = csvToArray($csvFile);

    foreach ($studentsCSVData as $student) {

      $studentArray = Student::find($student['student_id']);
      $isCourseGradeExists = CourseGrade::where('id', $student['grade_id'])
        ->exists();

      if ($studentArray->department != $department->id) {
        $errors['notSameDepartment'][] = $studentArray->username;
      }

      $findStudentYear = StudentSemesters::where('year', $year->id)
        ->where('student', $studentArray->year)
        ->exists();

      if ($findStudentYear) {
        $errors['notSameYear'][] = $studentArray->username;
      }

      if (!$isCourseGradeExists) {
        $errors['gradeNotExists'][] = $studentArray->username;
      }

    }

    if (empty($errors)) {
      foreach ($studentsCSVData as $student) {

        $findSemester = StudentSemesters::where('year', $year->id)
          ->where('student', $student['student_id'])
          ->get()->first();
        $totalGradesResults = $student['total'];

        if ($findSemester) {
          StudentSemesters::where('student', $student['student_id'])
            ->where('year', $year->id)
            ->update([
              'grade' => $findSemester->grade + $totalGradesResults
            ]);
          CourseGrade::where('id', $student['grade_id'])->update([
            'total' => $student['total'],
            'oral' => $student['oral'],
            'midterm' => $student['midterm'],
            'final' => $student['final'],
            'assignments' => $student['assignments'],
            'lab' => $student['lab'],
            'smart' => $student['smart'],
            'quizzes' => $student['quizzes']
          ]);
        } else {
          $errors['noGrades'][] = "There's no course grade for this student: " . $student['student_id'] . ' Grade ID: ' . $student['grade_id'];
        }

        notify(
          title: "Semester {$year->title} grades - updated!",
          student: $student['student_id'],
          message: "Your grades for semester {$year->title} has been updated!"
        );
        $countCSVDATA = count($studentsCSVData);
        message("Grades has been updated for {$countCSVDATA} students - for semester {$year->title} successfully!");
      }
      return to_route('professors.deps.year.grades', [$department->id, $year->id]);
    }
    session()->flash('customErrors', $errors);
  }

  // Update {student} grade of {course}
  public function updateStudentGradeManuallyView(Department $department, YearsCourses $year, Student $student, CourseGrade $grade) {
    if ($student->id == $grade->student && $grade->year == $year->id) {
      return inertia('Professor/Departments/UpdateGrade/UpdateStudentGrade', [
        'student' => $student,
        'semester' => StudentSemesters::where('student', $student->id)->where('year', $year->id)->get()->first(),
        'department' => $department,
        'year' => $year,
        'grade' => CourseGrade::with(['course' => fn($q) => $q->with(['subject' => fn($q) => $q->with('chapters', 'grades')])])->find($grade->id)
      ]);
    } else {
      abort(404);
    }
  }
  public function updateStudentGradeManuallyAction(Request $request, Department $department, YearsCourses $year, Student $student, CourseGrade $grade) {
    $subjectGrades = SubjectGrades::where('subject', $grade->subject)->get()->first();
    if ($subjectGrades) {
      $request->validate([
        'final' => 'required|numeric|lte:' . $subjectGrades->final,
        'lab' => 'required|numeric|lte:' . $subjectGrades->lab,
        'smart' => 'required|numeric|lte:' . $subjectGrades->smart,
        'midterm' => 'required|numeric|lte:' . $subjectGrades->midterm,
        'quizzes' => 'required|numeric|lte:' . $subjectGrades->quizzes,
        'assignments' => 'required|numeric|lte:' . $subjectGrades->assignments,
        'oral' => 'required|numeric|lte:' . $subjectGrades->oral,
      ]);
      $marks = [
        'final' => $request->input('final'),
        'lab' => $request->input('lab'),
        'smart' => $request->input('smart'),
        'midterm' => $request->input('midterm'),
        'quizzes' => $request->input('quizzes'),
        'assignments' => $request->input('assignments'),
        'oral' => $request->input('oral'),
      ];
      $totalMarks = 0;

      foreach ($marks as $mark => $value) {
        $totalMarks += $value;
      }
      CourseGrade::where('student', $student->id)
      ->where('year', $year->id)
      ->where('id', $grade->id)
      ->where('semester', $grade->semester)
      ->update([
        'total' => $totalMarks,
        'final' => $marks['final'],
        'lab' => $marks['lab'],
        'smart' => $marks['smart'],
        'midterm' => $marks['midterm'],
        'quizzes' => $marks['quizzes'],
        'assignments' => $marks['assignments'],
        'oral' => $marks['oral'],
      ]);
      $sumAllGrades = CourseGrade::where('student', $student->id)
        ->where('year', $year->id)
        ->where('id', $grade->id)
        ->where('semester', $grade->semester)
        ->sum('total');
      StudentSemesters::where('student', $student->id)
      ->where('year', $year->id)
      ->update([
        'grade' => $sumAllGrades,
      ]);
      message('Course grade has been updated successfully!');
    } else {
      message('Subject does not have default grades please set it!');
    }
  }

  // Add Year announcement
  public function addAnnView(Department $department, YearsCourses $year) {
    return inertia('Professor/Departments/Announcements/Add', [
      'year' => $year,
    ]);
  }
  public function addAnnAction(Request $request, Department $department, YearsCourses $year) {
    $request->validate([
      'title' => 'required|min:10|max:255',
      'description' => 'required|min:100|max:1500'
    ]);

    Announcement::create([
      'title' => $request->input('title'),
      'description' => $request->input('description'),
      'professor' => professor()->getAuthIdentifier(),
      'year' => $year->id,
    ]);

    message('New announcement has been sent to ' . $year->title);
    return to_route('professors.ann.year.view', $year->id);
  }

}


