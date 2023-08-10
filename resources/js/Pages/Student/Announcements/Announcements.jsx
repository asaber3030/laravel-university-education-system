import '@/assets/css/students/global-students.scss'
import './announcements.scss'

import React from "react";

import {usePage, Link, Head} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import NotFoundAlert from "@/components/NotFoundAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { fullDateOptions } from "@/helpers/constants";

import formatDate from "@/helpers/functions/format-date";

const Announcements = () => {

  const { appURL, user, announcements } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='Department Announcement' />

      <PageHeader
        pageTitle='Announcements'
        pageIcon={faFlag}
      />

      {announcements.length > 0 ? (
        <div className="announcements-container">
          {announcements.map(a => (
            <div className="ann">
              <div className="left">
                <img src={appURL + a.professor.picture} alt=""/>
                <Link>{a.professor.username}</Link>
              </div>
              <div className="right">
                <h6>{a.title}</h6>
                <span>{formatDate(a.created_at, fullDateOptions)}</span>
                <p>{a.description}</p>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <NotFoundAlert
          text={'No Annoucements!'}
        />
      )}
    </StudentLayout>
  )
}

export default Announcements
