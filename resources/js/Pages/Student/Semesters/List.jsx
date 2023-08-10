import '@/assets/css/students/global-students.scss'
import './semesters.scss'

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import { faBook, faIdBadge, faList, faPercentage, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

const FilterComponent = ({ setView, view }) => {
  return (
    <div className="header-view" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button onClick={ () => setView('table') } type="button" className={`btn btn-dark ${view == 'table' && 'active'}`}><FontAwesomeIcon icon={faTableCells} /> Table View</button>
        <button onClick={ () => setView('list') } type="button" className={`btn btn-dark ${view == 'list' && 'active'}`}><FontAwesomeIcon icon={faList} /> List View</button>
      </div>
    </div>
  )
}

const ListBadges = () => {

  const { appURL, user, semesters } = usePage().props

  const [view, setView] = useState('list')

  return (
    <StudentLayout user={user}>

      <Head title='Studying years' />

      <PageHeader
        pageTitle={'My Semesters'}
        pageIcon={faIdBadge}
        pageRightComponent={ <FilterComponent setView={setView} view={view} /> }
      />

      <div className="semesters-list-container">


        {view == 'table' && (
          <div className="table-view">
            <table className="table">
              <thead>
              <tr>
                <Tooltip followCursor title="If there's any problem make sure to use this ID"><th scope="col">Semester ID</th></Tooltip>
                <th scope="col">Semester</th>
                <th scope="col">Term</th>
                <th scope="col">Done?</th>
                <th scope="col">Started</th>
                <th scope="col">Finished</th>
                <th scope="col">Grade</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              {semesters.map(semester => {
                return (
                  <tr>
                    <th scope="row">{semester.id}</th>
                    <td>{semester.year.title}</td>
                    <td>{semester.year.term_name}</td>
                    <td>{semester.is_done == 1 ? 'Yes' : 'No'}</td>
                    <td>{formatDate(semester.started)}</td>
                    <td>{formatDate(semester.ended)}</td>
                    <td className='text-success'>{semester.grade}</td>
                    <td>
                      <div className="table-actions">
                        <Tooltip title='My Subject Grades'>
                          <Link href={route('students.semesters.view.semester.grades', semester.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPercentage} /></Link>
                        </Tooltip>
                        <Tooltip title='Studying Content'>
                          <Link href={route('students.semesters.view.semester.content', semester.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faBook} /></Link>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        )}

        {view == 'list' && (
          <div className="list-view">
            <div className="list-sems">
              {semesters.map(sem => (
                <div className="semester">
                  <div className="semester-header">
                    <h6>{sem.year.title}</h6>
                    <span>{sem.year.term_name}</span>
                  </div>
                  <div className="semester-content list-items">
                    <ul>
                      <li><span>My Marks: </span> <span className='text-success'>{sem.grade}</span></li>
                      <li><span>Started: </span> <span>{formatDate(sem.started)}</span></li>
                      <li><span>Finished: </span> <span>{formatDate(sem.ended)}</span></li>
                    </ul>
                  </div>
                  <div className="semester-footer">
                    <Link href={route('students.semesters.view.semester.content', sem.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faBook} /> Studying Content</Link>
                    <Link href={route('students.semesters.view.semester.grades', sem.id)} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faPercentage} /> My Semester grades</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </StudentLayout>
  )
}

export default ListBadges
