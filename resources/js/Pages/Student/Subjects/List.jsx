import { Head, Link, usePage } from "@inertiajs/inertia-react";

import '@/assets/css/students/global-students.scss'
import './subjects.scss'

import React from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import {
  faBook,
  faDownload,
  faFlag,
  faHandsHelping,
  faPlay,
  faQuestion,
  faTasks
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

const ListSubjects = () => {

  const { appURL, user, subjects } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='Subjects' />

      <PageHeader
        pageTitle='Subjects'
        pageIcon={faBook}
        pageRightComponent={<span className='text-dark'>{user.year.title} - {user.year.term_name} / <span className="text-success">{subjects.length} subjects</span></span>}
      />

      <div className="subjects-container">
        {subjects.map(sub => (
          <div className="subject" key={sub.id}>
            <div className="header">
              <Link href={route('students.subjects.view', [sub.id])}>{sub.title}</Link>
              <span>{sub.code}</span>
            </div>
            <div className="content list-items">
              <ul>
                <li><span>Chapters</span> <span>{sub.chapters.length} chapter(s)</span></li>
                <li><span>ID</span> <span>#{sub.id}</span></li>
                <li><span>Reference</span> <span><a href={appURL + sub.reference} download><FontAwesomeIcon icon={faDownload} /> Download</a></span></li>
                <li><span>Added</span> <span>{formatDate(sub.created_at)}</span></li>
                <li><span>Last update</span> <span>{formatDate(sub.updated_at)}</span></li>
              </ul>
            </div>
            <div className="actions">
              <Tooltip title='Content'><Link href={route('students.subjects.view', sub.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faBook} /></Link></Tooltip>
              <Tooltip title='Course'><Link href={route('students.subjects.view.course', sub.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faPlay} /></Link></Tooltip>
              <Tooltip title='Assignments'><Link href={route('students.assignments.view.subject', [sub.id])} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faTasks} /></Link></Tooltip>
              <Tooltip title='Quizzes'><Link href={route('students.quizzes.view.subject', sub.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faQuestion} /></Link></Tooltip>
              <Tooltip title='Student Summaries'><Link href={route('students.subjects.view.summaries', sub.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faHandsHelping} /></Link></Tooltip>
            </div>
          </div>
        ))}
      </div>

    </StudentLayout>
  )

}

export default ListSubjects
