import './year-assignments.scss';

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHashtag, faTasks, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Tooltip } from "@mui/material";
import { YearAssignmentsColumns } from "@/columns/assignments";
import List  from "@/components/List/List";

const ViewYearAssignments = () => {

  const { courses, year } = usePage().props

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader title={<span>Year Assignments: <b>{year.title} / {year.term_name}</b></span>} icon={faTasks} />

      <div className="year-assignments">

        <List
          rows={year.assignments}
          columns={YearAssignmentsColumns}
          checkBox={false}
        />

      </div>

    </ProfessorLayout>
  )
}

export default ViewYearAssignments
