import { Link } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ACTIVE_SETTING_PAGE } from "@/helpers/constants";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import {
  faChalkboardTeacher, faCheck,
  faClock,
  faCog,
  faFilePdf,
  faGlobe, faHelmetSafety,
  faIdBadge, faLayerGroup,
  faLock, faPlus,
  faRotate,
  faSign,
  faSignIn, faSort, faToolbox, faUsers
} from "@fortawesome/free-solid-svg-icons";

const SettingsSidebar = ({ activePage }) => {

  return (
    <div className='student-settings-sidebar'>

      <ul>

        <div className="label-settings">
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['app'] && 'active'} href={route('professors.settings.app')}><FontAwesomeIcon icon={faToolbox} /> <span>App</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['departments'] && 'active'} href={route('professors.settings.departments')}><FontAwesomeIcon icon={faLayerGroup} /> <span>Departments</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['professors'] && 'active'} href={route('professors.settings.professors')}><FontAwesomeIcon icon={faChalkboardTeacher} /> <span>Professors</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['assistants'] && 'active'} href={route('professors.settings.assistants')}><FontAwesomeIcon icon={faHelmetSafety} /> <span>Assistants</span></Link></li>

          <li><Link className={activePage == ACTIVE_SETTING_PAGE['student_settings'] && 'active'} href={route('professors.settings.students.main')}><FontAwesomeIcon icon={faCog} /> <span>Students Settings</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['default_password'] && 'active'} href=''><FontAwesomeIcon icon={faLock} /> <span>Default Password</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['reseting_password'] && 'active'} href=''><FontAwesomeIcon icon={faRotate} /> <span>Reseting Password</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['login_status'] && 'active'} href=''><FontAwesomeIcon icon={faSignIn} /> <span>Login Status</span></Link></li>
          <li><Link className={activePage == ACTIVE_SETTING_PAGE['summary'] && 'active'} href=''><FontAwesomeIcon icon={faFilePdf} /> <span>Summary ( Students Content )</span></Link></li>
        </div>

      </ul>

    </div>
  )
}

export default SettingsSidebar
