import './new.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { Tooltip } from "@mui/material";
import {FileInput, FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";
import Swal from "sweetalert2";
import Loading from "@/components/Loading/Loading";

const NewYearAssignment = () => {

  console.log('all')

  const { year } = usePage().props
  const [activeCourse, setActiveCourse] = useState(null)
  const [courseData, setCourseData] = useState(null)
  const [assignmentCode, setCode] = useState()

  const { data, setData, post, processing, errors } = useForm({
    activeCourse: activeCourse,
    title: '',
    information: '',
    file: '',
    url: '',
    deadline: '',
    code: ''
  })

  const generateCode = (e) => {
    e.preventDefault()
    if (courseData) {
      let code = 'AS_' + courseData.subject.title.slice(0, 4).toUpperCase() + (Math.random() * 1000).toFixed();
      setCode( value =>  code)
      setData('code', code)
    } else {
      Swal.fire({
        title: 'Subject Name!',
        text: 'Please choose a subject to generate a code based on subject name',
        icon: 'warning',
      })
    }

  }

  const sendAssignment = () => {
    setData('activeCourse', activeCourse)
    post(route('professors.ass.new', year.id))
    console.log(errors)
  }

  useEffect(() => {
    if (activeCourse) setCourseData(year.courses.find(course => course.id == activeCourse))
    setData('activeCourse', activeCourse)
  }, [activeCourse])

  return (
    <ProfessorLayout>

      <Head title={`Creating new Assignment for students of ${year.title}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader icon={faPlus} title={<span>New Assignment - Studying Year - <b>{year.title}</b> - <b>{year.term_name}</b></span>}>
        <Tooltip title='Update Assignments'><Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEdit} /></Link></Tooltip>
      </ProfessorLayoutHeader>

      <div className="new-assignments-container">

        {year.students.length > 0 ? (
          <div className="choice-group">

            <h6>Select a course:</h6>

            <div className="list-courses">
              {year.courses.map(course => (
                <div key={course.id} className={`course ${activeCourse == course.id ? 'active-course' : 'not-active'}`} onClick={ () => setActiveCourse(course.id) }>
                  <h6>
                    {course.id == activeCourse && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                    <span>{course.title} - {course.subject.title} - <span className='subj-code'>{course.subject.code}</span></span>
                  </h6>
                </div>
              ))}
            </div>

            <div className="year-information">

              <FormContainer>

                <InputField
                  labelRequired={false}
                  label='Selected Studying Year'
                  disabled={true}
                  value={`${year.title} - #${year.id}`}
                />

                <InputField
                  error={errors.title}
                  value={data.title}
                  handleChange={ e => setData('title', e.target.value) }
                  label='Assignment Title'
                />

                <div className="group-in">
                  <InputField
                    value={data.code}
                    handleChange={ e => setData('code', e.target.value) }
                    label='Assignment Code'
                    error={errors.code}
                  />
                  <h6 onClick={ generateCode }>Generate code</h6>
                </div>

                <TextArea error={errors.information} value={data.information} handleChange={ e => setData('information', e.target.value) } label='Assignment Details' />

                <InputField error={errors.deadline} value={data.deadline} handleChange={ e => setData('deadline', e.target.value) } type='datetime-local' label='Deadline' />

                <InputField error={errors.url} value={data.url} handleChange={ e => setData('url', e.target.value) } type='url' label='Add URL' labelRequired={false} />

                <FileInput error={errors.file} handleChange={ e => setData('file', e.target.files[0]) } label='Add File' labelRequired={false} />

                <button className='btn btn-primary' onClick={sendAssignment}>Send Assignment!</button>

              </FormContainer>

            </div>

          </div>
        ) : (
          <div style={{ height: "fit-content" }} className="alert alert-sm alert-primary">There's no students to send assignments!</div>
        )}

        <div className="right-group list-items">
          <h6 className='default-title'>Semester Details</h6>
          <ul>
            <li>
              <span>Students</span>
              <span>{year.students.length} student(s)</span>
            </li>

            <li>
              <span>Department</span>
              <span>{year.department.title}</span>
            </li>

            <li>
              <span>Semester</span>
              <span className='truncate-200'>{year.title} - {year.term_name}</span>
            </li>

            <li>
              <span>Semester Marks!</span>
              <span className='text-success'>{year.grade} marks</span>
            </li>
          </ul>
        </div>

      </div>

    </ProfessorLayout>
  )
}

export default NewYearAssignment
