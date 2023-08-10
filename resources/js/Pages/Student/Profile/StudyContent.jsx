import React, { useState } from "react";

import '@/assets/css/students/global-students.scss'
import './profile.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";

import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import {faBell, faBook, faCheck, faIdBadge, faLock, faPercentage} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const StudyContent = () => {

  const { appURL, user, notifications, all_years, current_year } = usePage().props

  return (
    <StudentLayout user={user}>
      <Head title='All years studying content' />

      <ProfileLayout activePage='content'>

        <PageHeader
          pageTitle='Study Content'
          pageIcon={faBook}
        />

        <div className="study-content-all">

          {all_years.length > 0 ? (

            <div className="content">

              <div className={`year-details ${current_year.is_done == 0 && 'active-year'}`}>
                <div className="header">
                  {current_year.is_done == 0 && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                  <h6>{current_year.year.title}</h6>
                  <span>Started {formatDate(current_year.started)}</span>
                </div>
                <div className="list-subjects">
                  {current_year.year.courses.length > 0 ? (
                    <>
                      {current_year.year.courses.map(course => (
                        <div className="subject">{course.subject.title} ({course.subject.code})</div>
                      ))}
                    </>
                  ) : (
                    <div className="alert alert-sm alert-primary">No Subjects found!</div>
                  )}
                </div>
                <div className="footer list-items">
                  <ul>
                    <li><span>ID</span> <span>#{current_year.id}</span></li>
                    <li><span>Total Marks</span> <span>{current_year.grade} marks</span></li>
                  </ul>
                  <div className="actions">
                    <Link href={route('students.semesters.view.semester.grades', current_year.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPercentage} /> Grades</Link>
                    <Link href={route('students.semesters.view.semester.content', current_year.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faBook} /> More Details</Link>
                  </div>
                </div>
              </div>

              {all_years.map(year => (
                <div className={`year-details ${year.is_done == 0 && 'active-year'}`}>
                  <div className="header">
                    {year.is_done == 0 && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                    <h6>{year.year.title}</h6>
                    <span>Started {formatDate(year.started)}</span>
                  </div>
                  <div className="list-subjects">
                    {year.year.courses.length > 0 ? (
                      <>
                        {year.year.courses.map(course => (
                          <div className="subject">{course.subject.title} ({course.subject.code})</div>
                        ))}
                      </>
                    ) : (
                      <div className="alert alert-sm alert-primary">No Subjects found!</div>
                    )}
                  </div>
                  <div className="footer list-items">
                    <ul>
                      <li><span>ID</span> <span>#{year.id}</span></li>
                      <li><span>Total Marks</span> <span>{year.grade} marks</span></li>
                    </ul>
                    <div className="actions">
                      <Link href={route('students.semesters.view.semester.grades', year.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPercentage} /> Grades</Link>
                      <Link href={route('students.semesters.view.semester.content', year.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faBook} /> More Details</Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>

          ) : (
            <div className="alert alert-sm alert-primary">No Studying content found for You!</div>
          )}

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default StudyContent
