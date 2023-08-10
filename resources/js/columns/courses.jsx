import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import {faEdit, faEye, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {
  faChalkboardTeacher,
  faFileLines,
  faFilePdf, faGraduationCap,
  faLayerGroup,
  faPercentage,
  faPlus,
  faUserDoctor
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/inertia-react";

export const CoursesColumns = [
  createColumn('id', 'ID'),
  createColumn('title', 'Title'),
  createColumn('subject', 'Subject', params => <Link href={route('professors.subjects.chapters', params.row.subject.id)}>{params.row.subject.title}</Link>),
  createColumn('year', 'Year', params => <Link href={route('professors.deps.year.content', [params.row.year.department, params.row.year.id])} className='truncate-200'>{params.row.year.title}</Link>),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.courses.view', params.row.id, 'View2 Course', faEye),
        createActionObject('professors.courses.add.lecture', params.row.id, 'Add Lecture', faPlus),
        createActionObject('professors.courses.update', params.row.id, 'Update Course', faEdit),
        createActionObject('professors.courses.delete', params.row.id, 'Delete Course', faTrashAlt),
      ]}
    />
  ))
];
