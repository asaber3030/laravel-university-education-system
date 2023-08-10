import createColumn from "@/helpers/functions/create-column";
import formatDate from "@/helpers/functions/format-date";
import GridActionsContainer, { createActionObject } from "@/helpers/functions/createAction";

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "@inertiajs/inertia-react";
import {faCog, faExclamationCircle, faEye, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

export const AssignmentsColumns = [
  createColumn('id', 'Assignment ID'),
  createColumn('code', 'View'),
  createColumn('student', 'Student', params => <Link href={route('professors.students.view', params.row.student.id)}>{`${params.row.student.username}`}</Link>),
  createColumn('professor', 'By Professor', params => <Link>{`${params.row.professor.username}`}</Link>),
  createColumn('course', 'Course Subject', params => <Link href={route('professors.subjects.chapters', params.row.course.subject.id)}>{`${params.row.course.subject.title}`} <b>{params.row.course.subject.code}</b></Link>),
  createColumn('chapters', 'Subject Chapters', params => `${params.row.course.subject.chapters_count} chapter(s)`),
  createColumn('accept', 'Still Accept?', params => `${params.row.accept_answer == 1 ? 'Yes' : 'No'}`),
  createColumn('update', 'Student Can Update Answer', params => `${params.row.allow_update == 1 ? 'Yes' : 'No'}`),
  createColumn('is_answered', 'Is Answered?', params => <span className={`badge ${params.row.answer ? 'badge-success' : 'badge-warning'}`}>{`${params.row.answer ? 'Yes' : 'No'}`}</span>),
  createColumn('grade_added', 'Grade Added?', params => <span className={`badge ${params.row.grade ? 'badge-success' : 'badge-warning'}`}>{`${params.row.grade ? 'Yes' : 'No'}`}</span>),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.ass.view', [params.row.id, 'settings'], 'Assignment Settings', faCog),
        createActionObject('professors.ass.view', [params.row.id, 'answer'], 'View2 Answer', faEye, `${!params.row.answer ? 'hd-ac-btn' : ''}`),
        createActionObject('professors.ass.view', [params.row.id, 'grade'], 'Add Grade', faPlus, `${params.row.grade ? 'hd-ac-btn' : ''}`),
        createActionObject('professors.ass.view', [params.row.id, 'update-grade'], 'Update Grade', faEdit, `${!params.row.grade != null ? 'hd-ac-btn' : ''}`),
        createActionObject('professors.ass.view', [params.row.id, 'warnings'], 'Send Warning', faExclamationCircle),
        createActionObject('professors.ass.view', [params.row.id, 'student-details'], 'Student Details', faExclamationCircle),
      ]}
    />
  ), 2)
];


export const YearAssignmentsColumns = [
  createColumn('id', 'Assignment ID'),
  createColumn('code', 'Code'),
  createColumn('professor', 'By Professor', params => <Link>{`${params.row.professor.username}`}</Link>),
  createColumn('update', 'Student Can Update Answer', params => `${params.row.allow_update == 1 ? 'Yes' : 'No'}`),
  createColumn('still_accepts', 'Accept Answers', params => `${params.row.accept_answers == 1 ? 'Yes' : 'No'}`),
  createColumn('actions', 'Handle', params => (
    <GridActionsContainer
      actions={[
        createActionObject('professors.ass.view', [params.row.id, 'settings'], 'Assignment Settings', faCog),
        createActionObject('professors.ass.view', [params.row.id, 'delete'], 'Delete', faTrash),
        createActionObject('professors.ass.view', [params.row.id, 'warnings'], 'Warnings', faExclamationCircle),
      ]}
    />
  ), 2)
]
