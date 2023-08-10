import '@/assets/css/students/global-students.scss'
import './semesters.scss'

import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import { faEllipsisH, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import NotFoundAlert from "@/components/NotFoundAlert";

const SemesterGrades = () => {

  const { user, semester } = usePage().props

  const [detailedGrade, setDetailedGrade] = useState(null)

  return (
    <StudentLayout user={user}>

      <Head title={`Semester Grades - ${semester.year.title} / ${semester.year.term_name}`} />

      <PageHeader
        pageTitle={<span>Semester: <b>{semester.year.title} - {semester.year.term_name}</b></span>}
        pageIcon={faIdBadge}
      />

      <div className="view-semester-grades">
        {semester.grades.length > 0 ? (
          <table className="table table-responsive all-grades">
            <thead>
            <tr>
              <Tooltip followCursor title="If there's any problem make sure to use this ID"><th scope="col">Grade ID</th></Tooltip>
              <th scope="col">Subject</th>
              <th scope="col">Midterm</th>
              <th scope="col">Oral</th>
              <th scope="col">Lab</th>
              <th scope="col">Assignments</th>
              <th scope="col">Quizzes</th>
              <th scope="col">Smart</th>
              <th scope="col">Final</th>
              <th scope="col">Total</th>
              <th scope="col">Details</th>
            </tr>
            </thead>
            <tbody>
            {semester.grades.map(grade => (
              <tr>
                <td>{grade.id}</td>
                <td>
                  <Tooltip followCursor title={grade.subject.code}><Link href={route('students.subjects.view', grade.subject.id)}>{grade.subject.title} ({grade.subject.code})</Link></Tooltip>
                </td>
                <td>{grade.midterm} marks</td>
                <td>{grade.oral} marks</td>
                <td>{grade.lab} marks</td>
                <td>{grade.assignments} marks</td>
                <td>{grade.quizzes} marks</td>
                <td>{grade.smart} marks</td>
                <td>{grade.final} marks</td>
                <td>{grade.total} marks</td>
                <td><button onClick={ () => setDetailedGrade(grade) } className={`btn btn-sm btn-dark ${detailedGrade && detailedGrade.id == grade.id && 'active'}`}><FontAwesomeIcon icon={faEllipsisH} /> More Details</button></td>
              </tr>
            ))}
            </tbody>
          </table>
        ) : (
          <NotFoundAlert text={`No Grades found for this semester!`} type='danger' />
        )}

        {detailedGrade && (
          <div className="detailed-grade">

            <h6 className='mt-2 mb-2 block' style={{ fontSize: 20 }}>Detailed: <Link href={route('students.subjects.view', detailedGrade.subject.id)}><b>{detailedGrade.subject.title} ({detailedGrade.subject.code})</b></Link></h6>

            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Marks</th>
                  <th>My Grade</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: 'l' }}>
                  <td>Midterm</td>
                  <td className='text-blue-800'>{detailedGrade.midterm} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.midterm} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Oral</td>
                  <td className='text-blue-800'>{detailedGrade.oral} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.oral} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Lab</td>
                  <td className='text-blue-800'>{detailedGrade.lab} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.lab} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Assignments</td>
                  <td className='text-blue-800'>{detailedGrade.assignments} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.assignments} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Quizzes</td>
                  <td className='text-blue-800'>{detailedGrade.quizzes} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.quizzes} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Smart</td>
                  <td className='text-blue-800'>{detailedGrade.smart} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.smart} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Final</td>
                  <td className='text-blue-800'>{detailedGrade.final} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.final} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                <tr>
                  <td>Total</td>
                  <td className='text-blue-800'>{detailedGrade.total} marks</td>
                  {detailedGrade.subject.grades ? <td>{detailedGrade.subject.grades.total} marks</td> : <td><span className="text-warning">No Default grades found!</span></td>}
                </tr>
                {detailedGrade.subject.grades && (
                  <tr>
                    <td>Percentage</td>
                    <td className='text-blue-800'>{(100 - ((detailedGrade.subject.grades.total - detailedGrade.total) / detailedGrade.subject.grades.total) * 100).toFixed(2)}%</td>
                    <td>100%</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </StudentLayout>
  )
}

export default SemesterGrades
