import {Head, Link, usePage} from "@inertiajs/inertia-react";
import React, {useEffect, useState} from "react";

import '@/assets/css/students/global-students.scss'
import './assignments.scss'

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import { faEye, faPaperPlane, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import { SelectBox } from "@/components/Form/FormContainer";
import NotFoundAlert from "@/components/NotFoundAlert";

const ViewSubjectAssignments = () => {

  const { user, assignments, subject } = usePage().props

  const [data, setData] = useState(assignments)
  const [filter, setFilter] = useState(2)

  console.log(filter)

  useEffect(() => {
    if (filter == 1) {
      setData(assignments.filter(a => a.answers.length == 1))
    } else if (filter == 0) {
      setData(assignments.filter(a => a.answers.length != 1))
    } else if (filter == 2) {
      setData(assignments)
    }

    console.log(data)
  }, [filter])

  return (
    <StudentLayout user={user}>

      <Head
        title={`${subject.title} - Assignments`}
      />

      <div className="view-subject-assignments">
        <PageHeader
          pageTitle={<span>Subject: <Link href={route('students.subjects.view', subject.id)}><b>{subject.title}</b></Link> - Assignments</span>}
          pageIcon={faTasks}
          pageRightComponent={<span className='text-dark'>{user.year.title} / {user.year.term_name}</span>}
        />

        <div className="assignments-table">
          {data.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="alert alert-sm alert-primary">No Assignments!</div>
          )}
          <div style={{ width: 'fit-content' }}>
            <SelectBox
              labelRequired={false}
              label='Select'
              items={[
                { text: 'Both', value: 2 },
                { text: 'Answered', value: 1 },
                { text: 'Not Answered', value: 0 },
              ]}
              handleChange={ e => setFilter(e.target.value) }
            />
          </div>

        </div>

      </div>

    </StudentLayout>
  )
}

export default ViewSubjectAssignments
