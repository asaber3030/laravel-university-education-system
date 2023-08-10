import React from "react";

import '@/assets/css/students/global-students.scss'
import './profile.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

import { faBell } from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {

  const { appURL, user, notifications } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='Notifications' />

      <ProfileLayout activePage='notifications'>
        <PageHeader
          pageTitle='Notifications'
          pageIcon={faBell}
        />

        <div className="display-notifications">
          {notifications.length > 0 ? (
            <div className="notifications">
              {notifications.map(notify => (
                <div className="notification">
                  <div className="left-image">
                    <Link><img src={appURL + notify.professor.picture} alt="Prof image"/></Link>
                  </div>
                  <div className="right-details">
                    <h6>{notify.title}</h6>
                    <p>{notify.message}</p>
                    <span>{formatDate(notify.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-sm alert-primary">No notifications!</div>
          )}
        </div>
      </ProfileLayout>

    </StudentLayout>
  )
}

export default Notifications
