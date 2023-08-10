import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBook, faCog, faEllipsis, faGraduationCap, faTrash, faTrashRestore} from "@fortawesome/free-solid-svg-icons";
import {Link} from "@inertiajs/inertia-react";
import {faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";

const StudentActionsDropdown = ({ student }) => {
  return (
    <div className="custom-dropdown">
      <button className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEllipsis} /></button>
      <div className="dropdown-content">
        <Link href={route('professors.students.view', student.id)}><FontAwesomeIcon icon={faUser} /> <span>View</span></Link>
        <Link href={route('professors.students.current-semester', student.id)}><FontAwesomeIcon icon={faGraduationCap} /> <span>Current Semester</span></Link>
        <Link href=''><FontAwesomeIcon icon={faIdCard} /> <span>Information</span></Link>
        <hr />
        <Link href=''><FontAwesomeIcon icon={faFileLines} /> <span>Exams</span></Link>
        <Link href=''><FontAwesomeIcon icon={faQuestionCircle} /> <span>Quizzes</span></Link>
        <Link href={route('professors.students.semesters', student.id)}><FontAwesomeIcon icon={faBook} /> <span>Studying Years</span></Link>
        <hr />
        <Link href=''><FontAwesomeIcon icon={faCog} /> <span>Update</span></Link>
        <Link href=''><FontAwesomeIcon icon={faTrash} /> <span>Delete</span></Link>
        <Link href=''><FontAwesomeIcon icon={faTrashRestore} /> <span>Restore</span></Link>
      </div>
    </div>
  )
}

export default StudentActionsDropdown
