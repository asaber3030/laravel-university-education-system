import '@/assets/css/students/global-students.scss'
import './assignments.scss'

import React, { useEffect, useState } from "react";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Btn from "@/components/Btn";
import NotFoundAlert from "@/components/NotFoundAlert";
import formatDate from "@/helpers/functions/format-date";

import { faEye, faPaperPlane, faSearch, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { SelectBox } from "@/components/Form/FormContainer";

const ListAssignments = () => {

  const { appURL, user, assignments, all_assignments } = usePage().props

  const [sub, setSub] = useState(null)
  const [data, setData] = useState(all_assignments)

  const applySearch = () => {
    Inertia.get(route('students.assignments.view.subject', sub))
  }

  useEffect(() => {
    if (sub) {
      setData(all_assignments.filter(q => q.subject.id == sub))
    }
  }, [sub])

  return (

    <StudentLayout user={user}>

      <div className="list-assignments-all">

        <Head
          title='My Assignments'
        />

        <PageHeader
          pageTitle={'Assignments'}
          pageIcon={faTasks}
        />

        <div className="list-content">

          <div className="list-assignments">
            {assignments.map(subject => (
              <Link href={route('students.assignments.view.subject', subject.id)}>
                <img src={appURL + subject.icon} alt=""/>
                <span>{subject.title}</span>
                <span className='gray-span'>{subject.assignments.length} assignment{subject.assignments.length > 1 ? 's' : ''}</span>
              </Link>
            ))}
          </div>

          <div className="filter-quizzes">
            <h6 style={{ fontSize: 17 }}>Assignments</h6>
            <div className='search-handler'>
              <SelectBox
                items={assignments.map(s => {
                  return { text: `${s.title} (${s.code})`, value: s.id }
                })}
                handleChange={ e => setSub(e.target.value) }
              />
              <Btn disabled={sub ? false : true } handleClick={applySearch}><FontAwesomeIcon icon={faSearch} /></Btn>
            </div>

          </div>

          {data.length > 0 ? (
            <div className="table-assignments">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Professor</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Answered</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Can Update?</th>
                    <th scope="col">Can Send?</th>
                    <th scope="col">Warnings?</th>
                    <th scope="col">Created in</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {data.map(ass => (
                  <tr>
                    <th scope="row">{ass.id}</th>
                    <td>{ass.code}</td>
                    <td><Link>{ass.professor.username}</Link></td>
                    <td><Link href={route('students.subjects.view', ass.subject.id)}>{ass.subject.title}</Link></td>
                    <td>{ass.answers.length == 1 ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</td>
                    <td>{ass.grades.length == 1 ? <span className="text-success">{ass.grades[0].grade} mark(s)</span> : <span className="text-warning">No</span>}</td>
                    <td>{ass.allow_update ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</td>
                    <td>{ass.accept_answer ? <span className="text-success">Yes</span> : <span className="text-warning">No</span>}</td>
                    <td>{ass.warnings.length > 0 ? <Link href={route('students.assignments.view', [ass.id, ass.code])}>{ass.warnings.length} warning(s)</Link> : <span className='text-dark'>No warnings</span>}</td>
                    <td>{formatDate(ass.created_at)}</td>
                    <td>
                      <div className="table-actions">
                        {!ass.answers[0] && (
                          <Tooltip title='Send Answer'>
                            <Link href={route('students.assignments.answer', [ass.id, ass.code])} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPaperPlane} /></Link>
                          </Tooltip>
                        )}
                        <Tooltip title='View'>
                          <Link href={route('students.assignments.view', [ass.id, ass.code])} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faEye} /></Link>
                        </Tooltip>
                      </div>
                    </td>

                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NotFoundAlert text='No assignments used for selected subject!' />
          )}
        </div>
      </div>

    </StudentLayout>
  )
}

export default ListAssignments
