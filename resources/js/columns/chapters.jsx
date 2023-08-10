import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {faFileLines, faFilePdf, faPercentage, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/inertia-react";

export const ChaptersColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Chapter'),
  createColumn('number', 'Order', params => `#${params.row.number}`),
  createColumn('subject', 'Subject', params => <Link href={route('professors.subjects.chapters', params.row.subject.id)}>{params.row.subject.title}</Link>),
  createColumn('created_at', 'Date of creation', params => formatDate(params.row.created_at)),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.subjects.update.chapter', [params.row.subject.id, params.row.id], 'Update', faEdit),
        createActionObject('professors.subjects.delete.chapter', [params.row.subject.id, params.row.id], 'Delete', faTrashAlt),
      ]}
    />
  ))
];
