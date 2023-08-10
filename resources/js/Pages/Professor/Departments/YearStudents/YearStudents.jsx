import './year-students.scss'
import { useEffect, useState, useMemo } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBook,
  faChalkboardTeacher, faClock,
  faGraduationCap,
  faLayerGroup,
  faPlay,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {faEye, faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";

import { StudentsColumns } from "@/columns/students";
import formatDate from "@/helpers/functions/format-date";

const YearStudents = () => {

  const { semesters, department, year, can_promote } = usePage().props
  const [studentsData, setStudents] = useState(semesters.student)

  return (
    <ProfessorLayout>
      <Head title={`Students of semester - ${year.title} - ${year.term_name}`} />
      <ProfessorLayoutHeader title={`Students ${year.title} - ${year.term_name}`} icon={faBook}>
        <Link className='btn btn-primary btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Year</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Content</Link>
        <Link className='btn btn-success btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Student Manually</Link>
        {can_promote && (
          <Link className='btn btn-info btn-sm' href={route('professors.deps.year.students.promote.succeeded', [department.id, year.id])}><FontAwesomeIcon icon={faArrowUp} /> Promote Students</Link>
        )}
        <Link className='btn btn-primary btn-sm' href={route('professors.deps.year.students.add', [department.id, year.id])}><FontAwesomeIcon icon={faPlus} /> Import Students</Link>
        <Link className='btn btn-primary btn-sm' href={route('professors.deps.year.students.add.grades', [department.id, year.id])}><FontAwesomeIcon icon={faGraduationCap} /> Import Grades</Link>
      </ProfessorLayoutHeader>



      <div className="students-content">

        {semesters.length > 0 ? (
          <div className="table-view mt-3">
            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Student ID</th>
                <th>Semester ID</th>
                <th>Student</th>
                <th>E-mail</th>
                <th>Total Marks</th>
                <th>Finished?</th>
                <th>Start</th>
              </tr>
              </thead>
              <tbody>
              {semesters.map((student, idx) => (
                <tr key={idx}>
                  <td>{student.student.id}</td>
                  <td>
                    <Tooltip title='View Semester Details'>
                      <Link href={route('professors.students.semesters.view', [student.student.id, student.id])}>{student.id}</Link>
                    </Tooltip>
                  </td>
                  <td><Link>{student.student.username}</Link></td>
                  <td>{student.student.email}</td>
                  <td className='text-success'>{student.grade} marks</td>
                  <td>{student.is_done ? 'Yes' : 'No'}</td>
                  <td>{formatDate(student.year.start)}</td>
                </tr>
              ))}

              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-sm alert-primary">There's no students belongs to this semester!</div>
        )}

        <div className="listing-students-info">

          <div className="def-section left-items list-items">
            <h6 className='default-title'>Semester Details</h6>
            <ul>
              <li>
                <span><FontAwesomeIcon icon={faClock} /> Title</span>
                <span>{year.title}</span>
              </li>
              <li>
                <span><FontAwesomeIcon icon={faGraduationCap} /> Students</span>
                <span>{semesters.length} Students</span>
              </li>
              <li>
                <span><FontAwesomeIcon icon={faLayerGroup} /> Department</span>
                <span><Link href={route('professors.deps.years', department.id)}>{department.title}</Link></span>
              </li>
              <li>
                <span><FontAwesomeIcon icon={faPlay} /> Courses</span>
                <span><Link href={route('professors.deps.year.content', [department.id, year.id])}>{year.courses.length} course(s)</Link></span>
              </li>
              <li>
                <span><FontAwesomeIcon icon={faBook} /> Term Name</span>
                <span>{year.term_name}</span>
              </li>
            </ul>
          </div>

          <div className="def-section right-items list-items">
            <h6 className='default-title' style={{ padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center !important' }}>
              <span>Semester Studying Content</span>
              <Link style={{ marginBottom: '5px' }} href={route('professors.deps.year.content.add', [department.id, year.id])} className='btn btn-sm btn-primary'>Add Content</Link>
            </h6>
            {year.courses.length > 0 ? (
              <ul className='list-ss-courses'>
                {year.courses.map((course, idx) => (
                  <li key={idx}>
                    <Link href={route('professors.subjects.chapters', course.subject.id)}><FontAwesomeIcon icon={faGraduationCap} /> {course.subject.title}</Link>
                    <span>{course.subject.chapters_count + ' chapter(s)'} - {course.subject.grades ? course.subject.grades.total : 0} marks</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="alert alert-sm alert-primary">There's no studying content exists for this semester "<b>{year.title} - {year.term_name}</b>"</div>
            )}
          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default YearStudents
