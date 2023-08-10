import './promote-students.scss'
import {useEffect, useState, useMemo, useTransition} from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
  faBook,
  faChalkboardTeacher, faCheck, faClock,
  faGraduationCap, faHashtag,
  faLayerGroup,
  faPlay,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";

import { StudentsColumns } from "@/columns/students";
import { nationalID } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import {Inertia} from "@inertiajs/inertia";

const PromoteStudents = () => {

  const { department, year, next_year, can_promote, highest_student, succeeded_students, failed_students } = usePage().props

  const [succeededStudentsData, setSucceededData] = useState(succeeded_students.slice(0, 15))

  const promoteStudents = () => {
    Inertia.post(route('professors.deps.year.students.promote.succeeded', [department.id, year.id]))
  }


  return (
    <ProfessorLayout>

      <Head title={`Students of semester - ${year.title}`} />

      <ProfessorLayoutHeader title={`Promoting Succeeded Students - ${year.title}`} icon={faBook}>
        <Link style={{ marginRight: '5px' }}  className='btn btn-secondary btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Content</Link>
        <Link style={{ marginRight: '5px' }} className='btn btn-success btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Student Manually</Link>
      </ProfessorLayoutHeader>

      {succeeded_students.length > 0 && failed_students ? (
        <div className="promote-students">

          <div className="first-column">

            <div className="next-semester-info default-section">
              <h6 className='default-title'><FontAwesomeIcon icon={faArrowRight} /> Next Year: <b>{next_year.title}</b></h6>
              <ul>
                <h6>Details</h6>
                <li>
                  <span>Department</span>
                  <span className='text-secondary'>{department.title}</span>
                </li>
                <li>
                  <span>Students that will be promoted</span>
                  <span className='text-secondary'>{succeeded_students.length} students</span>
                </li>
                <li>
                  <span>Start</span>
                  <span className='text-secondary'>{formatDate(next_year.start)}</span>
                </li>
                <li>
                  <span>End</span>
                  <span className='text-secondary'>{formatDate(next_year.end)}</span>
                </li>
                <li>
                  <span>Can Promote</span>
                  <span className={`${can_promote ? 'text-success' : 'text-danger'}`}>{`${can_promote ? 'Yes' : 'No - Date Not Valid'}`}</span>
                </li>

                <h6>Subjects - {year.courses.length} course(s)</h6>
                {year.courses.map(course => (
                  <li key={course.id}>
                    <Link href={route('professors.subjects.chapters', course.subject.id)}>{`${course.subject.title} - ${course.subject.code}`}</Link>
                    <span className='text-success'>{course.subject.grades ? course.subject.grades.total : '0'} marks</span>
                  </li>
                ))}
              </ul>
              <div className="actions">
                <Link href={route('professors.deps.year.update', [department.id, year.id])} className='btn btn-sm btn-primary'>Update Content</Link>
                <Link href={route('professors.deps.year.content.add', [department.id, year.id])} className='btn btn-sm btn-secondary'>Add Content</Link>
              </div>
            </div>

            <div className="succeeded-students default-section">
              <h6 className='default-title'><FontAwesomeIcon icon={faGraduationCap} /> Semster Students</h6>
              <ul>
                <li>
                  <span>Total Students</span>
                  <span>{succeeded_students.length + failed_students.length} students</span>
                </li>
                <li>
                  <span>Total Succeeded Students</span>
                  <span className='text-success'>{succeeded_students.length} students</span>
                </li>
                <li>
                  <span>Total Failed Students</span>
                  <span className='text-danger'>{failed_students.length} students</span>
                </li>
                <li>
                  <span>Highest Student</span>
                  <span className='text-success'><Link href={route('professors.students.view', highest_student.student.id)}>{highest_student.student.username}</Link> - {highest_student.grade} marks</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="second-column">

            <div className="list-succeeded-students">

              {succeeded_students.length > 0 ? (
                <>
                  <table className='table table-bordered'>
                    <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Username</th>
                      <th scope='col'>Natioanl ID</th>
                      <th scope='col'>Grade</th>
                      <th scope='col'>Started</th>
                      <th scope='col'>Ended</th>
                    </tr>
                    </thead>
                    <thead>
                    {succeededStudentsData.map(year => (
                      <tr key={year.student.id}>
                        <td>{year.student.name}</td>
                        <td><Link href={route('professors.students.view', year.student.id)}>{year.student.username}</Link></td>
                        <td>{nationalID(year.student.national_id)}</td>
                        <td className='text-success'>{year.grade} marks</td>
                        <td>{formatDate(year.started)}</td>
                        <td>{formatDate(year.ended)}</td>
                      </tr>
                    ))}
                    </thead>
                  </table>
                  {can_promote ? (
                    <button onClick={promoteStudents} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faCheck} /> Promote <b>{succeeded_students.length}</b> students</button>
                  ) : (
                    <div className="alert alert-sm alert-info">
                      Cannot promote students to next year or next semester because it's too late or it's too early!
                    </div>
                  )}
                </>
              ) : (
                <div style={{ marginTop: 0 }} className="alert-sm alert-primary alert">
                  There's No Students To Promote to next semester or year!
                </div>
              )}


            </div>
          </div>

        </div>
      ) : (
        <div className="alert alert-sm mt-10 alert-secondary">
          There's No Students has been added to this semester <b>{year.title}</b>. <Link>Click here to add</Link>!
          <ul>
            <li>May be there's no succeeded students to promote to next semester</li>
            <li>Semester content click here to view, <Link href={route('professors.deps.year.content', [department.id, year.id])}>Content</Link></li>
            <li>Click here to view <Link href={route('professors.deps.year.students', [department.id, year.id])}>students</Link></li>
            <li>If you want to add students click here, <Link href={route('professors.deps.year.students', [department.id, year.id])}>Add Students</Link></li>
          </ul>
        </div>
      )}

    </ProfessorLayout>
  )
}

export default PromoteStudents
