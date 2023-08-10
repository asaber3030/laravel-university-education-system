import { Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";
import {faCog, faGraduationCap} from "@fortawesome/free-solid-svg-icons";

const ProfessorNavbar = () => {

  const { professor } = usePage().props

  return (
    <div className='professor-navbar'>
      <div className="left-items">
        <ul>
          <li><Link href={route('professors.ann.list')}>Announcements</Link></li>
          <li><Link href={route('professors.timetable.list')}>Timetable</Link></li>
          <li><Link href={route('professors.students.list')}>Students</Link></li>
          <li><Link href={route('professors.staff.list')}>Teaching Staff</Link></li>
        </ul>

      </div>
      <div className="right-items">
        <ul>
          <li>
            <Link><FontAwesomeIcon icon={faUser} /> {professor.data.name}</Link>
            <div className="dropdown">
              <Link href=""><FontAwesomeIcon icon={faUser} /> <span>Profile</span></Link>
              <Link href=""><FontAwesomeIcon icon={faCog} /> <span>Settings</span></Link>
              <Link href=""><FontAwesomeIcon icon={faGraduationCap} /> <span>Student Settings</span></Link>
              <Link href=""><FontAwesomeIcon icon={faFileLines} /> <span>Exams</span></Link>
              <Link href=""><FontAwesomeIcon icon={faQuestionCircle} /> <span>Quizzes</span></Link>
              <Link href=""><FontAwesomeIcon icon={faIdCard} /> <span>Personal Information</span></Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfessorNavbar
