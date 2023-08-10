import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
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

export const DepartmentsColumns = [
  createColumn('id', 'ID'),
  createColumn('title', 'Department'),
  createColumn('professors', 'Professors', params => <Link href={route('professors.deps.professors', params.row.id)}>{params.row.professors_count} professor(s)</Link>),
  createColumn('students', 'Students', params => <Link href={route('professors.deps.students', params.row.id)}>{params.row.students_count} student(s)</Link>),
  createColumn('subjects', 'Subjects', params => <Link href={route('professors.deps.subjects', params.row.id)}>{params.row.subjects_count} subject(s)</Link>),
  createColumn('years', 'Teaching Years', params => <Link href={route('professors.deps.years', params.row.id)}>{params.row.years_count} semeseter(s)</Link>),
  createColumn('created_at', 'Date of creation', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.deps.update', params.row.id, 'Update', faEdit),
        createActionObject('professors.deps.professors', params.row.id, 'Professors', faChalkboardTeacher),
        createActionObject('professors.deps.students', params.row.id, 'Students', faGraduationCap),
        createActionObject('professors.deps.years', params.row.id, 'Studying Years', faLayerGroup),
        createActionObject('professors.deps.create.professor', params.row.id, 'Add Professor', faPlus),
        createActionObject('professors.deps.year.add', params.row.id, 'Add Studying Year', faPlus),
      ]}
    />
  ), 1.5)
];
