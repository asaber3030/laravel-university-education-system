import createColumn from "@/helpers/functions/create-column";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/helpers/functions/format-date";

export const StaffColumns = [
  createColumn('name', 'Staff', params => <span><b>{params.row.professor.title}</b> {params.row.professor.name}</span>),
  createColumn('subject', 'Subject', params => <span>{params.row.subject.title}</span>),
  createColumn('year', 'Year', params => <span>{params.row.year.title} - {params.row.year.term_name}</span>),
  createColumn('type', 'Type', params => <span>{params.row.type == 0 ? 'Dr. / Prof.' : 'Assistant'}</span>),
  createColumn('created_at', 'Added in', params => <span>{formatDate(params.row.created_at)}</span>),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.staff.delete', [params.row.id], 'Delete', faTrash),
      ]}
    />
  ), 1)
];
