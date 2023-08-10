import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import { Link } from "@inertiajs/inertia-react";
import { nationalID } from "@/helpers/functions/student";

export const SemestersColumns = [
  createColumn('id', 'Semester Review ID'),
  createColumn('student', 'Student', params => <Link href={route('professors.students.view', params.row.student.id)}>{params.row.student.username}</Link>),
  createColumn('national_id', 'National ID', params => <span href={route('professors.students.view', params.row.student.id)}>{nationalID(params.row.student.national_id)}</span>),
  createColumn('grade', 'Student Grade', params => <span className="text-success">{`${params.row.grade} marks`}</span>),
  createColumn('is_done', 'Completed', params => <span className={`${params.row.is_done ? 'text-success' : 'text-warning'}`}>{`${params.row.is_done ? 'Yes' : 'Not yet'}`}</span>),
  createColumn('started', 'Started at', params => params.row.started ? formatDate(params.row.started) : 'Not Updated'),
  createColumn('ended', 'Ended in', params => params.row.ended ? formatDate(params.row.started) : 'Not Updated'),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.deps.year.semesters.update', [params.row.student.department, params.row.year.id, params.row.id], 'Update Semester', faEdit),
        createActionObject('professors.deps.year.semesters.view', [params.row.student.department, params.row.year.id, params.row.id], 'View Semester', faEye),
      ]}
    />
  ), 1)
];
