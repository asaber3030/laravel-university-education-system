export const APP_URL = 'http://127.0.0.1:8000/'
export const APP_NAME = 'INote'
export const MONTHS_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTHS_NAMES_IN_ARABIC = [
  "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
]
export const DAYS_NAMES_IN_ARABIC = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"]

export const STUDENTS_IMPORT_EXCEL_SHEET = [
  { column: 'username', type: 'string', max: 255 },
  { column: 'name', type: 'string', max: 255 },
  { column: 'arabic_name', type: 'string', max: 255 },
  { column: 'email', type: 'string(email)', max: 255, },
  { column: 'national_id', type: 'number', max: 14 },
  { column: 'password', type: 'string', max: 255 },
  { column: 'phone', type: 'number', max: 11 },
  { column: 'address', type: 'string', max: 255 },
  { column: 'department', type: 'number(departments_IDs)', max: 11 },
  { column: 'year', type: 'number(studying_years)', max: 11 },
  { column: 'university_code', type: 'number', max: 14 },
  { column: 'university_email', type: 'string(email)', max: 255 },
];

export const STUDENT_GRADE_EXCEL_SHEET = [
  'student_id - number(students)',
  'total - number(6)',
  'oral - number(6)',
  'final - number(6)',
  'assignments - number(6)',
  'quizzes - number(6)',
  'lab - number(6)',
  'smart - number(6)',
  'midterm - number(6)',
  'course_id - courses_ids(11)',
  'subject_id - subjects_ids(11)',
]
export const STUDENT_GRADE_EXCEL_SHEET_UPDATE_VER = [
  'student_id - number(students)',
  'grade_id - number(course_grade)',
  'total - number(6)',
  'oral - number(6)',
  'final - number(6)',
  'assignments - number(6)',
  'quizzes - number(6)',
  'lab - number(6)',
  'smart - number(6)',
  'midterm - number(6)',
]

export const QUIZ_STATUS_OBJECT = {
  0: "Disabled",
  1: "Results available",
  2: "Open Quiz"
}
export const QUIZ_STATUS_ARRAY = [
  { value: 0, text: 'Disable from students' },
  { value: 1, text: 'Allow students to see quiz now? but it\'s not opened!' },
  { value: 2, text: 'Open Quiz' },
]

export const MAIL_IMPORTANCE = {
  0: 'Normal',
  1: 'Urgent',
  2: 'Important',
  3: 'Warning',
  4: 'Danger Action'
}

export const THEMES = [
  { themeName: 'Light', themeCode: 'light' },
  { themeName: 'Dark', themeCode: 'dark' }
]

export const LANUGAGES = [
  { langName: 'Arabic', langCode: 'arabic' },
  { langName: 'English', langCode: 'english' }
]

export const ACTIVE_SETTING_PAGE = {
  app: 'app',
  departments: 'departments',
  professors: 'professors',
  assistants: 'assistants',
  'student_settings': 'student_settings',
  'default_password': 'default_password',
  'updating_personal_information': 'updating_personal_information',
  'resetting_password': 'resetting_password',
  'login_status': 'login_status',
  'summary': 'summary',
}

export const APP_MODES = {
  running: 'run',
  main: 'main',
  stopped: 'stop',
  holiday: 'holiday',
  grades: 'grades',
}

export const STUDENTS_SETTINGS_CODES = {
  'language': 'default_lang',
  'theme': 'default_theme',
  'reset_password': 'can_reset_password',
  'upload_summary': 'students_can_upload_content',
  'personal_information': 'student_can_update_information',
  'login_status': 'students_can_login',
  'change_username': 'change_username'
}

export const  fullDateOptions = {
  year: 'numeric',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
}
export const timeOptions = {
  hour: '2-digit',
  minute: '2-digit'
}

export const eventsTypes = [
  { value: 'Section', text: 'Section' },
  { value: 'Lecture', text: 'Lecture' },
  { value: 'Lab', text: 'Lab' },
  { value: 'Quiz', text: 'Quiz' },
  { value: 'Exam', text: 'Exam' },
]

export const Professors_Types = {
  0: 'Professor / Dr',
  1: 'Teaching Assistant'
}
