import './students/student-settings.scss'
import './settings.scss'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import SettingsSidebar from "@/Pages/Professor/Settings/SettingsSidebar";

import { usePage, Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDate from "@/helpers/functions/format-date";
import {
  faBook,
  faClock,
  faCog,
  faPercentage,
  faPlay,
  faPlus,
  faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "@mui/material";

const Departments = () => {

  const { activePage, appURL, settings, departments } = usePage().props

  return (
    <ProfessorLayout>

      <div className="settings-container">

        <div className="departments">

          {departments.map(dep => (
            <div className="department">
              <div className="left">
                <img src={appURL + dep.icon} alt=""/>
                <h6><Link href={route('professors.deps.years', dep.id)}>{dep.title}</Link></h6>
              </div>
              <div className="right list-items">
                <ul>
                  <li><span><FontAwesomeIcon icon={faUsers} /> Students</span> <span>{dep.students_count} students</span></li>
                  <li><span><FontAwesomeIcon icon={faBook} /> Studying Years</span> <span>{dep.years_count} years</span></li>
                  <li><span><FontAwesomeIcon icon={faClock} /> Created at</span> <span>{formatDate(dep.created_at)} student</span></li>
                </ul>

                <div className="table-actions">
                  <Tooltip title='Create Year' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPlus} /></Link>
                  </Tooltip>
                  <Tooltip title='Subjects' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faBook} /></Link>
                  </Tooltip>
                  <Tooltip title='Grades' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPercentage} /></Link>
                  </Tooltip>
                  <Tooltip title='Add Courses' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faPlay} /></Link>
                  </Tooltip>
                  <Tooltip title='Update' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faCog} /></Link>
                  </Tooltip>
                  <Tooltip title='Delete' followCursor>
                    <Link className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faTrash} /></Link>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}

        </div>

        <SettingsSidebar activePage={activePage} />

      </div>

    </ProfessorLayout>
  )
}

export default Departments
