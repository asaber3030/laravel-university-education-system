import { Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBook, faChalkboardTeacher,
  faCheck, faCog,
  faDashboard,
  faGraduationCap, faHandsHelping,
  faLayerGroup, faLock,
  faPlay,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";

const ProfessorSidebar = () => {

  const { flash, professor, appURL } = usePage().props

  return (
    <div className='professor-sidebar'>
      <div className="top-sidebar">
        <div className="left-items">
          <img className='professor-image' src={appURL + professor.data.picture} />
        </div>
        <div className="right-items">
          <h5>{professor.data.title} <b>{professor.data.name}</b></h5>
          <h6><Link href=''>{professor.data.username}</Link></h6>
        </div>
      </div>
      <div className="sidebar-links">
        <ul>
          <div className="group-links">
            <h6>Faculty</h6>
            <li><Link href={route('professors.dashboard')}><FontAwesomeIcon icon={faDashboard} /> <span>Dashboard</span></Link></li>
            <li><Link href={route('professors.students.list')}><FontAwesomeIcon icon={faGraduationCap} /> <span>Students</span></Link></li>
            <li><Link href={route('professors.deps.list')}><FontAwesomeIcon icon={faBook} /> <span>Departments</span></Link></li>
            <li><Link href={route('professors.subjects.list')}><FontAwesomeIcon icon={faLayerGroup} /> <span>Subjects</span></Link></li>
            <li><Link href={route('professors.courses.list')}><FontAwesomeIcon icon={faPlay} /> <span>Courses</span></Link></li>
            <li><Link href={route('professors.ass.list', '')}><FontAwesomeIcon icon={faCheck} /> <span>Assignments</span></Link></li>
            <li><Link href={route('professors.quiz.list')}><FontAwesomeIcon icon={faQuestionCircle} /> <span>Quizzes</span></Link></li>
            <li><Link href={route('professors.list')}><FontAwesomeIcon icon={faChalkboardTeacher} /> <span>Professors</span></Link></li>
          </div>
          <hr/>
          <div className="group-links">
            <h6>Website</h6>
            <li className='settings-link-li'><Link href={route('professors.quiz.list')}><FontAwesomeIcon icon={faUser} /> <span>Profile</span></Link></li>
            <li className='settings-link-li'><Link href={route('professors.settings.app')}><FontAwesomeIcon icon={faCog} /> <span>Settings</span></Link></li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default ProfessorSidebar
