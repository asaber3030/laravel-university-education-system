import './view-course.scss'

import { useEffect, useState, useMemo } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faEye} from "@fortawesome/free-regular-svg-icons";
import {faPlay, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "@mui/material";
import formatDate from "@/helpers/functions/format-date";

const ViewCourse = () => {

  const { course } = usePage().props
  console.log(course)

  return (

    <ProfessorLayout>

      <Head title={`View Course - ${course.title}`} />

      <ProfessorLayoutHeader title={`View Course - ${course.title}`} icon={faEye}>
        <Link href={route('professors.courses.update', course.id)} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faEdit} /> Update Course</Link>
        <Link href={route('professors.courses.add.lecture', course.id)} className='btn btn-sm btn-success'><FontAwesomeIcon icon={faPlus} /> Add Lecture</Link>
      </ProfessorLayoutHeader>

      <div className="view-course">

        <div className="left-course-lectures">
          {course.lectures.length > 0 ? (
            <>
              <div className="list-lectures">
                {course.lectures.map(lecture => (
                  <div key={lecture.id} className="lecture">
                    <div className="left-lecture">
                      <Link href={route('professors.courses.view.lecture', [course.id, lecture.id])}><FontAwesomeIcon icon={faPlay} /> {lecture.title}</Link>
                    </div>
                    <div className="right-lecture">
                      <Tooltip followCursor={true} title='Update Lecture'><Link href={route('professors.courses.update.lecture', [course.id, lecture.id])}><FontAwesomeIcon icon={faEdit} /></Link></Tooltip>
                      <Tooltip followCursor={true} title='Delete Lecture'><Link href={route('professors.courses.delete.lecture', [course.id, lecture.id])}><FontAwesomeIcon icon={faTrash} /></Link></Tooltip>
                    </div>
                  </div>
                ))}
              </div>
              <div className="course-description">
                <h5 className='default-title'>Course Description</h5>
                <h6>{course.title}</h6>
                <p>{course.info}</p>
              </div>
            </>
          ) : (
            <div className="alert alert-sm alert-primary">No lectures to this course! <Link className='alert-link' href={route('professors.courses.add.lecture', course.id)}>Create Lecture</Link></div>
          )}
        </div>

        <div className="right-course-details list-items">
          <h6 className='default-title'>Course for subject - <b>{course.subject.title}</b></h6>
          <ul>
            <li>
              <span>Course ID</span>
              <span>#{course.id}</span>
            </li>
            <li>
              <span>No. of lectures</span>
              <span>{course.lectures.length} lecture(s)</span>
            </li>
            <li>
              <span>Subject</span>
              <span><Link href={route('professors.subjects.chapters', course.subject.id)}>{course.subject.title} - {course.subject.code}</Link></span>
            </li>
            <li>
              <span>Year</span>
              <span><Link href={route('professors.deps.year.content', [course.year.department.id, course.year.id])}>{course.year.title}</Link></span>
            </li>
            <li>
              <span>Department</span>
              <span><Link href={route('professors.deps.years', course.year.department.id)}>{course.year.department.title}</Link></span>
            </li>
            <li>
              <span>Chapters</span>
              <span>{course.subject.chapters.length} chapter - <Link href={route('professors.subjects.create.chapter', course.subject.id)}>Add Chapter</Link></span>
            </li>
            <li>
              <span>Last Update</span>
              <span>{formatDate(course.updated_at)}</span>
            </li>
            <li>
              <span>Created In</span>
              <span>{formatDate(course.created_at)}</span>
            </li>
          </ul>
        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ViewCourse
