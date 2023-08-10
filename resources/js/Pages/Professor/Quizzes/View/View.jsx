import './view-quiz.scss'
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";

import { Tooltip } from "@mui/material";

import questionImage from '@/assets/images/question.svg'
import previewImage from '@/assets/images/view.svg'
import answerImage from '@/assets/images/answer.svg'

import { QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import {FileInput} from "@/components/Form/FormContainer";

const View = () => {

  const { quiz, appURL } = usePage().props

  const [activeTab, setActiveTab] = useState(1)

  return (
    <ProfessorLayout>

      <Head title={`Quiz - ${quiz.title}`} />

      <ProfessorLayoutHeader icon={faEye} title={`Quiz - ${quiz.title}`}>
        <Link href={route('professors.quiz.create.question', quiz.id)} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faPlus} /> Create New Question</Link>
        <Link href={route('professors.quiz.update', quiz.id)} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faEdit} /> Update Quiz</Link>
      </ProfessorLayoutHeader>

      <div className="view-quiz-container">

        <div className="quiz-details">

          <div className="tabs">

            <div className={`tab ${activeTab == 1 && 'active-tab'}`} onClick={ () => setActiveTab(1) }>
              <img src={questionImage} alt=""/>
              <h6>Question Builder!</h6>
            </div>

            <div className={`tab ${activeTab == 2 && 'active-tab'}`} onClick={ () => setActiveTab(2) }>
              <img src={previewImage} alt=""/>
              <h6>Preview</h6>
            </div>

            <Link href={route('professors.quiz.answers', quiz.id)} className={`tab`}>
              <img src={answerImage} alt=""/>
              <h6>Answers</h6>
            </Link>

          </div>

          {activeTab == 1 && (
            <div className="questions">

              {quiz.questions.map((question, idx) => (
                <div key={idx + 1} className={`question ${question.title == 'N/A' && 'title-not-set'}`}>
                  <div className="question-header">
                    {question.title != 'N/A' && (
                      <h6 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link style={{ fontSize: '15px' }} className='truncate-200' href={route('professors.quiz.update.question', question.id)}><b>Q{idx + 1}.</b> {question.title}</Link>
                        <span style={{ fontSize: '14px' }}>Click to update</span>
                      </h6>
                    )}

                    {question.image && (
                      <img style={{ width: '200px', height: '200px', margin: '10px 0' }} src={appURL + question.image} />
                    )}

                    <input
                      type="text"
                      placeholder='New Question Title'
                      className="form-control form-control-sm"
                      onKeyUp={ e => e.target.value != '' ? Inertia.post(route('professors.quiz.question.change-title', question.id), { 'title': e.target.value }) : console.log('hhj') }
                      onSubmit={ e => e.target.value != '' ? Inertia.post(route('professors.quiz.question.change-title', question.id), { 'title': e.target.value }) : console.log('hhj') }
                    />

                  </div>
                  <div className="question-content">
                    <div className="mcq-all">
                      {question.mcq.map(m => (
                        <div className={`mcq ${m.is_correct && 'mcq-correct'}`}>
                          <div className="left-mcq">
                            {m.title != 'N/A' && (
                              <h6 style={{ fontSize: '14px', marginBottom: '5px' }}>Current Value: <b>{m.title}</b></h6>
                            )}
                            <input
                              type="text" className="form-control form-control-sm"
                              placeholder='New MCQ Value'
                              onKeyUp={ e => e.target.value != '' ? Inertia.post(route('professors.quiz.mcq.change-title', m.id), { 'mcq_title': e.target.value }) : console.log('hhj') }
                              onSubmit={ e => e.target.value != '' ? Inertia.post(route('professors.quiz.mcq.change-title', m.id), { 'mcq_title': e.target.value }) : console.log('hhj') }
                            />
                          </div>
                          <div className="right-mcq">
                            {!m.is_correct && (
                              <Tooltip title='Make The Correct Value'>
                                <button onClick={ () => Inertia.post(route('professors.quiz.mcq.make-correct', m.id)) } className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faCheck} /></button>
                              </Tooltip>
                            )}
                            <Tooltip title='Delete Question MCQ'>
                              <button onClick={ () => Inertia.post(route('professors.quiz.delete.mcq', m.id)) } className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}


            </div>
          )}

          {activeTab == 2 && (
            <div className="preview-full-quiz">
              <div className="preview-header">
                <h6 className={'preview-title'}>{quiz.title}</h6>
                <span>{quiz.grade} mark(s)</span>
              </div>

              <div className="preview-questions">

                {quiz.questions.map((question, idx) => (
                  <div className="preview-question" key={idx}>
                    <div className="preview-question-header">
                      <div className="left-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link className='truncate-500' href={route('professors.quiz.update.question', question.id)}><span>Question {idx + 1}:</span> {question.title}</Link>
                        <button className='truncate-500 red-c' style={{ fontSize: '12px' }} onClick={ () => Inertia.post(route('professors.quiz.delete.question', question.id)) }><FontAwesomeIcon icon={faTrash} /> Delete</button>
                      </div>

                      {question.mcq.length > 0 ? (
                        <div className="preview-question-mcq">
                          <ul>
                            {question.mcq.map(mc => (
                              <li htmlFor={`mcq_id_${mc.id}`} className={`${mc.is_correct && 'correct-li'}`}>
                                <input className="form-check-input" type="radio" name={`question_id_${question.id}`} id={`mcq_id_${mc.id}`} />
                                <label htmlFor={`mcq_id_${mc.id}`}>{mc.title}</label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="alert alert-sm alert-warning">This question <b>{question.title}</b> doesn't have many mcq options!</div>
                      )}

                    </div>

                    {question.image != null && (
                      <div className="preview-image">
                        <img src={appURL + question.image} alt=""/>
                      </div>
                    )}

                  </div>
                ))}

              </div>
            </div>
          )}

        </div>

        <div className="subject-details">
          <h6 className="default-title">Quiz <Link className='truncate-300' href={route('professors.quiz.update', quiz.id)}>{quiz.title}</Link></h6>

          <div className="list-items">
            <h6 style={{ marginBottom: '9px' }} className='list-title'>Quiz Details</h6>
            <ul>
              <li><span>Quiz Reference ID: </span> <span>#{quiz.id}</span></li>
              <li><span>Quiz Status: </span> <span className='truncate-200'>{QUIZ_STATUS_OBJECT[quiz.status]}</span></li>
              <li><span>Quiz Time (minutes)</span> <span>{quiz.minutes} min(s)</span></li>
              <li><span>Start</span> <span>{formatDate(quiz.start, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}</span></li>
              <li><span>End</span> <span>{formatDate(quiz.end, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}</span></li>
              <li><span>Quiz Created in</span> <span>{formatDate(quiz.created_at)}</span></li>
              <li><span>Last Update</span> <span>{formatDate(quiz.updated_at)}</span></li>
            </ul>
          </div>

          <div className="list-items">
            <h6 style={{ marginBottom: '9px' }} className='list-title'>Course Details</h6>
            <ul>
              <li><span>Subject</span> <span><Link href={route('professors.subjects.chapters', quiz.subject.id)}>{quiz.subject.title}</Link></span></li>
              <li><span>Subject Code</span> <span>{quiz.subject.code}</span></li>
              <li><span>Department</span> <span>{quiz.subject.department.title}</span></li>
              <li><span>Created</span> <span>{formatDate(quiz.subject.created_at)}</span></li>
              <li><span>Last Update</span> <span>{formatDate(quiz.subject.updated_at)}</span></li>
            </ul>
          </div>

          {quiz.subject.chapters.length > 0 && (
            <div className="list-items">
              <h6 style={{ marginBottom: '9px' }} className='list-title'>Subject Chapters</h6>
              <ul>
                {quiz.subject.chapters.map(ch => (
                  <li className='chapter-li'><Link href={route('professors.subjects.update.chapter', [ch.subject, ch.id])}>{ch.name}</Link></li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default View
