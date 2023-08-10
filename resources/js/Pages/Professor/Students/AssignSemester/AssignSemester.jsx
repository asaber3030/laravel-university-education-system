import './assign-semester.scss'
import { useState } from "react"
import {usePage, Link, Head, useForm} from "@inertiajs/inertia-react"

import EngineerHelment from '../../../../assets/images/helmet.png'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook, faCheck,
  faCog,
  faEllipsis,
  faEllipsisVertical,
  faGraduationCap, faPaperPlane, faPlus, faTrash,
  faTrashRestore
} from "@fortawesome/free-solid-svg-icons"
import {faEye, faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";

import showStudentName from "@/helpers/functions/showStudentName";
import capitilize from "@/helpers/functions/capitilize";
import formatDate from "@/helpers/functions/format-date";

import { showStudentUsername, showStudentPhone, showStudentDepartment } from "@/helpers/functions/student";
import { Tooltip } from "@mui/material";
import {FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";

const AssignSemester = () => {

  const { student, appURL, courses } = usePage().props
  const { data, setData, errors, processing, post } = useForm({
    grade: '',
    started: '',
    ended: '',
    title: student.year.title,
    information: ''
  })

  console.log(courses)

  const submitAssigning = () => {
    post(route('professors.students.semester.assign', [student.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Assign Current Semester - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faPlus} /> Assign Semester - Student - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <StudentActionsDropdown student={student} />
        </div>
      </div>

      <div className="assign-semester-container">

        <div className="left-semester-assign">

          <FormContainer>

            <InputField disabled={true} value={data.title} labelRequired={false} label='Title' handleChange={ e => setData('title', e.target.value) } />
            <InputField value={data.grade} error={errors.grade} label='Grade' type='number' handleChange={ e => setData('grade', e.target.value) } />
            <InputField value={data.started} error={errors.started} label='Started' type='datetime-local' handleChange={ e => setData('started', e.target.value) } />
            <InputField value={data.ended} labelRequired={false} label='Ended' type='datetime-local' handleChange={ e => setData('ended', e.target.value) } />
            <TextArea value={data.information} labelRequired={false} label='Additional Information' handleChange={ e => setData('information', e.target.value) } />

            <div className='form-group'>
              <button onClick={submitAssigning} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPaperPlane} /> Assign Semester</button>
            </div>

          </FormContainer>

        </div>

        <div className="right-information">

          <div className="year-information list-items default-box">

            <ul>
              <li><span>Year</span> <span><Link href={route('professors.deps.year.content', [student.department.id, student.year.id])}>{student.year.title}</Link></span></li>
              <li><span>Department</span> <span><Link href={route('professors.deps.years', [student.department.id])}>{student.department.title}</Link></span></li>
              <li><span>Total Grades</span> <span className='text-success'>{student.year.grade} marks</span></li>
              <li><span>Term</span> <span className='text-success'>{student.year.term_name}</span></li>
            </ul>

          </div>

          <div className="courses">

            {courses.length > 0 ? (
              <>
                {courses.map(course => (
                  <div className="course">
                    <Link href={route('professors.subjects.chapters', course.subject.id)}>{course.subject.title} - {course.subject.chapters_count} chapter(s)</Link>
                  </div>
                ))}
              </>
            ) : (
              <div className="alert alert-sm alert-primary">
                There's no studying content for this year <b><Link href={route('professors.deps.year.content', [student.department.id, student.year.id])}>{student.year.title}. </Link></b>
                if you want to assign new content <Link href={route('professors.deps.year.content.add', [student.department.id, student.year.id])}><b> Click here</b></Link> to assign content
              </div>
            )}

          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default AssignSemester
