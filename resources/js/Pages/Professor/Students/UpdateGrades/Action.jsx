import './update-grades.scss';
import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePage, Link, Head, useForm } from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"

import showStudentName from "@/helpers/functions/showStudentName";
import {FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";
import {faInbox, faList} from "@fortawesome/free-solid-svg-icons";

const GradeAction = () => {

  const { student, semester, grade } = usePage().props
  const [totalGrades, setTotalGrades] = useState(0)

  console.log(grade)

  const { data, setData, post, errors } = useForm({
    final: grade.final,
    assignments: grade.assignments,
    quizzes: grade.quizzes,
    midterm: grade.midterm,
    lab: grade.lab,
    smart: grade.smart,
    oral: grade.oral,
  })

  useEffect(() => {
    setTotalGrades(() => parseFloat(data.assignments) + parseFloat(data.oral) + parseFloat(data.final) + parseFloat(data.lab) + parseFloat(data.smart) + parseFloat(data.quizzes) + parseFloat(data.midterm))
  }, [data])

  const updateGrades = () => {
    console.log(errors)
    post(route('professors.students.semesters.grades.update.final', [student.id, semester.id, grade.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Semester Grades - ${student.name}`} />

      <div className='custom-header'>
        <span>Update Student Semester - <b>{student.year.title}</b> - Subject: <b>{grade.subject.title}</b></span> <span>{showStudentName(student)}</span>
      </div>

      {grade ? (
        <FormContainer>

          <InputField disabled={true} labelRequired={false} value={student.username + '#' + student.national_id} label={'Student'} />
          <InputField disabled={true} labelRequired={false} value={student.year.title} label={'Year'} />
          <InputField disabled={true} labelRequired={false} value={student.department.title} label={'Department'} />
          <InputField disabled={true} labelRequired={false} value={grade.subject.title} label={'Subject'} />

          <div className="form-groups">

            <InputField label={'Total Marks'} value={totalGrades} disabled={true} labelRequired={false} />

            <InputField value={data.final} error={errors.final} label='Final' handleChange={ e => setData('final', e.target.value) } type="text" />

            <InputField value={data.assignments} error={errors.assignments} label='Assignments' handleChange={ e => setData('assignments', e.target.value) } type="text" />

            <InputField value={data.quizzes} error={errors.quizzes} label='Quizzes' handleChange={ e => setData('quizzes', e.target.value) } type="text" />

            <InputField value={data.midterm} error={errors.midterm} label='Midterm' handleChange={ e => setData('midterm', e.target.value) } type="text" />

            <InputField value={data.lab} error={errors.lab} label='Lab' handleChange={ e => setData('lab', e.target.value) } type="text" />

            <InputField value={data.smart} error={errors.smart} label='Smart' handleChange={ e => setData('smart', e.target.value) } type="text" />

            <InputField value={data.oral} error={errors.oral} label='Oral' handleChange={ e => setData('oral', e.target.value) } type="text" />

          </div>

          <div className="form-group">
            <button onClick={updateGrades} className="btn btn-primary">Update - <b>{grade.subject.title}</b></button>
          </div>

        </FormContainer>
      ) : (
        <div className="alert alert-primary">No Semesters exists for student <b>{student.name} - {student.national_id}</b></div>
      )}

    </ProfessorLayout>
  )
}

export default GradeAction
