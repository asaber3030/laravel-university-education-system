import '@/assets/css/students/global-students.scss'
import './teaching-staff.scss'

import React from "react";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import NotFoundAlert from "@/components/NotFoundAlert";

const TeachingStaff = () => {

  const { appURL, user, professors, assistants } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='Teaching staff' />

      <PageHeader
        pageTitle='Teaching Staff'
        pageIcon={faEye}
      />

      <div className="list-staff">

        <h1 className='staff-title'>Professors</h1>
        {professors.length > 0 ? (
          <div className="list-items-profes">
            {professors.map(prof => (
              <div className="user">
                <div className="header">
                  <img src={appURL + prof.professor.picture} alt=""/>
                  <h6>{prof.professor.title} <b>{prof.professor.name}</b></h6>
                  <span>{prof.professor.username}</span>
                </div>
                <div className="content list-items">
                  <ul>
                    <li><span>Username</span> <span>{prof.professor.username}</span></li>
                    <li><span>Phone Number</span> <span>{prof.professor.phone}</span></li>
                    {prof.professor.fb && (
                      <li><span>Facebook Account</span> <a target='_blank' href={prof.professor.fb}>Open</a></li>
                    )}
                    <li><span>Email Adress</span> <span>{prof.professor.email}</span></li>
                    <li><span>Title</span> <span>{prof.professor.title}</span></li>
                    <li><span>Subject</span> <span><Link href={route('students.subjects.view', prof.subject.id)}>{prof.subject.title} ({prof.subject.code})</Link></span></li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFoundAlert text='No Professors added to your current year teaching staff until now!' />
        )}

        <h1 className='staff-title'>Teaching Assistants</h1>
        {assistants.length > 0 ? (
          <div className="list-items-profes">
            {assistants.map(prof => (
              <div className="user">
                <div className="header">
                  <img src={appURL + prof.professor.picture} alt=""/>
                  <h6>{prof.professor.title} <b>{prof.professor.name}</b></h6>
                  <span>{prof.professor.username}</span>
                </div>
                <div className="content list-items">
                  <ul>
                    <li><span>Username</span> <span>{prof.professor.username}</span></li>
                    <li><span>Phone Number</span> <span>{prof.professor.phone}</span></li>
                    {prof.professor.fb && (
                      <li><span>Facebook Account</span> <a target='_blank' href={prof.professor.fb}>Open</a></li>
                    )}
                    <li><span>Email Adress</span> <span>{prof.professor.email}</span></li>
                    <li><span>Title</span> <span>{prof.professor.title}</span></li>
                    <li><span>Subject</span> <span><Link href={route('students.subjects.view', prof.subject.id)}>{prof.subject.title} ({prof.subject.code})</Link></span></li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NotFoundAlert text='No Teaching Assistants added to your current year teaching staff until now!' />
        )}
      </div>

    </StudentLayout>
  )
}

export default TeachingStaff
