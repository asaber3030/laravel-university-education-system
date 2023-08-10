import './year-content.scss'
import { useEffect, useState, useMemo } from "react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faEdit, faEye} from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";

import { StudentsColumns } from "@/columns/students";
import { nationalID } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import {faBook, faChalkboardTeacher, faFileExcel, faFlag, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import NotFoundAlert from "@/components/NotFoundAlert";

const YearContent = () => {

  const { year, course } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`Studying Content - ${year.title}`} />

      <ProfessorLayoutHeader title={`Studying Content - ${year.title}`} icon={faChalkboardTeacher}>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.ann.add', [year.department.id, year.id])}><FontAwesomeIcon icon={faFlag} /> Announce</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.content.add', [year.department.id, year.id])}><FontAwesomeIcon icon={faPlus} /> Add Course</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.add', year.department.id)}><FontAwesomeIcon icon={faPlus} /> Add Student Manually</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.students.add', [year.department.id, year.id])}><FontAwesomeIcon icon={faFileExcel} /> Import Students</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.students.add.grades', [year.department.id, year.id])}><FontAwesomeIcon icon={faFileExcel} /> Import Grades</Link>
        <Link className='btn btn-secondary btn-sm' href={route('professors.deps.year.grades', [year.department.id, year.id])}><FontAwesomeIcon icon={faEye} /> View Grades</Link>
      </ProfessorLayoutHeader>

      <div className="year-content-subjects">


        {year.courses.length > 0 ? (
          <>
            {year.courses.map(course => (
              <div className="course-content">
                <div className="course-header">
                  <h6>
                    <Link href={route('professors.subjects.chapters', course.subject.id)}>
                      {course.subject.title} - {course.subject.code}
                    </Link>
                  </h6>

                  <div className="subject-actions">
                    <Tooltip title='Chapters' followCursor={true}>
                      <Link className='btn btn-sm btn-secondary' href={route('professors.subjects.chapters', course.subject.id)}><FontAwesomeIcon icon={faBook} /></Link>
                    </Tooltip>
                    <Tooltip title='Add Chapter' followCursor={true}>
                      <Link className='btn btn-sm btn-secondary' href={route('professors.subjects.create.chapter', course.subject.id)}><FontAwesomeIcon icon={faPlus} /></Link>
                    </Tooltip>
                    <Tooltip title='Update Subject' followCursor={true}>
                      <Link className='btn btn-sm btn-secondary' href={route('professors.subjects.update', course.subject.id)}><FontAwesomeIcon icon={faEdit} /></Link>
                    </Tooltip>
                  </div>
                </div>

                {course.subject.chapters.length > 0 ? (
                  <>
                    <ul className='list-chapters'>
                      {course.subject.chapters.map(chapter => (
                        <li>
                          <span>{`Chapter ${chapter.number} -`} <b style={{ fontWeight: 500 }}>{chapter.name}</b></span>
                          <span><Link href={route('professors.subjects.update.chapter', [course.subject.id, chapter.id])}>Update</Link></span>
                        </li>
                      ))}
                    </ul>
                    <div className="additional-details-container">
                      <h6>More Details</h6>
                      <ul>
                        <li>
                          <span>Semester</span>
                          <span>{year.title}</span>
                        </li>
                        <li>
                          <span>Course Title</span>
                          <span>{course.title}</span>
                        </li>
                        <li>
                          <span>Created At</span>
                          <span>{formatDate(course.created_at)}</span>
                        </li>
                        <li>
                          <span>Total Subject Marks</span>
                          {course.subject.grades ? <span className='text-success'>{course.subject.grades.total + ' marks'}</span> : <Link href={route('professors.subjects.grades', course.subject.id)}>Set Grades</Link>}
                        </li>
                      </ul>
                    </div>
                    <div className="semester-actions">
                      <Link href={route('professors.deps.year.content.update', [year.department.id, year.id, course.id])} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEdit} /> Update Course</Link>
                      <Link href={route('professors.deps.year.content.delete', [year.department.id, year.id, course.id])} className='btn btn-outline-danger btn-sm'><FontAwesomeIcon icon={faTrash} /> Delete Course</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: 0 }} className="alert alert-warning alert-chapters alert-sm">This subject doesn't have chapters content! <Link className='alert-link' href={route('professors.subjects.create.chapter', course.subject.id)}><FontAwesomeIcon icon={faPlus} /> Add Chapter</Link></div>
                    <div className="additional-details-container">
                      <h6>More Details</h6>
                      <ul>
                        <li>
                          <span>Semester</span>
                          <span>{year.title}</span>
                        </li>
                        <li>
                          <span>Course Title</span>
                          <span>{course.title}</span>
                        </li>
                        <li>
                          <span>Created At</span>
                          <span>{formatDate(course.created_at)}</span>
                        </li>
                        <li>
                          <span>Total Subject Marks</span>
                          {course.subject.grades ? <span className='text-success'>{course.subject.grades.total + ' marks'}</span> : <Link href={route('professors.subjects.grades', course.subject.id)}>Set Grades</Link>}
                        </li>
                      </ul>
                    </div>
                    <div className="semester-actions">
                      <Link href={route('professors.deps.year.content.update', [year.department.id, year.id, course.id])} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEdit} /> Update Course</Link>
                      <Link href={route('professors.deps.year.content.delete', [year.department.id, year.id, course.id])} className='btn btn-outline-danger btn-sm'><FontAwesomeIcon icon={faTrash} /> Delete Course</Link>
                    </div>
                  </>
                )}

              </div>
            ))}
          </>
        ) : <NotFoundAlert text='No content have been added yet!' />}


      </div>

    </ProfessorLayout>
  )
}

export default YearContent
