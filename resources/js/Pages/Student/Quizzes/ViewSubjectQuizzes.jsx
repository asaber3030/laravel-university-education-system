import React from "react";

import '@/assets/css/students/global-students.scss'
import './quizzes.scss'

import {Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import {faEye, faPlay, faQuestion, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {QUIZ_STATUS_OBJECT} from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";
import {Tooltip} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListQuizzes = () => {

  const { user, quizzes, subject } = usePage().props

  const dateOptions = {
    year: 'numeric',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }

  return (
    <StudentLayout user={user}>
      <Head title={`${subject.title} - Quizzes`} />

      <PageHeader
        pageTitle={<span>Quizzes - Subject: <Link href={route('students.subjects.view', subject.id)}><b>{subject.title} ({subject.code})</b></Link></span>}
        pageIcon={faQuestionCircle}
      />

      {quizzes.length > 0 ? (
        <div className="list-quizzes-tbl">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Quiz Grade</th>
                <th scope="col">Start</th>
                <th scope="col">End</th>
                <th scope="col">Minutes</th>
                <th scope="col">Created</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {quizzes.map(quiz => {

              const startDate =  new Date(quiz.start)
              const minutes = quiz.minutes + startDate.getMinutes()

              startDate.setMinutes(minutes)

              const now = new Date()

              return (
                <tr key={quiz.id}>
                  <td><Link href={route('students.subjects.view', quiz.subject.id)}>{quiz.subject.title}</Link></td>
                  <td>{QUIZ_STATUS_OBJECT[quiz.status]}</td>
                  <td>{quiz.grade} mark(s)</td>
                  <td>{formatDate(quiz.start, dateOptions)}</td>
                  <td>{formatDate(quiz.end, dateOptions)}</td>
                  <td>{quiz.minutes} minute(s)</td>
                  <td>{formatDate(quiz.created_at)}</td>
                  <td>
                    <div className="table-actions">
                      {new Date() <= new Date(quiz.end) && (
                        <Tooltip title='Join'>
                          <Link href={route('students.quizzes.join', quiz.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPlay} /></Link>
                        </Tooltip>
                      )}
                      <Tooltip title='View My Answers'>
                        <Link href={route('students.quizzes.view.answers', [quiz.id])} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEye} /></Link>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-sm alert-primary">No Quizzes found!</div>
      )}

    </StudentLayout>
  )
}

export default ListQuizzes
