<?php

namespace App\Http\Controllers\Professor;

use App\Http\Controllers\Controller;
use App\Mail\MailStudents;
use App\Models\CourseGrade;
use App\Models\Courses;
use App\Models\Department;
use App\Models\QuizStudentGrade;
use App\Models\Quizzes;
use App\Models\SentMails;
use App\Models\Student;
use App\Models\StudentBadges;
use App\Models\StudentSemesters;
use App\Models\YearsCourses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class StudentController extends Controller {

  public function students(Department $department = null, YearsCourses $year = null) {

    $stds = Student::with('department')->orderBy('id', 'desc')->get();
    if ($department && $year) {
      $stds = Student::where('year', $year->id)->where('department', $department->id)->with('department')->orderBy('id', 'desc')->get();
    } elseif ($department) {
      $stds = Student::where('department', $department->id)->with('department')->orderBy('id', 'desc')->get();
    }

    return inertia('Professor/Students/Main/ListStudents', [
      'students' => $stds,
      'years' => YearsCourses::all(),
      'departments' => Department::all(),
      'yearID' => $year->id ?? null,
      'depID' => $department->id ?? null,
    ]);
  }

  // Import Students
  public function importStudentsView() {
    return inertia('Professor/Students/Import/ImportStudents');
  }
  public function importStudentsAction(Request $request) {
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

    foreach ($studentsCSVData as $student) {
      $usernameErr = Student::where('username', $student['username'])->exists();
      if ($usernameErr) $errors['username'][] = $student['username'];

      $emailErr = Student::where('email', $student['email'])->exists();
      if ($emailErr) $errors['email'][] = $student['username'];

      $phoneErr = Student::where('phone', $student['phone'])->exists();
      if ($phoneErr) $errors['phone'][] = $student['username'];

      $universityEmailErr = Student::where('university_email', $student['university_email'])->exists();
      if ($universityEmailErr) $errors['university_email'][] = $student['username'];

      $universityCodeErr = Student::where('university_code', $student['university_code'])->exists();
      if ($universityCodeErr) $errors['university_code'][] = $student['username'];

      $nationalErr = Student::where('national_id', $student['national_id'])->exists();
      if ($nationalErr) $errors['national_id'][] = $student['username'];
    }

    if (empty($errors)) {
      foreach ($studentsCSVData as $student) {
        Student::create([
          'username' => $student['username'],
          'name' => $student['name'],
          'arabic_name' => $student['arabic_name'],
          'email' => $student['email'],
          'national_id' => $student['national_id'],
          'password' => $student['password'],
          'phone' => $student['phone'],
          'address' => $student['address'],
          'department' => $student['department'],
          'year' => $student['year'],
          'university_code' => $student['university_code'],
          'university_email' => $student['university_email'],
        ]);
      }

      message('Students has been created successfully!');
      return to_route('professors.students.list');
    }
    session()->flash('customErrors', $errors);
  }

  // Create Student
  public function createView() {
    return inertia('Professor/Students/Add/CreateStudent', [
      'students' => Student::with('department')->where('department', professor()->department)->orderBy('id', 'desc')->get(),
      'departments' => Department::all(),
      'years' => YearsCourses::all()
    ]);
  }
  public function createAction(Request $request) {

    if ($request->input('addSemester')) {
      $request->validate([
        'username' => 'required|unique:students|min:3|max:100',
        'email' => 'required|unique:students|email|max:255',
        'name' => 'required|max:255',
        'arabic_name' => 'required|max:255',
        'national_id' => 'required|unique:students|numeric|digits:14',
        'password' => 'required',
        'phone' => 'required|unique:students|regex:' . PHONE_REGEX,
        'address' => 'required',
        'department' => 'required|numeric|exists:departments,id',
        'picture' => 'required|mimes:jpg,png,jpeg',
        'university_code' => 'required|unique:students|numeric|digits:14',
        'university_email' => 'required|unique:students|email',
        'grade' => 'required|integer|lte:750',
        'started' => 'required|date',
      ]);

      $file = $request->file('picture');
      $target = 'uploads/students/';
      $fileName = time() . '_' . $request->input('username') . '.' . $file->getClientOriginalExtension();
      $file->move($target, $fileName);

      $createdStudent = Student::create([
        'username' => $request->input('username'),
        'email' => $request->input('email'),
        'name' => $request->input('name'),
        'arabic_name' => $request->input('arabic_name'),
        'national_id' => $request->input('national_id'),
        'password' => Hash::make($request->input('password')),
        'phone' => $request->input('phone'),
        'address' => $request->input('address'),
        'department' => $request->input('department'),
        'picture' => $target . $fileName,
        'university_code' => $request->input('university_code'),
        'university_email' => $request->input('university_email'),
        'year' => $request->input('year'),
      ]);
      StudentSemesters::createSemester(
        student: $createdStudent->id,
        year: $createdStudent->year,
        information: $request->input('information'),
        title: $request->input('title'),
        default_grade: 1500,
        grade: $request->input('grade'),
        is_done: $request->input('is_done'),
        stared: $request->input('started'),
        ended: $request->input('ended')
      );
    } else {
      $request->validate([
        'username' => 'required|unique:students|min:3|max:100',
        'email' => 'required|unique:students|email|max:255',
        'name' => 'required|max:255',
        'arabic_name' => 'required|max:255',
        'national_id' => 'required|unique:students|numeric|digits:14',
        'password' => 'required',
        'phone' => 'required|unique:students|regex:' . PHONE_REGEX,
        'address' => 'required',
        'department' => 'required|numeric|exists:departments,id',
        'picture' => 'required|mimes:jpg,png,jpeg',
        'university_code' => 'required|unique:students|numeric|digits:14',
        'university_email' => 'required|unique:students|email'
      ]);

      $file = $request->file('picture');
      $target = 'uploads/students/';
      $fileName = time() . '_' . $request->input('username') . '.' . $file->getClientOriginalExtension();
      $file->move($target, $fileName);

      Student::create([
        'username' => $request->input('username'),
        'email' => $request->input('email'),
        'name' => $request->input('name'),
        'arabic_name' => $request->input('arabic_name'),
        'national_id' => $request->input('national_id'),
        'password' => Hash::make($request->input('password')),
        'phone' => $request->input('phone'),
        'address' => $request->input('address'),
        'department' => $request->input('department'),
        'picture' => $target . $fileName,
        'university_code' => $request->input('university_code'),
        'university_email' => $request->input('university_email'),
        'year' => $request->input('year'),
      ]);
    }

    message('Student has been created successfully!', 'success');
    return to_route('professors.students.list');
  }

  // Create Student
  public function updateView(Student $student) {
    return inertia('Professor/Students/Update/UpdateStudent', [
      'student' => Student::with('department')->find($student->id),
      'departments' => Department::all(),
      'years' => YearsCourses::all()
    ]);
  }
  public function updateAction(Request $request, Student $student) {
    $request->validate([
      'username' => 'required|min:3|max:100|unique:students,id,' . $student->id . ',id',
      'email' => 'required|email|max:255|unique:students,id,' . $student->id . ',id',
      'name' => 'required|max:255',
      'arabic_name' => 'required|max:255',
      'national_id' => 'required|numeric|digits:14|unique:students,id,' . $student->id . ',id',
      'university_code' => 'required|numeric|digits:14|unique:students,id,' . $student->id . ',id',
      'university_email' => 'required|email|unique:students,id,' . $student->id . ',id',
      'phone' => 'required|regex:' . PHONE_REGEX . '|unique:students,id,' . $student->id . ',id',
      'address' => 'required',
      'department' => 'required|numeric|exists:departments,id',
      'year' => 'required|numeric|exists:year_courses,id',
    ]);

    $fileName = $student->picture;

    if ($request->hasFile('picture')) {
      $file = $request->file('picture');
      $target = 'uploads/students/';
      $fileName = time() . '_' . $request->input('username') . '.' . $file->getClientOriginalExtension();
      $file->move($target, $fileName);
    }

    Student::where('id', $student->id)->update([
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'name' => $request->input('name'),
      'arabic_name' => $request->input('arabic_name'),
      'national_id' => $request->input('national_id'),
      'password' => $request->has('password') ? Hash::make($request->input('password')) : $student->password,
      'phone' => $request->input('phone'),
      'address' => $request->input('address'),
      'department' => $request->input('department'),
      'picture' => $request->hasFile('picture') ? $target . $fileName : $student->picture,
      'university_code' => $request->input('university_code'),
      'university_email' => $request->input('university_email'),
      'year' => $request->input('year'),
    ]);

    message('Student has been updated successfully!', 'success');
    return to_route('professors.students.view', $student->id);
  }

  // View Student
  public function viewStudent(Student $student) {
    return inertia('Professor/Students/View/ViewStudent', [
      'student' => Student::with([
        'department',
        'year',
        'badges' => fn($q) => $q->with('badge')->limit(4),
        'semesters' => fn($q) => $q->with(['year' => fn($q) => $q->with('courses')]),
      ])
        ->find($student->id),
      'semester' => StudentSemesters::with('year')->where('is_done', 0)->where('student', $student->id)->get()->first(),
      'courses' => StudentSemesters::with([
        'year' => fn($q) => $q->with(['courses' => fn($q) => $q->with('subject')]),
        ])->where('is_done', 0)->where('student', $student->id)->get()->first(),
      'totalGrades' => StudentSemesters::where('student', $student->id)->sum('grade')
    ]);
  }

  // View Student
  public function viewStudentQuizzes(Student $student) {
    return inertia('Professor/Students/Quizzes/ViewStudentQuizzes', [
      'student' => Student::with([
        'department',
        'year',
        'semesters' => fn($q) => $q->with('year')
      ])->find($student->id),
      'quizzes' => Quizzes::with([
        'subject',
        'answers' => fn($q) => $q->where('student', $student->id)
      ])->withCount('questions')->whereHas('answers', fn($q) => $q->where('student', $student->id))->get(),
    ]);
  }

  // Send Mail to student
  public function sendMailView(Student $student) {
    return inertia('Professor/Students/Mail/SendMail', [
      'student' => Student::with(['department', 'mails' => fn($q) => $q->where('professor', professor()->getAuthIdentifier())->orderBy('id', 'desc')->limit(11)])->find($student->id),
      'students' => Student::select('id', 'name', 'national_id', 'email')->orderBy('id', 'desc')->get()
    ]);
  }
  public function sendMailAction(Request $request, Student $student) {
    $request->validate([
      'content' => 'required',
      'email' => 'required|email',
      'subject'=> 'required|min:10'
    ]);
    $getStudent = Student::where('email', $request->input('email'))->get()->first();
    SentMails::create([
      'professor' => professor()->getAuthIdentifier(),
      'student' => $getStudent->id,
      'subject' => $request->input('subject'),
      'content' => $request->input('content'),
      'email' => $request->input('email'),
      'importance' => $request->input('importance')
    ]);

//    Mail::to($request->input('email'))
//      ->send(
//        new MailStudents(
//          $request->input('subject'),
//          professor()->email,
//          $request->input('content'),
//          [route('professors.students.list')]
//        ));
    message('E-mail was sent successfully!');
  }

  // Assign Semester
  public function assignSemesterView(Student $student) {
    $findCurrentSemester = StudentSemesters::where('student', $student->id)->where('year', $student->year)->where('is_done', 0)->exists();

    if ($findCurrentSemester) {
      abort(404);
    }
    return inertia('Professor/Students/AssignSemester/AssignSemester', [
      'student' => Student::with('year', 'department')->find($student->id),
      'courses' => Courses::with(['subject' => fn($q) => $q->withCount('chapters')])->where('year', $student->year)->get()
    ]);
  }
  public function assignSemesterAction(Request $request, Student $student) {
    $request->validate([
      'started' => 'required|date',
      'grade' => 'required|integer|lte:1500|gt:0',
    ]);
    StudentSemesters::createSemester(
      student: $student->id,
      year: $student->year,
      ended: $request->input('ended') ?? null,
      stared: $request->input('started'),
      grade: $request->input('grade'),
      default_grade: 1500,
      is_done: 0,
      information: $request->input('information') ?? null,
      title: $request->input('title') ?? null,
    );
    message("Current Semester for student {$student->username} has been assigned successfully!");
    return to_route('professors.students.view', $student->id);
  }

  // List student mails
  public function allStudentMails(Student $student, SentMails $mail = null) {
    return inertia('Professor/Students/Mail/ListMails', [
      'student' => Student::with(['department', 'mails' => fn($q) => $q->where('professor', professor()->getAuthIdentifier())->orderBy('id', 'desc')->get()])->find($student->id),
      'mail' => $mail != null ? $mail : null
    ]);
  }

  // Delete Mail
  public function deleteMailView(Student $student, SentMails $mail) {
    return inertia('Professor/Students/Mail/DeleteMail', [
      'student' => Student::with(['department', 'mails' => fn($q) => $q->where('professor', professor()->getAuthIdentifier())->orderBy('id', 'desc')->get()])->find($student->id),
      'mail' => $mail != null ? $mail : null
    ]);
  }
  public function deleteMailAction(Request $request, Student $student, SentMails $mail) {
    $mail->delete();
    message('E-mail has been deleted successfully!', 'error');
    return to_route('professors.students.mails', $student->id);
  }

  // Student Current Semester
  public function currentSemester(Student $student) {
    return inertia('Professor/Students/CurrentSemester/CurrentSemester', [
      'student' => Student::with([
        'department',
        'badges' => fn($q) => $q->with('badge')->limit(4),
        'semesters' => fn($q) => $q->with(['year' => fn($q) => $q->with('courses')]),
      ])
        ->find($student->id),
      'semester' => StudentSemesters::with([
        'year' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with('subject', fn($q) => $q->with('chapters', 'grades')), 'department']
        )])->where('is_done', 0)->where('student', $student->id)->get()->first(),
    ]);
  }

  // Student All Semesters
  public function allSemesters(Student $student) {
    return inertia('Professor/Students/Semesters/Semesters', [
      'student' => Student::with([
        'department',
        'badges' => fn($q) => $q->with('badge')->limit(4),
        'semesters' => fn($q) => $q->with([
          'year' => fn($q) => $q->with([
            'courses' => fn($q) => $q->with(
              [
                'subject' => fn($q) => $q->with('grades'),
                'student_grades' => fn($q) => $q->where('student', $student->id)
              ]
            )])
        ]),
      ])->find($student->id)
    ]);
  }

  // Update Semester
  public function updateSemesterView(Student $student, StudentSemesters $semester) {
    return inertia('Professor/Students/UpdateSemester/UpdateSemester', [
      'student' => Student::with('department', 'year')->find($student->id),
      'semester' => $semester,
      'courses' => Courses::with(['subject' => fn($q) => $q->withCount('chapters')])->where('year', $semester->year)->get(),
      'grades' => CourseGrade::with('subject')->where('year', $semester->year)->get()
    ]);
  }
  public function updateSemesterAction(Request $request, Student $student, StudentSemesters $semester) {
    $request->validate([
      'started' => 'required|date',
      'grade' => 'required|integer|lte:1500|gt:0',
    ]);
    StudentSemesters::where('student', $student->id)->where('id', $semester->id)->update([
      'ended' => $request->input('ended') ?? null,
      'started' => $request->input('started'),
      'grade' => $request->input('grade'),
      'default_grade' => 1500,
      'is_done' => 0,
      'information' => $request->input('information') ?? null,
      'title' => $request->input('title') ?? null,
    ]);
    message("Semester for student {$student->username} has been updated successfully!");
    return to_route('professors.students.semesters.view', [$student->id, $semester->id]);
  }

  // Semester Grades of {studentID}
  public function updateSemesterGradesView(Student $student, StudentSemesters $semester) {
    return inertia('Professor/Students/UpdateGrades/UpdateGrades', [
      'student' => Student::with('department', 'year')->find($student->id),
      'semester' => $semester,
      'grades' => CourseGrade::with('subject')->where('year', $student->year)->where('semester', $semester->id)->where('student', $student->id)->get()
    ]);
  }

  public function updateFinalGradeView(Student $student, StudentSemesters $semester, CourseGrade $grade) {
    return inertia('Professor/Students/UpdateGrades/Action', [
      'student' => Student::with('department', 'year')->find($student->id),
      'semester' => $semester,
      'grade' => CourseGrade::with('subject')->find($grade->id),
    ]);
  }
  public function updateFinalGradeAction(Request $request, Student $student, StudentSemesters $semester, CourseGrade $grade) {
    $request->validate([
      'final' => 'required|integer',
      'assignments' => 'required|integer',
      'quizzes' => 'required|integer',
      'midterm' => 'required|integer',
      'lab' => 'required|integer',
      'smart' => 'required|integer',
      'oral' => 'required|integer',
    ]);
    $marks = [
      'final' => $request->input('final'),
      'assignments' => $request->input('assignments'),
      'quizzes' => $request->input('quizzes'),
      'midterm' => $request->input('midterm'),
      'lab' => $request->input('lab'),
      'smart' => $request->input('smart'),
      'oral' => $request->input('oral'),
    ];

    $totalGrades = 0;
    foreach ($marks as $mark => $val) {
      $totalGrades += $val;
    }
    CourseGrade::where('id', $grade->id)->update([
      'total' => $totalGrades,
      'final' => $request->input('final'),
      'assignments' => $request->input('assignments'),
      'quizzes' => $request->input('quizzes'),
      'midterm' => $request->input('midterm'),
      'lab' => $request->input('lab'),
      'smart' => $request->input('smart'),
      'oral' => $request->input('oral'),
    ]);
    message("Course grade of student @{$student->username} has been updated successfully!");
    return to_route('professors.students.semesters.view', [$student->id, $semester->id]);
  }

  public function addSemesterGradesView(Student $student, StudentSemesters $semester) {
    return inertia('Professor/Students/AddSemesterGrade/AddSemesterGrade', [
      'student' => Student::with('department', 'year')->find($student->id),
      'semester' => $semester,
      'yearCourses' => Courses::with('subject')->where('year', $semester->year)->get(),
    ]);
  }
  public function addSemesterGradesAction(Request $request, Student $student, StudentSemesters $semester) {

    $request->validate([
      'final' => 'required|integer|gt:0',
      'course' => 'required|exists:courses,id',
    ]);

    $isCourseGradeExists = CourseGrade::where('student', $student->id)
      ->where('semester', $semester->id)
      ->where('year', $student->year)
      ->where('course', $request->input('course'))
      ->exists();

    if (!$isCourseGradeExists) {
      $marks = [
        'final' => $request->input('final'),
        'assignments' => $request->input('assignments'),
        'quizzes' => $request->input('quizzes'),
        'midterm' => $request->input('midterm'),
        'lab' => $request->input('lab'),
        'smart' => $request->input('smart'),
        'oral' => $request->input('oral'),
      ];
      $totalGrades = 0;
      foreach ($marks as $mark => $val) {
        $totalGrades += $val;
      }
      CourseGrade::create([
        'total' => $totalGrades,
        'final' => $request->input('final'),
        'assignments' => $request->input('assignments'),
        'quizzes' => $request->input('quizzes'),
        'midterm' => $request->input('midterm'),
        'lab' => $request->input('lab'),
        'smart' => $request->input('smart'),
        'oral' => $request->input('oral'),
        'course' => $request->input('course'),
        'student' => $student->id,
        'year' => $student->year,
        'semester' => $semester->id ,
        'subject' => Courses::find($request->input('course'))->subject
      ]);
      notify("New Course grade!", "Your grade has been added successfully!", $student->id);
      message('Course grade has been added!');
      return to_route('professors.students.semesters.view', [$student->id, $semester->id]);
    } else {
      message('Course grade already exists!', 'warning');
    }
  }


  // View2 Semester
  public function viewSemester(Student $student, StudentSemesters $semester) {

    $getSemester = StudentSemesters::where('student', $student->id)
      ->where('id', $semester->id)
      ->with([
        'year' => fn($q) => $q->with([
          'courses' => fn($q) => $q->with([
            'subject' => fn($q) => $q->with('grades', 'chapters'),
            'student_grades' => fn($q) => $q->where('student', $student->id)
          ])
        ])
      ])->get()->first();

    return inertia('Professor/Students/ViewSemester/ViewSemester', [
      'student' => Student::with('department')->find($student->id),
      'semester' => $getSemester
    ]);
  }

}
