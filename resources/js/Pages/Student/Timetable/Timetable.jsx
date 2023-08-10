import '@/assets/css/students/global-students.scss'
import './timetable.scss'

import React from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import TimetableDay from "@/components/Timetable";
import NotFoundAlert from "@/components/NotFoundAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimeline } from "@fortawesome/free-solid-svg-icons";

const Timetable = () => {

  const { user, days } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title='Timetable' />

      <PageHeader
        pageTitle='Timetable'
        pageIcon={faTimeline}
      />

      <div className="timetable-view">

        {days.length > 0 ? (
          <div className="days">
            {days.map(day => (
              <TimetableDay day={day} />
            ))}
          </div>
        ) : (
          <NotFoundAlert text='No timetable added yet!' />
        )}

      </div>

    </StudentLayout>
  )
}

export default Timetable
