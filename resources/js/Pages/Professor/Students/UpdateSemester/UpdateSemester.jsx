import './update-semester.scss'
import {usePage, Link, Head, useForm} from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"

import showStudentName from "@/helpers/functions/showStudentName";
import { FormContainer, InputField, TextArea } from "@/components/Form/FormContainer";


const UpdateSemester = () => {

  const { student, courses, semester, grades } = usePage().props
  const { data, setData, errors,post } = useForm({
    grade: semester.grade,
    started: semester.started,
    ended: semester.ended,
    title: semester.title,
    information: semester.information
  })

  console.log(grades)

  const updateSemester = () => {
    post(route('professors.students.semesters.update', [student.id, semester.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Semester - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faCog} /> Update Semester - Student - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <StudentActionsDropdown student={student} />
        </div>
      </div>

      <div className="assign-semester-container">

        <div className="left-semester-assign">

          <FormContainer>

            <InputField value={data.title} labelRequired={false} label='Title' handleChange={ e => setData('title', e.target.value) } />
            <InputField value={data.grade} error={errors.grade} label='Grade' type='number' handleChange={ e => setData('grade', e.target.value) } />
            <InputField value={data.started} error={errors.started} label='Started' type='datetime-local' handleChange={ e => setData('started', e.target.value) } />
            <InputField value={data.ended} labelRequired={false} label='Ended' type='datetime-local' handleChange={ e => setData('ended', e.target.value) } />
            <TextArea value={data.information} labelRequired={false} label='Additional Information' handleChange={ e => setData('information', e.target.value) } />

            <div className='form-group'>
              <button onClick={updateSemester} className="btn btn-primary">Update Semester</button>
            </div>

          </FormContainer>

        </div>

        <div className="right-information">

          <div className="list-items default-box">

            <ul>
              <li><span>Year</span> <span><Link href={route('professors.deps.year.content', [student.department.id, student.year.id])}>{student.year.title}</Link></span></li>
              <li><span>Department</span> <span><Link href={route('professors.deps.years', [student.department.id])}>{student.department.title}</Link></span></li>
              <li><span>Total Grades</span> <span className='text-success'>{student.year.grade} marks</span></li>
              <li><span>Term</span> <span className='text-success'>{student.year.term_name}</span></li>
            </ul>

          </div>

          <div className="grades">

            {grades.map(grade => (
              <div className="grade">
                <h6>{grade.subject.title} - <span className="text-success">{grade.total} mark(s)</span></h6>
              </div>
            ))}

          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default UpdateSemester
