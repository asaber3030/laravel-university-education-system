import '@/assets/css/students/global-students.scss'
import './dashboard.scss'

import React from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook, faQuestionCircle, faTasks, faUser} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

const RightComponent = () => {
  return (
    <div className='table-actions'>
      <Tooltip title='Subjects' followCursor>
        <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faBook} /></Link>
      </Tooltip>

      <Tooltip title='Quizzes' followCursor>
        <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faQuestionCircle} /></Link>
      </Tooltip>

      <Tooltip title='Assignments' followCursor>
        <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faTasks} /></Link>
      </Tooltip>
    </div>
  )
}

const Dashboard = () => {

  const { user } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='University' />

      <PageHeader
        pageTitle={<span>University</span>}
        pageRightComponent={<RightComponent />}
      />

      <div className="dashboard-container">

        <div className="dashboard-header">

          <Link className="link-section">

            <div className="section-left">
              <FontAwesomeIcon icon={faBook} />
            </div>

            <div className="section-right">
              <h6>Subjects</h6>
            </div>

          </Link>

          <Link className="link-section">

            <div className="section-left">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </div>

            <div className="section-right">
              <h6>Quizzes</h6>
            </div>

          </Link>

          <Link className="link-section">

            <div className="section-left">
              <FontAwesomeIcon icon={faTasks} />
            </div>

            <div className="section-right">
              <h6>Assignments</h6>
            </div>

          </Link>

          <Link className="link-section">

            <div className="section-left">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="section-right">
              <h6>Profile</h6>
            </div>

          </Link>

        </div>

      </div>

    </StudentLayout>
  )
}

export default Dashboard
