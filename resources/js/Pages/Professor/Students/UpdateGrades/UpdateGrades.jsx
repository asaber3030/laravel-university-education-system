import './update-grades.scss';
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { usePage, Link, Head, useForm } from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"

import showStudentName from "@/helpers/functions/showStudentName";
import {FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";
import {faInbox, faList} from "@fortawesome/free-solid-svg-icons";
import {Inertia} from "@inertiajs/inertia";

const ViewSemester = () => {

  const { student, semester, grades } = usePage().props
  console.log(grades)

  const [selectedSubject, setSelectedSubject] = useState(grades[0] ?? {})

  const updateLink = () => {
    Inertia.get(route('professors.students.semesters.grades.update.final', [student.id, semester.id, selectedSubject.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Semester Grades - ${student.name}`} />

      <div className='custom-header'>
        <span>Choose Subject in semester - <b>{student.year.title}</b></span> <span>{showStudentName(student)}</span>
      </div>

      {grades.length > 0 ? (
        <>
          <div className="select-subject">
            <SelectBox
              label='Select Subject'
              selectedOptionValue={selectedSubject.subject.id}
              handleChange={ e => setSelectedSubject(grades.find(grade => grade.id == e.target.value)) }
              items={
                grades.map(grade => {
                  return { value: grade.id, text: grade.subject.title + ' - ' + grade.subject.code }
                })
              }
            />

            <div className="form-group" style={{ marginTop: '10px' }}>
              <button onClick={updateLink} className="btn btn-primary">Go to update</button>
            </div>
          </div>

        </>
      ) : (
        <div className="alert alert-primary alert-sm">
          No Course grades exists for student <b>{student.name} - {student.national_id}</b> <br />
          Maybe because there's no courses content has been added for year: <b>{student.year.title}</b>. <Link className='alert-link' href={route('professors.deps.year.content', [student.department.id, semester.year])}>Click here</Link> to view content
        </div>
      )}

    </ProfessorLayout>
  )
}

export default ViewSemester
