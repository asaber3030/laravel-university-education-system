import './all-semesters.scss'

import React, { useState } from "react"
import { usePage, Link, Head } from "@inertiajs/inertia-react"

import EngineerHelment from '../../../../assets/images/helmet.png'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronDown, faEdit,
  faGraduationCap, faPercentage
} from "@fortawesome/free-solid-svg-icons"

import showStudentName from "@/helpers/functions/showStudentName";

import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";

import {Accordion, AccordionDetails, Typography, AccordionSummary, Tooltip} from "@mui/material";
import Text from "@/components/TextSuccess/Text";

const Semesters = () => {

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { student } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`Semesters - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faGraduationCap} /> Semesters - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <StudentActionsDropdown student={student} />
        </div>
      </div>


      <div className='all-semesters'>

        {student.semesters.map(semester => (
          <div className={`semester ${semester.is_done ?? 'done-semester'}`}>
            <div className="semester-header">
              <h6><Link href={route('professors.students.semesters.view', [student.id, semester.id])}>{semester.year.title}</Link> - <span className="text-success">{semester.grade} marks</span></h6>
              <div className="actions">
                <Tooltip title='Update Semester Information'>
                  <Link href={route('professors.students.semesters.update', [student.id, semester.id])} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faEdit} /></Link>
                </Tooltip>

                <Tooltip title='Update Grades'>
                  <Link href={route('professors.students.semesters.grades.update', [student.id, semester.id])} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faPercentage} /></Link>
                </Tooltip>
              </div>
            </div>
            {semester.year.courses.length > 0 ? (
              <div className="semester-content">
                {semester.year.courses.map(course => (
                  <Link href={route('professors.subjects.chapters', course.subject.id)} className="subject">{course.subject.title} - <b>{course.subject.code}</b></Link>
                ))}
              </div>
            ) : (
              <div className="alert alert-sm alert-primary">No Courses found in this semester!</div>
            )}

          </div>
        ))}

      </div>


    </ProfessorLayout>
  )
}

export default Semesters
