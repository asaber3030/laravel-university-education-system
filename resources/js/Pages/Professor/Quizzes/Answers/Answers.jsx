import './answers.scss'

import { Head, useForm, usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import Loading from "@/components/Loading/Loading";

import { FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faEye, faPercentage, faTimes} from "@fortawesome/free-solid-svg-icons";

import {QUIZ_STATUS_ARRAY, QUIZ_STATUS_OBJECT} from "@/helpers/constants";
import {Tooltip} from "@mui/material";
import formatDate from "@/helpers/functions/format-date";

const Answers = () => {

  const { quiz, studentsWithAnswers } = usePage().props

  console.log(studentsWithAnswers)

  return (
    <ProfessorLayout>

      <Head title={`Answers - Quiz - #${quiz.id}`} />

      <ProfessorLayoutHeader icon={faPercentage} title={`Answers of Quiz - #${quiz.id}`}></ProfessorLayoutHeader>

      <div className="quiz-all-answers mt-3">

        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Username</th>
              <th>No. of Correct</th>
              <th>No. of Wrong</th>
              <th>Total Marks</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {studentsWithAnswers.map(student => {
            const countCorrect = student.quizzes_answers.filter(qu => qu.question.answer == qu.answer.title)
            const countWrong = student.quizzes_answers.filter(qu => qu.question.answer != qu.answer.title)
            let sumMarks = 0
            student.quizzes_answers.forEach(item => {
              sumMarks += item.grade;
            })
            return (
              <>
                {student.quizzes_answers.length > 0 && (
                  <tr>
                    <th><Link href={route('professors.students.view', student.id)}>{student.username}</Link></th>
                    <th className='text-success'><FontAwesomeIcon icon={faCheck} /> {countCorrect.length} Correct</th>
                    <th className='text-danger'><FontAwesomeIcon icon={faTimes} /> {countWrong.length} Wrong</th>
                    <th className='text-success'>{sumMarks} marks</th>
                    <th className='actions-th'>
                      <Tooltip title='View Student Answers'>
                        <Link href={route('professors.quiz.answers.student', [quiz.id, student.id])} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEye} /></Link>
                      </Tooltip>
                      <Tooltip title='Add Grade to Semester'>
                        <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPercentage} /></Link>
                      </Tooltip>
                    </th>
                  </tr>
                )}
              </>
            )
          })}
          </tbody>
        </table>

        <div className="quiz-details">

          <div className="quiz-right-details">
            <h6 className='default-title'>Quiz Details</h6>
            <div className="list-items">
              <ul>
                <li><span>Quiz Reference ID: </span> <span><Link href={route('professors.quiz.view', quiz.id)}>#{quiz.id}</Link></span></li>
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
          </div>

          <div className="quiz-left-details">
            <h6 className='default-title'>Subject Details</h6>
            <div className="quiz-subject-details">
              <h6>{quiz.subject.title} - <Link href={route('professors.subjects.chapters', quiz.subject.id)}>{quiz.subject.code}</Link></h6>
              {quiz.subject.chapters.length > 0 && (
                <ul>
                  {quiz.subject.chapters.map(ch => (
                    <li>Ch.{ch.number} - <b>{ch.name}</b></li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default Answers
