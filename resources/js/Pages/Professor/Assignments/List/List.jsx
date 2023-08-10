import './list.scss';

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHashtag, faTasks, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Tooltip } from "@mui/material";


const ListAssignments = () => {

  const { assignments, departments } = usePage().props

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader title='Assignments' icon={faTasks} />

      <div className="all-assignments">

        <div className="left-data">
          {departments.map(dep => (
            <div className="department" key={dep.id}>
              <h6 className='dep-title'><Link href={route('professors.deps.years', dep.id)}><FontAwesomeIcon icon={faHashtag} /> {dep.title}</Link></h6>
              <ul>
                {dep.years.map(yr => (
                  <li key={yr.id} className='year-title'><Link href={route('professors.ass.year', yr.id)}>{yr.title} - <b>{yr.term_name}</b></Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="right-data">

          <h6 className='default-title'>All Assignments</h6>

          <div className="assignments-list">

            {assignments.map(year => (
              <div className="assignment" key={year.id}>
                <h6 className='year-title'>{year.title} - <b>{year.term_name}</b></h6>
                <ul>
                  {year.assignments.map(a => (
                      <li key={a.id}>
                        <Tooltip title='Assignment Code / Subject / Subject Code'>
                          <Link href={route('professors.ass.view', a.id)}>Assignment Code: <b>{a.code}</b> | Subject: <b>{a.course.subject.title} ({a.course.subject.code})</b></Link>
                        </Tooltip>

                        <div className="actions">
                          <Link href={route('professors.ass.view', [a.id, 'settings'])}><FontAwesomeIcon icon={faEdit} /></Link>
                          <Link href={route('professors.ass.view', [a.id, 'delete'])}><FontAwesomeIcon icon={faTrash} /></Link>
                        </div>
                      </li>

                  ))}
                </ul>
              </div>
            ))}

          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ListAssignments
