import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {faFileLines, faFilePdf, faPercentage, faPlus} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@inertiajs/inertia-react";

export const SubjectsColumns = [
  createColumn('id', 'ID'),
  createColumn('title', 'Subject Name'),
  createColumn('code', 'Subject View'),
  createColumn('department', 'Department', params => <Link>{params.row.department.title}</Link>),
  createColumn('created_at', 'Date of creation', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.subjects.update', params.row.id, 'Update', faEdit),
        createActionObject('professors.subjects.chapters', params.row.id, 'View Chapters', faFileLines),
        createActionObject('professors.subjects.create.chapter', params.row.id, 'Add Chapters', faFilePdf),
        createActionObject('professors.subjects.grades', params.row.id, 'Default Grades', faPercentage),
      ]}
    />
  ))
];
