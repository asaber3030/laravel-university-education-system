import React, { useState } from "react";

import '@/assets/css/students/global-students.scss'
import './quizzes.scss'

import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Modal from 'react-bootstrap/Modal';

import { faCheck, faClose, faEye, faPlay, faQuestion, faSave, faSign } from "@fortawesome/free-solid-svg-icons";
import { QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fullDateOptions } from "@/helpers/constants";

import formatDate from "@/helpers/functions/format-date";
import log from "@/helpers/functions/log";


const ViewAnswers = () => {

  const { appURL, user, answers, quiz } = usePage().props

  const [detailsModal, setDetailsModal] = useState(false)
  const handleClose = () => setDetailsModal(false)
  const handleOpen = () => setDetailsModal(true)

  const countCorrect = answers.filter(ans => ans.grade > 0).length
  const countWrong = answers.filter(ans => ans.grade == 0).length
  function add(accumulator, a) {
    return accumulator.grade + a;
  }

  const getArrayOfCorrect = answers.map(ans => ans.grade)
  const countMarks = getArrayOfCorrect.reduce((a, b) => a + b, 0)

  return (
    <StudentLayout user={user}>

      <Head title={`Answers of Quiz`} />

      <PageHeader
        pageTitle={<span>Quiz: <b>{quiz.title} ({ quiz.code })</b> - Subject: <Link href={route('students.subjects.view', quiz.subject.id)}><b>{quiz.subject.title}</b></Link></span>}
        pageIcon={faQuestion}
        pageRightComponent={<button onClick={handleOpen} className='btn btn-sm btn-dark'>Show Details</button>}
      />

      <div className="view-quiz-answers ">

        <Modal show={detailsModal} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Quiz Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="quiz-details-modal-body">
              <div className="list-items">
                <ul>
                  <li><span>Department: </span> <span>{user.department.title}</span></li>
                  <li><span>Semester: </span> <span>{user.year.title}</span></li>
                  <li><span>Term: </span> <span>{user.year.term_name}</span></li>
                  <li><span>Quiz created by: </span> <span><Link>{quiz.professor.title + '. ' + quiz.professor.name}</Link></span></li>
                  <li><span>Quiz Code: </span> <span>{quiz.code}</span></li>
                  <li><span>Subject: </span> <span><Link><Link href={route('students.subjects.view', quiz.subject.id)}>{quiz.subject.title} ({quiz.subject.code})</Link></Link></span></li>
                  <li><span>Started: </span> <span>{formatDate(quiz.start, fullDateOptions)}</span></li>
                  <li><span>Finished: </span> <span>{formatDate(quiz.end, fullDateOptions)}</span></li>
                  <hr/>
                  <li><span>Total Questions:</span> <span>{quiz.questions_count} question(s)</span></li>
                  <li><span>My Correct Answers:</span> <span className='text-success'>{countCorrect} question(s)</span></li>
                  <li><span>My Wrong Answers:</span> <span className='text-danger'>{countWrong} question(s)</span></li>
                  <li><span>Total Marks:</span> <span className={`${countMarks == 0 ? 'text-danger' : 'text-success'}`}>{countMarks} mark(s)</span></li>
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faSign} /> Report a problem</button>
            <button onClick={handleClose} className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faClose} /> Close</button>
          </Modal.Footer>
        </Modal>

        {answers.length > 0 ? (

          <div className="quiz-questions">

            {answers.map((answer, idx) =>  (

              <div className="question">

                <div className="question-header">
                  <h6 className='question-title'><b>Q{idx + 1}.</b> {answer.question.title} - <span className='marked-value'>{answer.grade} mark(s)</span></h6>
                  {answer.question.image && (
                    <img src={appURL + answer.question.image} alt=""/>
                  )}
                </div>

                <div className="question-mcq">
                  {answer.question.mcq.map((m) => {
                    return (
                      <label className={`mcq ${m.title == answer.question.answer ? 'correct-mcq' : 'false-mcq'}`} htmlFor={`chk-id-${m.id}`}>
                        {m.title == answer.answer.title && ( <span><FontAwesomeIcon icon={faCheck} /> Choosed: </span> )}
                        <span>{m.title}</span>
                      </label>
                    )
                  })}
                </div>

              </div>

            ))}

            <Link href={route('students.quizzes.list')} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faSave} /> Save answers!</Link>

          </div>

        ) : (
          <div className="alert alert-sm alert-warning">You don't have answers to this quiz!</div>
        )}


      </div>

    </StudentLayout>
  )
}

export default ViewAnswers
