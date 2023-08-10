import './view-student.scss'

import { useState } from "react"
import { usePage, Link, Head } from "@inertiajs/inertia-react"

import EngineerHelment from '../../../../assets/images/helmet.png'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook, faCheck,
  faCog,
  faEllipsis,
  faEllipsisVertical,
  faGraduationCap, faPlus, faTrash,
  faTrashRestore
} from "@fortawesome/free-solid-svg-icons"
import {faEye, faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";

import showStudentName from "@/helpers/functions/showStudentName";
import capitilize from "@/helpers/functions/capitilize";
import formatDate from "@/helpers/functions/format-date";

import { showStudentUsername, showStudentPhone, showStudentDepartment } from "@/helpers/functions/student";
import { Tooltip } from "@mui/material";


const ViewStudent = () => {

  const { student, semester, courses, totalGrades, appURL } = usePage().props
  console.log(courses)

  const [layoutHeaderDropdown, setLayoutDropdown] = useState(null)
  const openDropdown = Boolean(layoutHeaderDropdown)
  const handleOpenLayoutDropdown = (event) => {
    setLayoutDropdown(event.currentTarget)
  }
  const handleClose = () => {
    setLayoutDropdown(null)
  }

  return (
    <ProfessorLayout>

      <Head title={`View Student - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faGraduationCap} /> Student - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <StudentActionsDropdown student={student} />
        </div>
      </div>

      <div className="view-student-page">

        <div className="column first-column">
          <section className="default-section student-id-card">
            <div className="student-image">
              <img src={appURL + student.picture} alt="Student Picture" />
              <div className="text">
                <h6 className='truncate-300 text-sm' style={{ lineHeight: 1 }}>{student.name}</h6>
                <span>{student.department.title}</span>
              </div>
            </div>

            <div className="list-items">
              <ul>
                <li><span>National ID</span> <span>{student.national_id}</span></li>
                <li><span>University Code</span> <span>{student.university_code}</span></li>
                <li><span>University E-mail</span> <span>{student.university_email}</span></li>
              </ul>
            </div>
          </section>

          {semester && courses && student.semesters ? (
            <section className="default-section current-semester">
              <div className='center-title'>
                <FontAwesomeIcon icon={faCheck} />
                <span>Current Semester</span>
              </div>
              <div className="list-items">
                <ul>
                  <li><span>Year Title</span> <span className='truncate-250'>{semester.year.title}</span></li>
                  <li><span>Term</span> <span>{semester.year.term_name}</span></li>
                  <li><span>Started</span> <span>{formatDate(semester.started)}</span></li>
                </ul>
                <Link href={route('professors.students.current-semester', [student.id])} className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faEye} /> View Semester</Link>
              </div>
              <p>{semester.information}</p>
              <div className="links">
                <Link href={route('professors.students.semesters', student.id)}>Semesters</Link>
                <Link href={route('professors.deps.year.content', [student.department.id, student.year])}>Courses</Link>
                <Link href={route('professors.students.quizzes', student.id)}>Quizzes</Link>
                <Link href=''>Exams</Link>
              </div>
            </section>
          ) : (
            <div className="alert alert-sm alert-warning">This student doesn't have current semester. <Link className='alert-link' href={route('professors.students.semester.assign', [student.id])}>Assign</Link></div>
          )}

        </div>

        <div className="column second-column">
          <section className="default-section student-id-card">
            <div className="list-items">
              <ul>
                <li><span>Phone Number</span> <span>{showStudentPhone(student)}</span></li>
                <li><span>E-mail Address</span> <span>{student.email}</span></li>
                <li><span>Username</span> <span>{showStudentUsername(student)}</span></li>
                <li><span>Address</span> <span>{student.address}</span></li>
                <li><span>Department</span> <span>{showStudentDepartment(student)}</span></li>
                <li><span>Total Marks</span> <span className='text-success'>{`${totalGrades} marks`}</span></li>
                <li><span>Last Update</span> <span>{formatDate(student.updated_at)}</span></li>
                <li><span>Student Joined In</span> <span>{formatDate(student.created_at)}</span></li>
              </ul>
            </div>
          </section>
          {semester && courses && student.semesters && (
            <section className="default-section current-studying-subjects">
              <h6 className='center-title'>Current Studying Subjects</h6>
              <div className="list-items">
                <ul>
                  <li><span>Total Courses</span> <span><Link href={route('professors.deps.year.content', [student.department.id, semester.year.id])}>{courses.year.courses.length} course</Link></span></li>
                  <li><span>Department</span> <span>{student.department.title}</span></li>
                  <li><span>Semester</span> <span>{student.year.title + ' - ' + student.year.term_name}</span></li>
                  {semester && (
                    <li><span>Started</span> <span>{formatDate(semester.started)}</span></li>
                  )}
                </ul>
              </div>
              <div className="subjects">
                {courses.year.courses.map(course => (
                  <div className="subject">
                    <p><Link className='truncate-200' href={route('professors.subjects.chapters', course.subject.id)}>{course.subject.title} <span style={{ fontWeight: 600 }}>#{course.subject.code}</span></Link></p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="default-section listing-important-links">

            <div className="list-items">

              <h6 className="center-title">Links</h6>

              <ul>
                <li><span>Quizzes Grades</span> <Link>See</Link></li>
                <li><span>Exams Grades</span> <Link>See</Link></li>
                <li><span>Send Warning</span> <Link>Send</Link></li>
                <li><span>Send E-mail</span> <Link>Send</Link></li>
              </ul>

            </div>

          </section>

        </div>

        <div className="column third-column">
          {student.badges.length > 0 && (
            <section className="default-section earned-titles hover-effect">
              <h6 className='header-title'>Earned Badges</h6>
              <div className="badges">
                {student.badges.map(badge => (
                  <Tooltip key={Math.random()} title={badge.badge.title}>
                    <img src={appURL + badge.badge.icon} alt={badge.badge.title} />
                  </Tooltip>
                ))}
              </div>
            </section>
          )}

          {student.semesters ? (
            <section className="default-section years-grades">
              <img src={EngineerHelment} alt=""/>
              <h6 className='center-title'>Years Grades</h6>
              <div className="list-items">
                <ul>
                  {student.semesters.map(semester => (
                    <li>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span className='truncate-300' style={{ display: 'inline-block' }}>
                          <Link href={route('professors.students.semesters.view', [student.id, semester.id])}>{semester.year.title} - {semester.year.term_name}</Link>
                        </span>
                        <span className="text-success">({semester.grade} marks)</span>
                      </span>
                      <span>
                        <Link href={route('professors.deps.year.content', [semester.year.department, semester.year.id])}>{semester.year.courses.length} course</Link>
                      </span>
                    </li>
                  ))}
                </ul>
                {totalGrades > 0 ? (
                  <p>Total Marks Over Years: <span className='text-success'>{totalGrades} marks</span></p>
                ) : (
                  <p className="text-warning text-center">No Semesters!</p>
                )}
              </div>
            </section>
          ) : (
            <div className="alert alert-warning">
              This student doesn't have previous semesters!
            </div>
          )}

          <section className="default-section student-assignments">

            <div className="list-items">

              <div className="inner-section">
                <h6>Assignments <Link className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus} /> New</Link></h6>
                <ul>
                  <li><span>Total Assignments</span> <Link>15 assignment</Link></li>
                  <li><span>Total Earned Points</span> <span className='text-success'>150 point</span></li>
                  <li><span>Earned Marks</span> <span className='text-success'>26 mark</span></li>
                </ul>
              </div>

              <div className="inner-section">
                <h6>Mid-term Exams <Link className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPlus} /> Add Grades</Link></h6>
                <ul>
                  <li><span>Total Assignments</span> <Link>15 assignment</Link></li>
                  <li><span>Total Earned Points</span> <span className='text-success'>150 point</span></li>
                  <li><span>Earned Marks</span> <span className='text-success'>26 mark</span></li>
                </ul>
              </div>

            </div>

          </section>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ViewStudent
