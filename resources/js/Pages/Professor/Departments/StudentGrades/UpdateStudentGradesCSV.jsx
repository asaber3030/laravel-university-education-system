import './student-grades.scss'

import {useEffect, useState} from "react";

import { useForm, usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

import { CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";
import {STUDENT_GRADE_EXCEL_SHEET, STUDENT_GRADE_EXCEL_SHEET_UPDATE_VER} from "@/helpers/constants";

const UpdateGradesCSV = () => {

  const { year, customErrors } = usePage().props
  const [selectedSubject, setSelectedSubject] = useState(0)

  const { data, setData, processing, post, errors } = useForm({
    file: ''
  })

  const handleSubmit = () => {
    post(route('professors.deps.year.grades.update', [year.department.id, year.id]))
    console.log(customErrors)
  }

  useEffect(() => {
    setSelectedSubject(year.courses.find(course => course.id == data.course))
    console.log(customErrors)
  }, [data.course])

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title={`Update Grades - ${year.title} - ${year.term_name}`} icon={faEdit}></ProfessorLayoutHeader>

      <div className="student-grades">

        {customErrors && customErrors.noGrades && (
          <div className='errors-container'>
            <ul>
              <li className='alert alert-sm alert-primary'>
                Course grade doesn't exist for usernames:
                {customErrors.noGrades.map(err => (
                  <span>{err}</span>
                ))}
              </li>
            </ul>
          </div>
        )}

        {customErrors && customErrors.gradeNotExists && (
          <div className='errors-container'>
            <ul>
              <li className='alert alert-sm alert-primary'>
                Course grade doesn't exist for usernames:
                {customErrors.gradeNotExists.map(err => (
                  <span>{err}</span>
                ))}
              </li>
            </ul>
          </div>
        )}

        {customErrors && customErrors.notSameDepartment && (
          <div className='errors-container'>
            <ul>
              <li className='alert alert-sm alert-primary'>
                Students that doesn't belong to current department: {customErrors.notSameDepartment.map(err => (
                <span>{err} </span>
              ))}
              </li>
            </ul>
          </div>
        )}

        {customErrors && customErrors.notSameYear && (
          <div className='errors-container'>
            <ul>
              <li className='alert alert-sm alert-primary'>
                Students that doesn't belong to current selected semester: {customErrors.notSameYear.map(err => (
                <span>{err} </span>
              ))}
              </li>
            </ul>
          </div>
        )}

        {customErrors && customErrors.noCourse && (
          <div className='errors-container'>
            <ul>
              <li>{customErrors.noCourse}</li>
            </ul>
          </div>
        )}

        <div className="alert alert-primary alert-cols">
          <h5 className="alert-heading">Please make sure to provide data with this columns!</h5>
          <ul>
            {STUDENT_GRADE_EXCEL_SHEET_UPDATE_VER.map(col => (
              <li>{col}</li>
            ))}
          </ul>
        </div>

        <FormContainer>

          <InputField
            label='Department'
            labelRequired={false}
            value={year.department.title}
            disabled={true}
          />

          <InputField
            label='Studying Year'
            labelRequired={false}
            value={year.title}
            disabled={true}
          />


          {selectedSubject && selectedSubject.title && (
            <div className="alert alert-sm alert-primary">
              Selected Subject: <b>{selectedSubject.title}</b> - This subject total marks is: <b>{selectedSubject.grades ? selectedSubject.grades.total : '0'} marks</b>.
              {selectedSubject.grades == null && (
                <Link href={route('professors.subjects.grades', selectedSubject.id)}></Link>
              )}
            </div>
          )}

          <FileInput
            label='CSV File'
            handleChange={ e => setData('file', e.target.files[0]) }
            error={errors.file}
          />

          <div className="form-group">
            <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
          </div>

        </FormContainer>


      </div>

    </ProfessorLayout>
  )
}

export default UpdateGradesCSV
