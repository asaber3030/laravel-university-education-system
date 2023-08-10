import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { Link } from "@inertiajs/inertia-react";

import { APP_URL, Professors_Types } from "@/helpers/constants";
import { showStudentPhone } from "@/helpers/functions/student";

export const ProfessorsColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Professor', params => (
    <div className="student-card remove-bg-student">
      <span>{params.row.name} <span><Link >{params.row.username}</Link></span></span>
    </div>
  )),
  createColumn('title', 'Title'),
  createColumn('type', 'Type', params => Professors_Types[params.row.type]),
  createColumn('department', 'Department', params => <Link>{params.row.department.title}</Link>),
  createColumn('phone', 'Phone Number', params => showStudentPhone(params.row)),
  createColumn('created_at', 'Date of creation', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.update', params.row.id, 'Update', faEdit),
        createActionObject('professors.view', params.row.id, 'View', faEye),
        createActionObject('professors.delete', params.row.id, 'Delete', faTrash),
      ]}
    />
  ), 1)
];
