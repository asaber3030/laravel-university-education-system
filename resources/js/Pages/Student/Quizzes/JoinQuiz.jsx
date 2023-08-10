import React, {useEffect, useState} from "react";

import '@/assets/css/students/global-students.scss'
import './quizzes.scss'

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";
import upsert from "@/helpers/functions/upsert";

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import {
  faEye,
  faPaperPlane,
  faPlay,
  faQuestion,
  faQuestionCircle,
  faSave,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import { fullDateOptions } from "@/helpers/constants";
import { Inertia } from "@inertiajs/inertia";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListQuizzes = () => {

  const { appURL, user, quiz, quiz_answers } = usePage().props

  const finalDate = new Date(quiz.end)

  useEffect(() => {
    console.log('1')
    if (new Date() >= new Date(quiz.end)) {
      Inertia.get(route('students.quizzes.list'))
    }
  }, [new Date()])

  return (
    <StudentLayout user={user}>

      <Head title={`Quiz: ${quiz.title} - Subject: ${quiz.subject.title}`} />

      <PageHeader
        pageTitle={
          <span>Quiz: <b>{quiz.title}</b> - Subject: <Link href={route('students.subjects.view', quiz.subject.id)}><b>{quiz.subject.title}</b></Link></span>
        }
        pageIcon={faQuestionCircle}
      />

      <div className="join-quiz-container">

        <div className="quiz-header">
          <div className="top">
            <div className="left">
              <h6>{quiz.title}</h6>
              <p>{quiz.information}</p>
            </div>
            <div className="right">
              <span>Starting: <b>{formatDate(quiz.start, fullDateOptions)}</b></span>
              <span>Finish: <b>{formatDate(finalDate, fullDateOptions)}</b></span>
              <span>Total: <b>{quiz.minutes} minute(s)</b></span>
            </div>
          </div>
          <div className="sections">
            <div className="section"><FontAwesomeIcon icon={faUser} /> Created By: <b>{quiz.professor.username}</b></div>
            <div className="section"><FontAwesomeIcon icon={faUser} /> Semester: <b>{quiz.year.title}</b></div>
            <div className="section"><FontAwesomeIcon icon={faUser} /> Term: <b>{quiz.year.term_name}</b></div>
            <div className="section"><FontAwesomeIcon icon={faUser} /> Code: <b>{quiz.code}</b></div>
            <div className="section"><FontAwesomeIcon icon={faUser} /> Grade: <b>{quiz.grade} mark(s)</b></div>
            <div className="section"><FontAwesomeIcon icon={faUser} /> Status: <b>{QUIZ_STATUS_OBJECT[quiz.status]}</b></div>
          </div>
        </div>

        <div className="quiz-questions">

          {quiz.questions.map((question, idx) => {

            return (

              <div className="question">

                <div className="question-header">
                  <h6 className='question-title'><b>Q{idx + 1}.</b> {question.title}</h6>
                  {question.image && (
                    <img src={appURL + question.image} alt=""/>
                  )}
                </div>

                <div className="question-mcq">

                  {question.mcq.map((m) => {

                    const [mcqAnswer, setMCQAnswer] = useState('')

                    const handleChangeMCQ = (e) => {

                      setMCQAnswer(e.target.value)

                      Inertia.post(route('students.quizzes.add.answer', {
                        questionID: question.id,
                        answer: m.id,
                        quiz: quiz.id,
                      }))

                    }

                    return (
                      <label className="mcq" htmlFor={`chk-id-${m.id}`}>
                        <input checked={m.student_answers.length > 0 ? m.student_answers[0].answer.title == m.title : ''} onChange={ handleChangeMCQ } name={`chk-id-${question.id + 1}`} className="form-check-input" type='radio' id={`chk-id-${m.id}`} key={m.id} />
                        <span>{m.title}</span>
                      </label>
                    )

                  })}

                </div>

              </div>

            )

          })}

          <Link href={route('students.quizzes.list')} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faSave} /> Save answers!</Link>

        </div>

      </div>

    </StudentLayout>
  )
}

export default ListQuizzes
