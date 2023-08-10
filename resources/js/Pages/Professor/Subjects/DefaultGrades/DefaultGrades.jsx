import './default-grades.scss'
import { useState, useMemo, useEffect } from "react";

import {usePage, Link, useForm, Head} from "@inertiajs/inertia-react";

import { FormContainer, InputField } from "@/components/Form/FormContainer";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import formatDate from "@/helpers/functions/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook, faCheck, faSave} from "@fortawesome/free-solid-svg-icons";

const DefaultGrades = () => {
  const [gradeStatus, setGradeStatus] = useState('')
  const [submitButtonStatus, setSubmitButton] = useState(false)

  const { subject, appURL } = usePage().props

  const { data, setData, post, errors } = useForm({
    total: 0,
    oral: subject.grades ? subject.grades.oral : 0,
    lab: subject.grades ? subject.grades.lab : 0,
    quizzes: subject.grades ? subject.grades.quizzes : 0,
    assignments: subject.grades ? subject.grades.assignments : 0,
    smart: subject.grades ? subject.grades.smart : 0,
    final: subject.grades ? subject.grades.final : 0,
    midterm: subject.grades ? subject.grades.midterm : 0,
    type: gradeStatus
  })

  const memoSubject = useMemo(() => {
    return subject
  }, [subject]);
  useMemo(() => {
    return data
  }, [data]);
  useEffect(() => {
    if (subject.grades != null) {
      setGradeStatus('update')
    } else {
      setGradeStatus('create')
    }
  }, [memoSubject]);

  const saveType = () => {
    if (!subject.grades) {
      setSubmitButton(val => true)
      setData('type', 'create')
    } else {
      setSubmitButton(val => true)
      setData('type', 'update')
    }
  }

  const submitRoute = () => {
    post(route('professors.subjects.grades', subject.id))
  }

  return (

    <ProfessorLayout>

      <Head title={`${subject.title} - Default Grades`} />

      <div className="layout-header">

        <h5><FontAwesomeIcon icon={faBook} /> Default Grades - <b>{subject.title} - {subject.code}</b></h5>

      </div>

      {subject.grades && (
        <div className="default-grades-container">

          <div className="left-grades">
            <h6>Default Grades</h6>
            <ul>
              <li>
                <span>Total Marks</span>
                <span>{subject.grades.total} marks</span>
              </li>
              <li>
                <span>Final Marks</span>
                <span>{subject.grades.final} marks</span>
              </li>
              <li>
                <span>Mid-term Marks</span>
                <span>{subject.grades.midterm} marks</span>
              </li>
              <li>
                <span>Assignment Marks</span>
                <span>{subject.grades.assignment} marks</span>
              </li>
              <li>
                <span>Quizzes Marks</span>
                <span>{subject.grades.quizzes} marks</span>
              </li>
              <li>
                <span>Oral Marks</span>
                <span>{subject.grades.oral} marks</span>
              </li>
              <li>
                <span>Lab Marks</span>
                <span>{subject.grades.lab} marks</span>
              </li>
              <li>
                <span>Smart Marks</span>
                <span>{subject.grades.smart} marks</span>
              </li>
            </ul>
          </div>

          <div className="right-data">
            <h6>{subject.title}</h6>
            <div className="list-items">
              <ul>
                <li><span>Chapters</span> <span><Link href={route('professors.subjects.chapters', subject.id)}>{subject.chapters_count} chapter(s)</Link></span></li>
                <li><span>Department</span> <span><Link href={route('professors.subjects.chapters', subject.id)}>{subject.department.title}</Link></span></li>
                {subject.reference && (
                  <li><span>Reference</span> <span><a download href={appURL + subject.reference}>Download</a></span></li>
                )}
                <li><span>Total Marks</span> <span className='text-success'>{subject.grades.total} mark(s)</span></li>
                <li><span>Code</span> <span className='text-secondary'>{subject.code}</span></li>
                <li><span>Identifier</span> <span>{subject.id}</span></li>
                <li><span>Created At</span> <span>{formatDate(subject.created_at)}</span></li>
                <li><span>Last Update</span> <span>{formatDate(subject.updated_at)}</span></li>
              </ul>
            </div>
            <div className="links">
              <Link href={route('professors.subjects.update', subject.id)}>Update</Link>
              <Link href={route('professors.subjects.chapters', subject.id)}>Chapters</Link>
              <Link href={route('professors.subjects.create.chapter', subject.id)}>Add Chapter</Link>
            </div>
          </div>

          <FormContainer>

            <InputField
              label='Total Marks'
              disabled={true}
              handleChange={ e => setData('total', e.target.value) }
              value={parseInt(data.final) + parseInt(data.oral) + parseInt(data.lab) + parseInt(data.assignments) + parseInt(data.smart) + parseInt(data.quizzes) + parseInt(data.midterm)}
              error={errors.total}
            />

            <InputField
              label='Final Marks'
              handleChange={ e => setData('final', e.target.value) }
              value={data.final}
              error={errors.final}
            />
            <InputField
              label='Assignments Marks'
              handleChange={ e => setData('assignments', e.target.value) }
              value={data.assignments}
              error={errors.assignments}
            />
            <InputField
              label='Midterm Marks'
              handleChange={ e => setData('midterm', e.target.value) }
              value={data.midterm}
              error={errors.midterm}
            />
            <InputField
              label='Oral Marks'
              handleChange={ e => setData('oral', e.target.value) }
              value={data.oral}
              error={errors.oral}
            />
            <InputField
              label='Lab Marks'
              handleChange={ e => setData('lab', e.target.value) }
              value={data.lab}
              error={errors.lab}
            />
            <InputField
              label='Quizzes Marks'
              handleChange={ e => setData('quizzes', e.target.value) }
              value={data.quizzes}
              error={errors.quizzes}
            />
            <InputField
              label='Smart Marks'
              handleChange={ e => setData('smart', e.target.value) }
              value={data.smart}
              error={errors.smart}
            />

            <div className="form-group">
              <button onClick={saveType} className='btn btn-sm btn-success' style={{ marginRight: '5px' }}><FontAwesomeIcon icon={faSave} /> Save</button>
              {submitButtonStatus && (
                <button onClick={submitRoute} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faCheck} /> Update</button>
              )}
            </div>

          </FormContainer>

        </div>
      )}

      {!subject.grades && (
        <FormContainer>

          <div className="alert-sm alert-warning alert">This subject default grades doesn't exists please set it!</div>

          <InputField
            label='Total Marks'
            disabled={true}
            handleChange={ e => setData('total', e.target.value) }
            value={parseInt(data.final) + parseInt(data.oral) + parseInt(data.lab) + parseInt(data.assignments) + parseInt(data.smart) + parseInt(data.quizzes) + parseInt(data.midterm)}
            error={errors.total}
          />

          <InputField
            label='Final Marks'
            handleChange={ e => setData('final', e.target.value) }
            value={data.final}
            error={errors.final}
          />
          <InputField
            label='Assignments Marks'
            handleChange={ e => setData('assignments', e.target.value) }
            value={data.assignments}
            error={errors.assignments}
          />
          <InputField
            label='Midterm Marks'
            handleChange={ e => setData('midterm', e.target.value) }
            value={data.midterm}
            error={errors.midterm}
          />
          <InputField
            label='Oral Marks'
            handleChange={ e => setData('oral', e.target.value) }
            value={data.oral}
            error={errors.oral}
          />
          <InputField
            label='Lab Marks'
            handleChange={ e => setData('lab', e.target.value) }
            value={data.lab}
            error={errors.lab}
          />
          <InputField
            label='Quizzes Marks'
            handleChange={ e => setData('quizzes', e.target.value) }
            value={data.quizzes}
            error={errors.quizzes}
          />
          <InputField
            label='Smart Marks'
            handleChange={ e => setData('smart', e.target.value) }
            value={data.smart}
            error={errors.smart}
          />

          <div className="form-group">
            <button onClick={saveType} className='btn btn-success' style={{ marginRight: '5px' }}>Save</button>
            {submitButtonStatus && (
              <button onClick={submitRoute} className='btn btn-primary'>Create</button>
            )}
          </div>

        </FormContainer>
      )}

    </ProfessorLayout>

  )
}

export default DefaultGrades
