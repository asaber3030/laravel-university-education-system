import './create-quiz.scss'
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faEdit,
  faEye,
  faGraduationCap,
  faPlus,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";

import { Tooltip } from "@mui/material";

import chooseImage from '@/assets/images/choose.svg'
import questionImage from '@/assets/images/question.svg'
import previewImage from '@/assets/images/view.svg'
import studyImage from '@/assets/images/study.svg'
import generateArray from "@/helpers/functions/generate-array";
import Loading from "@/components/Loading/Loading";

const CreateQuiz = () => {

  const { years, subjects } = usePage().props

  const [activeStep, setActiveStep] = useState(1);
  const [activatedYear, setActivatedYear] = useState(null)

  const { post, errors, data, setData, processing } = useForm({
    title: '',
    information: '',
    subject: '',
    year: '',
    start: '',
    end: '',
    grade: '',
    time: '',
    numberOfQuestions: 1,
    numberOfMcq: 1
  })

  const createQuizSubmit = () => {
    post(route('professors.quiz.create'))
    console.log(errors)
  }

  return (
    <ProfessorLayout>

      <Head title='Create new quiz!' />

      <Loading load={processing} />

      <ProfessorLayoutHeader icon={faPlus} title={`Creating New Quiz!`}></ProfessorLayoutHeader>

      <div className="create-quiz-container">

        <div className="creation-steps">

          <div onClick={ () => setActiveStep(1) } className={`step ${activeStep == 1 ? 'active-step' : ''}`}>
            <img src={chooseImage} alt="Choose" />
            <h6>Choosing Quiz Data</h6>
          </div>

          <div onClick={ () => setActiveStep(2) } className={`step ${activeStep == 2 ? 'active-step' : ''}`}>
            <img src={studyImage} alt="Choose" />
            <h6>Choose Semster & Subject</h6>
          </div>

        </div>

        <div className="steps-view">

          {activeStep == 1 && (

            <div className="step-1-container step-container">

              <h6 className='default-title'>Quiz Details & Information</h6>

              <FormContainer>

                <InputField
                  label='Quiz Title'
                  handleChange={ e => setData('title', e.target.value) }
                  value={data.title}
                  error={errors.title}
                />

                <InputField
                  label='Quiz Grade'
                  handleChange={ e => setData('grade', e.target.value) }
                  value={data.grade}
                  error={errors.grade}
                />

                <InputField
                  label='Number of Questions'
                  handleChange={ e => setData('numberOfQuestions', e.target.value > 0 && e.target.value < 100 ? e.target.value : 1) }
                  value={data.numberOfQuestions}
                  error={errors.numberOfQuestions}
                />

                <InputField
                  label='Number of MCQs / Question'
                  handleChange={ e => setData('numberOfMcq', e.target.value > 0 && e.target.value < 100 ? e.target.value : 1) }
                  value={data.numberOfMcq}
                  error={errors.numberOfMcq}
                />

                <TextArea
                  label='Quiz Details'
                  handleChange={ e => setData('information', e.target.value) }
                  value={data.information}
                  error={errors.information}
                />

                <div className="group-form">
                  <InputField
                    label='Start'
                    type={'datetime-local'}
                    handleChange={ e => setData('start', e.target.value) }
                    value={data.start}
                    error={errors.start}
                  />
                  <InputField
                    label='End'
                    type={'datetime-local'}
                    handleChange={ e => setData('end', e.target.value) }
                    value={data.end}
                    error={errors.end}
                  />
                  <InputField
                    label='Time (in minutes) Ex: 60 means 1 hr'
                    handleChange={ e => setData('time', e.target.value) }
                    value={data.time}
                    error={errors.time}
                  />
                </div>

                <div className="form-group">
                  <button onClick={ () => setActiveStep(2) } className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faArrowRight} /> Next Step: <b>Choose Semester</b></button>
                </div>

              </FormContainer>

            </div>
          )}

          {activeStep == 2 && (
            <div className="step-2-container step-container">

              <h6 className="default-title">Choose Semester & Subject!</h6>

              <FormContainer>

                <SelectBox
                  items={years.map(y => {
                    return { text: y.title + ' - ' + y.term_name, value: y.id }
                  })}
                  label='Semester'
                  handleChange={ e => {
                    setData('year', e.target.value)
                    setActivatedYear(years.find(year => year.id == e.target.value))
                  }}
                />

                {activatedYear && (
                  <SelectBox
                    items={subjects.filter(sub => sub.department == activatedYear.department).map(s => {
                      return { text: s.title + ' - View: ' + s.code, value: s.id }
                    })}
                    label='Subject'
                    handleChange={ e => setData('subject', e.target.value) }
                  />
                )}

                <div className="form-group">
                  {data.subject && activatedYear ? (
                    <button onClick={ createQuizSubmit } className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faArrowRight} /> Next Step: <b>Questions Builder</b></button>
                  ) : (
                    <div className="alert alert-sm alert-primary">There's no subject for selected year!</div>
                  )}
                </div>

              </FormContainer>

            </div>
          )}

        </div>

      </div>

    </ProfessorLayout>
  )
}



export default CreateQuiz
