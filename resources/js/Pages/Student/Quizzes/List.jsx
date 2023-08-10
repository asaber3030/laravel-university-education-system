import React, {useEffect, useState} from "react";

import '@/assets/css/students/global-students.scss'
import './quizzes.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { SelectBox } from "@/components/Form/FormContainer";
import {faEye, faPlay, faQuestionCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import { fullDateOptions } from "@/helpers/constants";
import { QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import NotFoundAlert from "@/components/NotFoundAlert";
import Btn from "@/components/Btn";
import {Inertia} from "@inertiajs/inertia";

const ListQuizzes = () => {

  const { appURL, user, quizzes, subjects } = usePage().props

  const [data, setData] = useState(quizzes)
  const [sub, setSub] = useState(null)

  const applySearch = () => {
    Inertia.get(route('students.quizzes.view.subject', sub))
  }

  useEffect(() => {
    if (sub) {
      setData(quizzes.filter(q => q.subject.id == sub))
    }
  }, [sub])

  return (
    <StudentLayout user={user}>

      <Head
        title='Quizzes'
      />

      <PageHeader
        pageTitle={'Quizzes'}
        pageIcon={faQuestionCircle}
        pageRightComponent={<span className='text-dark fw-bold'>{user.year.title} / {user.year.term_name}</span>}
      />

      <div className="list-quizzes">
        {subjects.map(subject => (
          <Link href={route('students.quizzes.view.subject', subject.id)}>
            <img src={appURL + subject.icon} alt=""/>
            <span>
              <span>{subject.title}</span>
              <span className='gray-span'>{subject.quizzes.length} quiz{subject.quizzes.length > 1 ? 'zes' : ''}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="list-quizzes-tbl">
        <div className="filter-quizzes">
          <h6 style={{ fontSize: 17 }}>All Quizzes</h6>
          <div className='search-handler'>
            <SelectBox
              items={subjects.map(s => {
                return { text: `${s.title} (${s.code})`, value: s.id }
              })}
              handleChange={ e => setSub(e.target.value) }
            />
            <Btn disabled={sub ? false : true } handleClick={applySearch}><FontAwesomeIcon icon={faSearch} /></Btn>
          </div>

        </div>
        {data.length > 0 ? (
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
            {data.map(quiz => {

              const startDate =  new Date(quiz.start)
              const minutes = quiz.minutes + startDate.getMinutes()

              startDate.setMinutes(minutes)

              const now = new Date()

              return (
                <tr key={quiz.id}>
                  <td><Link href={route('students.subjects.view', quiz.subject.id)}>{quiz.subject.title}</Link></td>
                  {quiz.status == 0 && (
                    <td className='text-danger'>{QUIZ_STATUS_OBJECT[quiz.status]}</td>
                  )}
                  {(quiz.status == 1 || quiz.status == 2) && (
                    <td className='text-success'>{QUIZ_STATUS_OBJECT[quiz.status]}</td>
                  )}
                  <td>{quiz.grade} mark(s)</td>
                  <td>{formatDate(quiz.start, fullDateOptions)}</td>
                  <td>{formatDate(quiz.end, fullDateOptions)}</td>
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
        ) : (
          <NotFoundAlert text='No quizzes for this selected subject!' />
        )}
      </div>

    </StudentLayout>
  )
}

export default ListQuizzes
