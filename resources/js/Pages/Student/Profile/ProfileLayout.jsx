import '@/assets/css/students/global-students.scss'
import './profile.scss'

import { Link, usePage } from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBell,
  faBook,
  faHandsHelping, faIdBadge, faImage, faLock,
  faPaperPlane,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const ProfileLayout = ({ children, activePage = 'profile' }) => {

  const { appURL, user } = usePage().props

  return (
    <div className='profile-layout'>
      <div className="left-profile">
        <div className="profile-header">
          <img src={appURL + user.picture} alt=""/>
          <div>
            <h6>{user.name}</h6>
            <span><Link>{user.username}</Link></span>
          </div>
        </div>
        <div className="profile-urls">
          <Link href={route('students.profile.main')} className={`${activePage == 'profile' && 'active'}`}><FontAwesomeIcon icon={faUser} fixedWidth={true} /> Profile</Link>
          <Link href={route('students.profile.picture')} className={`${activePage == 'picture' && 'active'}`}><FontAwesomeIcon icon={faImage} fixedWidth={true} /> Picture</Link>
          <Link href={route('students.profile.password')} className={`${activePage == 'password' && 'active'}`}><FontAwesomeIcon icon={faLock} fixedWidth={true} /> Password</Link>
          <Link href={route('students.profile.badges')} className={`${activePage == 'badges' && 'active'}`}><FontAwesomeIcon icon={faIdBadge} fixedWidth={true} /> Badges</Link>
          <Link href={route('students.profile.notifications')} className={`${activePage == 'notifications' && 'active'}`}><FontAwesomeIcon icon={faBell} fixedWidth={true} /> Notifications</Link>
          <Link href={route('students.profile.study')} className={`${activePage == 'content' && 'active'}`}><FontAwesomeIcon icon={faBook} fixedWidth={true} /> Studying Content</Link>
          <Link href={route('students.profile.report')} className={`${activePage == 'problem' && 'active'}`}><FontAwesomeIcon icon={faHandsHelping} /> Have a problem?</Link>
        </div>
      </div>
      <div className="right-profile">
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout
