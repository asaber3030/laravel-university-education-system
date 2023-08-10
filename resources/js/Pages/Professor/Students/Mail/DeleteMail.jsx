import './send-mail.scss'
import {Inertia} from "@inertiajs/inertia";
import { useForm, usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

import showStudentName from "@/helpers/functions/showStudentName";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faMailForward, faPlus, faTimes, faTrash, faUserEdit} from "@fortawesome/free-solid-svg-icons";

import DeleteImage from '../../../../assets/images/delete.svg'

import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"

import { MAIL_IMPORTANCE } from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";
import capitilize from "@/helpers/functions/capitilize";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";


const DeleteMail = () => {

  const { student, mail, appURL } = usePage().props

  const submitDelete = () => {
    Inertia.post(route('professors.students.mail.delete', [student.id, mail.id]))
  }

  return (
    <ProfessorLayout>
      <div className="layout-header">
        <h6>
          <FontAwesomeIcon icon={faMailForward} />
          <span> Subject: {mail.subject}</span>
        </h6>
        <div className="layout-actions">
          <Link href={route('professors.students.mail', student.id)} className='btn btn-primary'><FontAwesomeIcon icon={faPlus} /> Send Mail</Link>
        </div>
      </div>

      <div className="delete-mail-view">
        <div className="user">
          <div className="left-user">
            <img src={appURL + student.picture} alt="Student Picture" />
            <div className="text">
              <h6>{student.name}</h6>
              <span>{student.department.title}</span>
            </div>
          </div>
          <div className='right-user'>
            <Link href={route('professors.students.mail', [student.id])} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faMailForward} /> Send Mail</Link>
            <Link className='btn btn-danger btn-sm'><FontAwesomeIcon icon={faTrash} /> Delete</Link>
            <Link className='btn btn-success btn-sm'><FontAwesomeIcon icon={faUserEdit} /> Edit</Link>
          </div>
        </div>
        <ActionAlert
          title="You're about to delete a mail!"
          paragraph={"Are you sure that you want to remove thisitem mail subject: <b>" + mail.subject + "</b> that was sent to student: <Link href={route('professors.students.view', student.id)}>" + student.name + "</Link> ?"}
          cancelRoute='professors.students.view'
          cancelParams={student.id}
          submitAction={submitDelete}
          type='delete'
        />

      </div>

    </ProfessorLayout>
  );
}

export default DeleteMail
