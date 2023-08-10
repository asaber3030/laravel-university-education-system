import './add-grade.scss';

import { usePage, Link, Head, useForm } from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FormContainer, InputField, SelectBox } from "@/components/Form/FormContainer";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

const AddSemesterGrade = () => {

  const { student, semester, yearCourses } = usePage().props

  const [totalGrades, setTotalGrades] = useState(0)
  const { data, setData, post, errors } = useForm({
    final: 0,
    assignments: 0,
    quizzes: 0,
    midterm: 0,
    lab: 0,
    smart: 0,
    oral: 0,
    course: null,
  })

  const addGrades = () => {
    post(route('professors.students.semesters.grades.add', [student.id, semester.id]))
  }

  useEffect(() => {
    setTotalGrades(() => parseFloat(data.assignments) + parseFloat(data.oral) + parseFloat(data.final) + parseFloat(data.lab) + parseFloat(data.smart) + parseFloat(data.quizzes) + parseFloat(data.midterm))
  }, [data])

  return (
    <ProfessorLayout>

      <Head title={`Add Semester Grade - ${student.name}`} />

      <ProfessorLayoutHeader
        title={
          <span>New Semester Subject Grade</span>
        }>
      </ProfessorLayoutHeader>

      <div className="add-semester-subject">

        <FormContainer>

          <InputField label='Student' labelRequired={false} disabled={true} value={`${student.username}#${student.national_id}`} />
          <InputField label='Year' labelRequired={false} disabled={true} value={student.year.title} />
          <InputField label='Department' labelRequired={false} disabled={true} value={student.department.title} />
          <InputField label='Semester ID' labelRequired={false} disabled={true} value={`#${semester.id}`} />

          {yearCourses.length > 0 ? (
            <>
              <SelectBox
                label='Choose Subject to add grade for:'
                error={errors.course}
                handleChange={ e => setData('course', e.target.value) }
                items={yearCourses.map(course => {
                  return {
                    value: course.id,
                    text: `${course.subject.title} - ${course.subject.code}`
                  }
                })}
              />

              <div className="form-groups">

                <InputField disabled={true} labelRequired={false} value={totalGrades} error={errors.total} label='Total' handleChange={ e => setData('total', e.target.value) } type="text" />

                <InputField value={data.final} error={errors.final} label='Final' handleChange={ e => setData('final', e.target.value) } type="text" />

                <InputField value={data.assignments} error={errors.assignments} label='Assignments' handleChange={ e => setData('assignments', e.target.value) } type="text" />

                <InputField value={data.quizzes} error={errors.quizzes} label='Quizzes' handleChange={ e => setData('quizzes', e.target.value) } type="text" />

                <InputField value={data.midterm} error={errors.midterm} label='Midterm' handleChange={ e => setData('midterm', e.target.value) } type="text" />

                <InputField value={data.lab} error={errors.lab} label='Lab' handleChange={ e => setData('lab', e.target.value) } type="text" />

                <InputField value={data.smart} error={errors.smart} label='Smart' handleChange={ e => setData('smart', e.target.value) } type="text" />

                <InputField value={data.oral} error={errors.oral} label='Oral' handleChange={ e => setData('oral', e.target.value) } type="text" />

              </div>

              <div className="form-group">

                <button onClick={addGrades} className="btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add</button>

              </div>
            </>
          ) : (
            <div className="alert alert-sm alert-primary">
              All courses grades' for <Link href={route('professors.students.view', student.id)}><b>{student.username}</b></Link> has been assigned. <Link href={route('professors.students.semesters.view', [student.id, semester.id])}><b>Click here</b></Link> to view all grades of selected semester.
            </div>
          )}


        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default AddSemesterGrade
