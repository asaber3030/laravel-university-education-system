import '@/assets/css/students/global-students.scss'
import './profile.scss'

import React from "react";

import { Head, Link, usePage } from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import Loading from "@/components/Loading/Loading";
import UserCard from "@/components/CreateCard";

import formatDate from "@/helpers/functions/format-date";
import log from "@/helpers/functions/log";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fullDateOptions } from "@/helpers/constants";

const ViewReport = () => {

  const { appURL, user, report } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title={`View Report of ID: ${report.id}`} />

      <ProfileLayout activePage='problem'>

        <div className="view-report-container">

          <div className="report-sender">
            {report.answer ? (

              <>

                <UserCard
                  image={report.answer.professor.picture}
                  text={report.answer.professor.username}
                  secondText={formatDate(report.created_at, fullDateOptions)}
                />

                <div className="professor-answer">
                  <h6 className='answer-title'>{report.answer.title} <span>Answered: {formatDate(report.answer.created_at, fullDateOptions)}</span></h6>
                  <p className='answer-description'>{report.answer.description}</p>
                </div>

              </>
            ) : (
              <div className="alert alert-sm alert-warning">Not answered yet!</div>
            )}
          </div>

          <h6 style={{ margin: '15px 0', paddingTop: 14, borderTop: '1px solid #ddd'  }}>My Report</h6>

          <div className="report-content">
            <h6 className='report-title'>{report.title} <span>Reported: {formatDate(report.created_at, fullDateOptions)}</span></h6>
            <p className='report-description'>{report.description}</p>
          </div>

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default ViewReport
