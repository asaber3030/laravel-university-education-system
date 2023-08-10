import './update-student-grade.scss'

import { useEffect, useState } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
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
import {FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";
import {APP_URL} from "@/helpers/constants";
import StudentCard from "@/components/StudentCard/StudentCard";
import {calcPercentage} from "@/helpers/functions/calcPercentage";

const UpdateStudentGrade = () => {

  const { year, grade, student, department, semester } = usePage().props
  const { data, setData, processing, post, errors } = useForm({
    final: grade.final,
    lab: grade.lab,
    smart: grade.smart,
    midterm: grade.midterm,
    quizzes: grade.quizzes,
    assignments: grade.assignments,
    oral: grade.oral,
  })

  const handleUpdateGrades = () => {
    post(route('professors.deps.year.students.update.grades', [department.id, year.id, student.id, grade.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`${student.username} - ${year.title}`} />

      <ProfessorLayoutHeader
        title={
        <span>
          <Link href={route('professors.students.view', student.id)}>{student.username} </Link>
          Grade for semester <Link href={route('professors.deps.year.content', [department.id, year.id])}>{year.title}</Link> -
          Subject <Link href={route('professors.subjects.chapters', grade.subject)}>{grade.course.subject.title}</Link>
        </span>
      }
        icon={faChalkboardTeacher}
      >

      </ProfessorLayoutHeader>

      <div className="update-course-grade">

        <div className="left-components">

          <StudentCard student={student} />

          <div className="course-information default-box list-items">
            <ul>
              <li><span className='light-weight'>Course</span> <span>{grade.course.title}</span></li>
              <li><span className='light-weight'>Subject</span> <Link href={route('professors.subjects.chapters', grade.subject)}>{grade.course.subject.title}</Link></li>
              <li><span className='light-weight'>Chapters</span> <span>{grade.course.subject.chapters.length} chapter(s)</span></li>
              <hr/>
              <li><span>Total Subject Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.total : '0'} mark(s)</span></li>
              <li><span>Oral Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.oral : '0'} mark(s)</span></li>
              <li><span>Lab Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.lab : '0'} mark(s)</span></li>
              <li><span>Smart Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.smart : '0'} mark(s)</span></li>
              <li><span>Final Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.final : '0'} mark(s)</span></li>
              <li><span>Quizzes Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.quizzes : '0'} mark(s)</span></li>
              <li><span>Mid-term Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.midterm : '0'} mark(s)</span></li>
              <li><span>Assignments Marks</span> <span className='text-secondary'>{grade.course.subject.grades ? grade.course.subject.grades.assignments : '0'} mark(s)</span></li>
            </ul>
          </div>
          <div className="semester-information list-items default-box">
            <ul>
              <li><span className='light-weight'>Semester</span> <Link href={route('professors.deps.year.content', [department.id, year.id])}>{year.title}</Link></li>
              <li><span>Start at</span> <span>{formatDate(year.start)}</span></li>
              <li><span>End at</span> <span>{formatDate(year.end)}</span></li>
              <li><span>Semester Total Grades</span> <span className='text-success'>{year.grade} marks</span></li>
              <li>
                <span>Student marks</span>
                <span className={`${semester.total <= year.grade / 2 ? 'text-danger' : 'text-success'}`}>{semester.grade} marks {`${semester.total <= year.grade / 2 ? '- Failed' : ' - ' + (100 - (year.grade - semester.grade) / year.grade * 100) }%`} </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-components">
          <h6 className='default-title'>Update Grades</h6>

          <FormContainer>

            <InputField
              label='Final Marks'
              value={data.final}
              handleChange={ e => setData('final', e.target.value) }
              error={errors.final}
            />
            <InputField
              label='Lab Marks'
              value={data.lab}
              handleChange={ e => setData('lab', e.target.value) }
              error={errors.lab}
            />
            <InputField
              label='Smart Marks'
              value={data.smart}
              handleChange={ e => setData('smart', e.target.value) }
              error={errors.smart}
            />
            <InputField
              label='Midterm Marks'
              value={data.midterm}
              handleChange={ e => setData('midterm', e.target.value) }
              error={errors.midterm}
            />
            <InputField
              label='Quizzes Marks'
              value={data.quizzes}
              handleChange={ e => setData('quizzes', e.target.value) }
              error={errors.quizzes}
            />
            <InputField
              label='Assignments Marks'
              value={data.assignments}
              handleChange={ e => setData('assignments', e.target.value) }
              error={errors.assignments}
            />
            <InputField
              label='Oral Marks'
              value={data.oral}
              handleChange={ e => setData('oral', e.target.value) }
              error={errors.oral}
            />

            <div className="form-group">
              <button onClick={handleUpdateGrades} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEdit} /> Update Grades</button>
            </div>

          </FormContainer>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default UpdateStudentGrade
