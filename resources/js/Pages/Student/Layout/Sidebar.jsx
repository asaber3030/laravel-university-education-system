import { Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";
import {
  faBell,
  faBook, faChalkboardTeacher,
  faCheck, faCog, faGraduationCap, faHand,
  faHandsHelping, faHistory, faHome, faIdBadge, faPaperclip,
  faPaperPlane,
  faPlay,
  faQuestionCircle, faSyncAlt, faTasks, faUser, faVideo
} from "@fortawesome/free-solid-svg-icons";

import Dropdown from 'react-bootstrap/Dropdown';

const StudentSidebar = ({ user }) => {

  const { appURL } = usePage().props

  return (
    <div className="student-sidebar-container">

      <div className="sidebar-header">

        <div className="image">
          <Tooltip title='Click to update' followCursor>
            <Link href={route('students.profile.picture')}>
              <img src={appURL + user.picture} alt="Student picture" />
            </Link>
          </Tooltip>
        </div>

        <div className="text">

          <h6 className='text-truncate-200'>{user.name}</h6>
          <Link href={route('students.profile.main')}>@{user.username}</Link>

          <div className="actions">
            <Dropdown>
              <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                <FontAwesomeIcon icon={faUser} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className='dropdown-item' href={route('students.profile.main')}><FontAwesomeIcon icon={faUser} fixedWidth={true} /> Profile</Link>
                <Link className='dropdown-item' href={route('students.profile.badges')}><FontAwesomeIcon icon={faIdBadge} fixedWidth={true} /> Badges</Link>
                <Link className='dropdown-item' href={route('students.profile.notifications')}><FontAwesomeIcon icon={faBell} fixedWidth={true} /> Notifications</Link>
                <Dropdown.Divider />
                <Link className='dropdown-item' href={route('students.profile.study')}><FontAwesomeIcon icon={faBook} fixedWidth={true} /> Studying Content</Link>
                <Link className='dropdown-item' href={route('students.subjects.list')}><FontAwesomeIcon icon={faVideo} fixedWidth={true} /> Courses</Link>
                <Dropdown.Divider />
                <Link className='dropdown-item' href={route('students.quizzes.list')}><FontAwesomeIcon icon={faQuestionCircle} fixedWidth={true} /> Quizzes</Link>
                <Link className='dropdown-item' href={route('students.assignments.list')}><FontAwesomeIcon icon={faTasks} fixedWidth={true} /> Assignments</Link>
                <Link className='dropdown-item' href={route('students.semesters.list')}><FontAwesomeIcon icon={faCheck} fixedWidth={true} /> Exams Results</Link>
                <Dropdown.Divider />
                <Link className='dropdown-item' href={route('students.profile.report')}><FontAwesomeIcon icon={faHandsHelping} /> Have a problem?</Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>

      <div className="sidebar-content">

        <ul>

          <span className='links-title'>Current Data</span>
          <div className="group-lis">
            <li><Link href={route('students.dashboard')}><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Link></li>
            <li><Link href={route('students.subjects.list')}><FontAwesomeIcon icon={faBook} fixedWidth /> Subjects</Link></li>
            <li><Link href={route('students.quizzes.list')}><FontAwesomeIcon icon={faQuestionCircle} fixedWidth /> Quizzes</Link></li>
            <li><Link href={route('students.assignments.list')}><FontAwesomeIcon icon={faTasks} fixedWidth /> Assignments</Link></li>
            <li><Link href={route('students.summary.list')}><FontAwesomeIcon icon={faPaperclip} fixedWidth /> Summaries</Link></li>
          </div>

          <span className='links-title'>Faculty</span>
          <div className="group-lis">
            <li><Link href={route('students.semesters.list')}><FontAwesomeIcon icon={faGraduationCap} fixedWidth /> Semesters</Link></li>
          </div>

          <span className='links-title'>Account</span>
          <div className="group-lis">
            <li><Link href={route('students.profile.main')}><FontAwesomeIcon icon={faUser} fixedWidth /> Profile</Link></li>
            <li><Link href={route('students.profile.notifications')}><FontAwesomeIcon icon={faBell} fixedWidth /> Notifications</Link></li>
          </div>

          <span className='links-title'>University</span>
          <div className="group-lis">
            <li><Link href={route('students.profile.report')}><FontAwesomeIcon icon={faHand} fixedWidth /> Report a problem</Link></li>
          </div>

        </ul>

      </div>

    </div>
  )

}

export default StudentSidebar
