import React, {useState} from "react";

import '@/assets/css/students/global-students.scss'
import './semesters.scss'
import '../Subjects/subjects.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import {
  faBook, faDownload, faEllipsisH,
  faEye,
  faIdBadge, faList, faPercentage, faPlay, faQuestion, faTableCells, faTasks,
} from "@fortawesome/free-solid-svg-icons";
import log from "@/helpers/functions/log";
import formatDate from "@/helpers/functions/format-date";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@mui/material";

const SemesterStudyingContent = () => {

  const { appURL, user, semester } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title={`Semseter content - ${semester.year.title} / ${semester.year.term_name}`} />

      <PageHeader
        pageTitle={<span>Semester: <b>{semester.year.title} - {semester.year.term_name}</b> - Study Content</span>}
        pageIcon={faIdBadge}
      />

      <div className="view-semester-studying-content">
        <div className="subjects-container">
          {semester.year.courses.map(course => (
            <div className="subject">
              <div className="header">
                <Link href={route('students.subjects.view', [course.subject.id])}>{course.subject.title}</Link>
                <span>{course.subject.code}</span>
              </div>
              <div className="content list-items">
                <ul>
                  <li><span>Chapters</span> <span>{course.subject.chapters.length} chapter(s)</span></li>
                  <li><span>ID</span> <span>#{course.subject.id}</span></li>
                  <li><span>Reference</span> <span><a href={appURL + course.subject.reference} download><FontAwesomeIcon icon={faDownload} /> Download</a></span></li>
                  <li><span>Added</span> <span>{formatDate(course.subject.created_at)}</span></li>
                  <li><span>Last update</span> <span>{formatDate(course.subject.updated_at)}</span></li>
                </ul>
              </div>
              <div className="actions">
                <Tooltip title='Content'><Link href={route('students.subjects.view', course.subject.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faBook} /></Link></Tooltip>
                <Tooltip title='Course'><Link href={route('students.subjects.view.course', course.subject.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faPlay} /></Link></Tooltip>
                <Tooltip title='Assignments'><Link href={route('students.assignments.view.subject', [course.subject.id])} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faTasks} /></Link></Tooltip>
                <Tooltip title='Quizzes'><Link href={route('students.quizzes.view.subject', course.subject.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faQuestion} /></Link></Tooltip>
                <Tooltip title='Download Content'><Link className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faDownload} /></Link></Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>

    </StudentLayout>
  )
}

export default SemesterStudyingContent
