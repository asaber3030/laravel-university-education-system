import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faIdCard, faQuestionCircle, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faBook, faCheck,
  faCog, faDownload, faFlag,
  faGraduationCap, faHandsHelping,
  faHistory,
  faIdBadge, faImage, faLock, faPaperPlane, faTable,
  faTasks,
  faVideo
} from "@fortawesome/free-solid-svg-icons";

import Dropdown from "react-bootstrap/Dropdown";
import formatDate from "@/helpers/functions/format-date";

const StudentNavbar = ({ user }) => {

  const { appURL, auth } = usePage().props

  const applyActivateSpecific = (id) => {
    Inertia.post(route('students.activate.notification', {
      id: id
    }))
  }

  return (
    <nav className='student-navbar-container'>
      <div className="left-items">
        <Link href={route('students.staff.list')}>Teaching Staff</Link>
        <Link href={route('students.ann')}>Announcements</Link>
        <Link href={route('students.timetable.list')}>Timetable</Link>
      </div>

      <div className="right-items">

        <div className="notifications-dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="dark" size="sm" id="dropdown-basic">
              <FontAwesomeIcon icon={faBell} />
            </Dropdown.Toggle>

            <Dropdown.Menu align='end'>
              <div className="display-notifications">
                {auth.notifications.map(n => (
                  <Link href={n.url} onClick={ () => applyActivateSpecific(n.id) } className={`notification ${n.is_read == 0 ? 'active-notification' : ''}`}>
                    <div className="image">
                      <img src={appURL + n.professor.picture} alt="" />
                    </div>
                    <div className="text">
                      <h6>{n.title}</h6>
                      <span>{formatDate(n.created_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="settings-dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="dark" size="sm">
              <FontAwesomeIcon icon={faCog} />
            </Dropdown.Toggle>
            <Dropdown.Menu align='end'>
              <Link href={route('students.profile.main')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faUser} fixedWidth /> Profile</Link>
              <Link href={route('students.profile.password')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faLock} fixedWidth /> Change Password</Link>
              <Link href={route('students.profile.picture')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faImage} fixedWidth /> Personal Picture</Link>
              <Dropdown.Divider />
              <Link href={route('students.timetable.list')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faTable} fixedWidth /> Timetable</Link>
              <Link href={route('students.ann')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faFlag} fixedWidth /> Annoucements</Link>
              <Link href={route('students.profile.study')}className='dropdown-item' role='button'><FontAwesomeIcon icon={faBook} fixedWidth /> Content</Link>
              <Dropdown.Divider />
              <Link href={route('students.assignments.list')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faQuestionCircle} fixedWidth /> Quizzes</Link>
              <Link href={route('students.quizzes.list')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faTasks} fixedWidth /> Assignments</Link>
              <Link href={route('students.summary.list')} className='dropdown-item' role='button'><FontAwesomeIcon icon={faCheck} fixedWidth /> Summaries</Link>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </div>

    </nav>
  )

}

export default StudentNavbar
