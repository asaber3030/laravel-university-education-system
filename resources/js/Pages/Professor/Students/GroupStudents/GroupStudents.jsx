import { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";

import { Tooltip } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faFileExport, faFileImport, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

import { StudentsColumns } from "@/columns/students";

const GroupStudents = () => {

  const { students } = usePage().props

  return (
    <ProfessorLayout>

      <div className="layout-header">
        <h4><FontAwesomeIcon icon={faUser} /> Students</h4>
        <div className="layout-actions">
          <Tooltip followCursor={true} title='Import Students'>
            <Link href='' className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faFileImport} /></Link>
          </Tooltip>
          <Tooltip followCursor={true} title='Export Students'>
            <Link href='' className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faFileExport} /></Link>
          </Tooltip>
          <Tooltip followCursor={true} title='Create'>
            <Link href={route('professors.students.create')} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faUserPlus} /></Link>
          </Tooltip>
        </div>
      </div>

      <List rows={students} columns={StudentsColumns} />

    </ProfessorLayout>
  )
}

export default GroupStudents
