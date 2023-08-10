import React, { useState } from "react";

import '@/assets/css/students/global-students.scss'
import './profile.scss'

import {Head, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import {faIdBadge, faLock} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "@/components/PageHeader/PageHeader";
import formatDate from "@/helpers/functions/format-date";

const AccountPassword = () => {

  const { appURL, user, badges } = usePage().props

  return (
    <StudentLayout user={user}>

      <ProfileLayout activePage='badges'>

        <Head
          title='My Badges'
        />

        <PageHeader
          pageTitle='My Earned Badges'
          pageIcon={faIdBadge}
        />

        <div className='display-badges'>

          {badges.length > 0 ? (
            <div className="badges">

              {badges.map(badge => (
                <div className="badge" key={badge.id}>
                  <img src={appURL + badge.badge.icon} alt="Badge icon" />
                  <h6>{badge.badge.title}</h6>
                  <span>{formatDate(badge.created_at)}</span>
                </div>
              ))}

            </div>
          ) : (
            <div className="alert alert-sm alert-info">No Earned Badges.</div>
          )}

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default AccountPassword
