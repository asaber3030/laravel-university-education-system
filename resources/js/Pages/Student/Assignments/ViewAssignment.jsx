import { Link, Head, usePage } from "@inertiajs/inertia-react";
import React from "react";

import '@/assets/css/students/global-students.scss'
import './assignments.scss'

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import {
  faBook,
  faCheck, faClock,
  faCode, faCog, faDownload,
  faLink,
  faPaperPlane,
  faSyncAlt,
  faTasks,
  faUser, faUserClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewAssignment = () => {

  const { appURL, user, assignment, answer, grade, warnings } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head
        title={`Assignment - ${assignment.code}`}
      />

      <div className="view-assignment">
        <PageHeader
          pageTitle={<span>Assignment: <b>{assignment.code}</b> - Subject: <b>{assignment.subject.title}</b></span>}
          pageIcon={faTasks}
        />

        <div className="assignment-details">

          <div className="details-header">

            <h6>{assignment.title}</h6>
            <p>{assignment.information}</p>

            {warnings.length > 0 && (
              <div className="warnings">
                <h6>Warnings</h6>
                {warnings.map(w => (
                  <div className="alert alert-warning alert-sm" key={w.id}>
                    <p className={'text-dark'}>
                      {w.reason}
                    </p>
                    <span><FontAwesomeIcon icon={faClock} /> {formatDate(w.created_at)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="actions">

              {assignment.accept_answer && answer.length == 0 && (
                <Link href={route('students.assignments.answer', [assignment.id, assignment.code])} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faPaperPlane} /> Send Answer</Link>
              )}

              {assignment.allow_update && answer[0] != null && (
                <>
                  <Link className='btn btn-sm btn-secondary' href={route('students.assignments.answer.update', [assignment.id, assignment.code])}>
                    <FontAwesomeIcon icon={faCog} /> Update Answer
                  </Link>
                  <a download href={appURL + answer[0].file} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faDownload} /> My Answer</a>
                </>
              )}

              {assignment.file && (
                <a download href={appURL + assignment.file} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faDownload} /> Download Assignment</a>
              )}
              {assignment.link && (
                <a target='_blank' href={assignment.link} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faLink} /> Link</a>
              )}
            </div>
          </div>

          <div className="list-cols">
            <div><FontAwesomeIcon icon={faUser}/> Answered?: <span>{answer[0] ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</span></div>
            <div><FontAwesomeIcon icon={faUser}/> Grade Assigned?: <span>{grade[0] ? <span className="text-success">{grade[0].grade} mark(s)</span> : <span className="text-warning">No</span>}</span></div>
            <div><FontAwesomeIcon icon={faUser}/> Sent By: <Link>{assignment.professor.username}</Link></div>
            <div><FontAwesomeIcon icon={faBook}/> Subject: <Link href={route('students.subjects.view', assignment.subject.id)}>{assignment.subject.title}</Link></div>
            <div><FontAwesomeIcon icon={faCode}/> Assignment Code: <span>{assignment.code}</span></div>
            <div><FontAwesomeIcon icon={faSyncAlt}/> Can be updated?: <span>{assignment.allow_update ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</span></div>
            <div><FontAwesomeIcon icon={faCheck}/> Still Accepts answers? {assignment.accept_answer ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</div>
            <div><FontAwesomeIcon icon={faUserClock}/> Deadline: <span>{formatDate(assignment.deadline)}</span></div>
            <div><FontAwesomeIcon icon={faClock}/> Added in: <span>{formatDate(assignment.created_at)}</span></div>
            <div><FontAwesomeIcon icon={faClock}/> Last Update: <span>{formatDate(assignment.updated_at)}</span></div>
          </div>
        </div>

      </div>

    </StudentLayout>
  )
}

export default ViewAssignment
