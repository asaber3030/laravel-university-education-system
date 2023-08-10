import './year-grades.scss'

import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faEdit, faEye} from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";

import { StudentsColumns } from "@/columns/students";
import { nationalID } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import {faBook, faChalkboardTeacher, faCog, faFileExcel, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {SelectBox} from "@/components/Form/FormContainer";

const YearGrades = () => {

  const { year, course } = usePage().props

  const [courseFilter, setCourseFilter] = useState()
  const [studentFilter, setStudentFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('highest')


  return (
    <ProfessorLayout>

      <Head title={`Current Students Grades - ${year.title}`} />

      <ProfessorLayoutHeader title={`Current Students Grades - ${year.title}`} icon={faChalkboardTeacher}>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.content.add', [year.department.id, year.id])}><FontAwesomeIcon icon={faPlus} /> Add Course</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.add', year.department.id)}><FontAwesomeIcon icon={faPlus} /> Add Student Manually</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.students.add', [year.department.id, year.id])}><FontAwesomeIcon icon={faFileExcel} /> Import Students</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.students.add.grades', [year.department.id, year.id])}><FontAwesomeIcon icon={faFileExcel} /> Import Grades</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.grades.update', [year.department.id, year.id])}><FontAwesomeIcon icon={faEdit} /> Update Grades</Link>
      </ProfessorLayoutHeader>

      <div className="year-grades-content">

        {year.grades.length > 0 ? (
          <div className="grades-list">

            <table className='table table-bordered'>
              <thead>
              <tr>
                <th>Grade Review ID</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Total Grades</th>
                <th>Final Marks</th>
                <th>Handle</th>
              </tr>
              </thead>
              <tbody>
              {year.grades.map(grade => (
                <tr>
                  <td>{grade.id}</td>
                  <td><Link href={route('professors.students.view', grade.student.id)}>{grade.student.username}</Link></td>
                  <td><Link href={route('professors.subjects.chapters', grade.subject.id)}>{grade.subject.title}</Link></td>
                  <td><Link>{grade.course.title}</Link></td>
                  <td className='text-success'>{grade.total} mark(s)</td>
                  <td className='text-success'>{grade.final} mark(s)</td>
                  <td className='actions-td'>
                    <Tooltip followCursor={true} title='Update grade'>
                      <Link href={route('professors.deps.year.students.update.grades', [year.department.id, year.id, grade.student, grade.id])} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faCog} /></Link>
                    </Tooltip>
                    <Tooltip followCursor={true} title='Update course'>
                      <Link href={route('professors.deps.year.content.update', [year.department.id, year.id, grade.course])} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEdit} /></Link>
                    </Tooltip>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

          </div>
        ) : (
          <div className="alert alert-sm alert-primary">No Grades with search values</div>
        )}


      </div>


    </ProfessorLayout>
  )
}

export default YearGrades
