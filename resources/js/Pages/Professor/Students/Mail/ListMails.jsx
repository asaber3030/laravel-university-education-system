import './send-mail.scss'
import {Inertia} from "@inertiajs/inertia";
import { useForm, usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

import showStudentName from "@/helpers/functions/showStudentName";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock, faMailForward, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"

import { MAIL_IMPORTANCE } from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";
import capitilize from "@/helpers/functions/capitilize";


const ListMails = () => {

  const { student, mail, appURL } = usePage().props

  return (
    <ProfessorLayout>
      <div className="layout-header">
        <h6>
          <FontAwesomeIcon icon={faMailForward} />
          {mail ? (
            <span> Subject: {mail.subject}</span>
          ) : (
            <span> Mails sent to <b>{student.name}</b></span>
          )}
        </h6>
        <div className="layout-actions">
          <Link href={route('professors.students.mail', student.id)} className='btn btn-primary'><FontAwesomeIcon icon={faPlus} /> Send Mail</Link>
          {mail && (
            <Link href={route('professors.students.mail.delete', [student.id, mail.id])} className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /> Trash</Link>
          )}
        </div>
      </div>

      {mail && (
        <div className="send-email list-student-mails">
          <div className="left-data">
            <div className="list-emails">
              <ul>
                {student.mails.map(ma => (
                  <li onClick={() => Inertia.get(route('professors.students.mails', [ma.student, ma.id]))} className={mail && ma.id == mail.id ? 'active' : 'not-active'}>
                    <div className="left-mail-data truncate-180">{ma.subject}</div>
                    <div className="right-mail-data">{formatDate(ma.created_at)}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='right-data view-mail-data'>
            <h6>{mail.subject} <span><FontAwesomeIcon icon={faClock} /> {formatDate(mail.created_at)}</span></h6>
            <div className="mail-content">
              <div className="user">
                <img src={appURL + student.picture} alt="" />
                <span>{student.name} <span>{student.department.title}</span></span>
              </div>
              <div className="mail-importance-status">
                {mail.importance == 0 && (
                  <div className="alert alert-secondary"><b>IMPORTANCE DEGREE</b>: {capitilize(MAIL_IMPORTANCE[mail.importance])}</div>
                )}
                {mail.importance == 1 && (
                  <div className="alert alert-info"><b>IMPORTANCE DEGREE</b>: {capitilize(MAIL_IMPORTANCE[mail.importance])}</div>
                )}
                {mail.importance == 2 && (
                  <div className="alert alert-primary"><b>IMPORTANCE DEGREE</b>: {capitilize(MAIL_IMPORTANCE[mail.importance])}</div>
                )}
                {mail.importance == 3 && (
                  <div className="alert alert-warning"><b>IMPORTANCE DEGREE</b>: {capitilize(MAIL_IMPORTANCE[mail.importance])}</div>
                )}
                {mail.importance == 4 && (
                  <div className="alert alert-danger"><b>IMPORTANCE DEGREE</b>: {capitilize(MAIL_IMPORTANCE[mail.importance])}</div>
                )}
              </div>
              <div className="mail-paragraph">
                <div dangerouslySetInnerHTML={{ __html: mail.content }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {mail == null && (
        <div className="list-null-page">
          <ul>
            {student.mails.map(ma => (
              <li>
                <Link href={route('professors.students.mails', [student.id, ma.id])} className="left-mail-data">
                  <img src={appURL + student.picture} alt="" />
                  <div>
                    <span>{ma.subject}</span>
                    <span>{student.name}</span>
                  </div>
                </Link>
                <div className="right-mail-data">{formatDate(ma.created_at, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hours: 'numeric',
                  minute: 'numeric'
                })}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

    </ProfessorLayout>
  );
}

export default ListMails
