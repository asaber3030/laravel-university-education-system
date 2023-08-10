import createColumn from "@/helpers/functions/create-column";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "@inertiajs/inertia-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faMessage} from "@fortawesome/free-regular-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export const StudentsColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('username', 'Username'),
  createColumn('national_id', 'National ID'),
  createColumn('email', 'E-mail'),
  createColumn('university_code', 'University View'),
  createColumn('department', 'Department', params => <Link href={route('professors.deps.years', params.row.department.id)}>{params.row.department.title}</Link>),
  createColumn('actions', 'Handle', (params) => {
    return (
      <div className='table-actions'>
        <Link href={route('professors.students.view', params.row.id)} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEye} /></Link>
        <Link href={route('professors.students.update', params.row.id)} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEdit} /></Link>
        <Link href='' className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faMessage} /></Link>
        <Link href='' className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faTrash} /></Link>
      </div>
    )
  })
]

