import './current-semester.scss'

import { useState } from "react"
import { usePage, Link, Head } from "@inertiajs/inertia-react"

import EngineerHelment from '../../../../assets/images/helmet.png'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook, faCheck,
  faCog,
  faEllipsis,
  faEllipsisVertical,
  faGraduationCap, faPercentage, faPlus, faTrash,
  faTrashRestore
} from "@fortawesome/free-solid-svg-icons"
import {faEdit, faEye, faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";

import showStudentName from "@/helpers/functions/showStudentName";
import capitilize from "@/helpers/functions/capitilize";

import { showStudentUsername, showStudentPhone, showStudentDepartment, nationalID } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import {Tooltip} from "@mui/material";
import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";
import StudentCard from "@/components/StudentCard/StudentCard";
import Text from "@/components/TextSuccess/Text";

const CurrentSemester = () => {

  const { student, semester, appURL } = usePage().props

  console.log(semester)

  return (
    <ProfessorLayout>

      <Head title={`Current Semester - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faGraduationCap} /> Student Current Semester - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <StudentActionsDropdown student={student} />
        </div>
      </div>

      <div className="current-semester">

        <div className="first-column">
          <StudentCard student={student} />
          <div className="default-section">
            <h5 className='header-title'>Semester Information</h5>
            <div className="list-items">
              <ul>
                <li><span>Year</span> <span className='truncate-200'>{semester.year.title} subject</span></li>
                <li><span>Term</span> <span>{semester.year.term_name}</span></li>
                <li><span>Semester Started In</span> <span>{formatDate(semester.started)}</span></li>
                <li><span>Total Marks of Semester</span> <Text>{semester.default_grade} marks</Text></li>
                <li><span>Studying Subjects</span> <Text>{semester.year.courses.length} subject</Text></li>
                <li><span>Department</span> <span>{semester.year.department.title} subject</span></li>
              </ul>
            </div>
          </div>
          <div className="default-section">
            <h5 className='header-title'>Student Information</h5>
            <div className="list-items">
              <ul>
                <li><span>Username</span> <span><Link href={route('professors.students.view', student.id)}>{showStudentUsername(student)}</Link></span></li>
                <li><span>Phone Number</span> <span>{showStudentPhone(student)}</span></li>
                <li><span>E-mail Address</span> <span className='truncate-180'>{student.email}</span></li>
                <li><span>National ID</span> <Text>{nationalID(student.national_id)}</Text></li>
              </ul>
              <div className="actions-links">
                <Link href={route('professors.students.view', student.id)} className='btn btn-secondary btn-sm'>More Details</Link>
              </div>
            </div>
          </div>
          <div className="default-section previous-semesters">
            <h5><Link href={route('professors.students.semesters', student.id)}>Perivous Semesters</Link></h5>
            {student.semesters.filter(sem => sem.is_done == 1).length > 0 ? (
              <div className="list-items">
                <ul>
                  {student.semesters.filter(sem => sem.is_done == 1).map(sem => (
                    <li>
                      <span className='truncate-200'><Link>{sem.year.title}</Link></span>
                      <span className='truncate-200'>
                      {sem.grade >= sem.default_grade / 2 ? <Text>{sem.grade} marks</Text> : <span className='text-danger'>{sem.grade} marks</span>}
                    </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="alert alert-sm alert-primary">
                There's no previous semesters for this student!
              </div>
            )}

          </div>
        </div>

        <div className="second-column">
          <div className="default-section subjects-information" style={{ marginTop: 0 }}>
            <h5>Subjects <span className="text-success">({semester.year.courses.length} subjects)</span></h5>
            {semester.year.courses.length > 0 ? (
              <ul>
                {semester.year.courses.map(course => (
                  <li>
                    <span className='left-li'><Link>{course.subject.title} - <span style={{ fontWeight: 600 }}>{course.subject.code}</span></Link></span>
                    <span className='right-li'><span>{course.subject.chapters.length} chapter</span> - <Link href={route('professors.subjects.grades', course.subject.id)}>{course.subject.grades ? course.subject.grades.total : '0'} marks</Link></span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-sm alert-primary">
                There's no studying content has been added before for <b>{semester.year.title}</b>.
                <Link className='alert-link' href={route('professors.deps.year.content.add', [semester.year.department, semester.year.id])}>Click here</Link> to add studying content!
              </div>
            )}

          </div>
          <div className="default-section semester-info">
            <h5>Semester Information <span className="text-success">({semester.year.courses.length} subjects)</span></h5>
            <p>{semester.information}</p>
          </div>
          <div className="actions-links">
            <Link className='btn btn-sm btn-primary' href={route('professors.students.semesters.update', [student.id, semester.id])}><FontAwesomeIcon icon={faEdit} /> Update Semester</Link>
            <Link className='btn btn-sm btn-secondary' href={route('professors.students.semesters.view', [student.id, semester.id])}><FontAwesomeIcon icon={faEye} /> View Grades</Link>
            <Link className='btn btn-sm btn-success' href={route('professors.students.semesters.grades.add', [student.id, semester.id])}><FontAwesomeIcon icon={faPlus} /> Add Grades</Link>
          </div>
        </div>

      </div>

    </ProfessorLayout>
  )
}

export default CurrentSemester
