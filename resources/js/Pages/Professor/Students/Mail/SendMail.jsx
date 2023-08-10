import './send-mail.scss'

import {useForm, usePage, Link} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

import showStudentName from "@/helpers/functions/showStudentName";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailForward } from "@fortawesome/free-solid-svg-icons";

import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useEffect, useState} from "react";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MAIL_IMPORTANCE} from "@/helpers/constants";
import formatDate from "@/helpers/functions/format-date";
import {Inertia} from "@inertiajs/inertia";


const SendMail = () => {

  const { student, students, appURL } = usePage().props
  const [editorData, setEditorData] = useState('')
  const [choosedStudentEmail, setChoosedStudentEmail] = useState(student.email)
  const [choosedStudent, setChoosedStudent] = useState(student.id)
  const [importance, setImportance] = useState(0)

  const { data, setData, post, errors } = useForm({

    content: editorData,
    importance: importance,
    email: student.email,
    subject: ''
  })

  const handleSelectStudent = (event) => {
    setData('email', event.target.value)
  }

  const submitEmail = () => {
    post(route('professors.students.mail', student.id))
  }

  return (
    <ProfessorLayout>
      <div className="layout-header">
        <h6><FontAwesomeIcon icon={faMailForward} /> Send Mail To - {showStudentName(student)}</h6>
      </div>

      <div className="send-email">
        <div className="left-data">
          <div className="user">
            <img src={appURL + student.picture} alt=""/>
            <span>{student.name} <span>{student.username}</span></span>
          </div>
          <div className="list-emails">
            <h6>Mails belongs to student</h6>
            <ul>
              {student.mails.map(mail => (
                <li onClick={ () => Inertia.get(route('professors.students.mails', [mail.student, mail.id])) }>
                  <div className="left-mail-data truncate-180">{mail.subject}</div>
                  <div className="right-mail-data">{formatDate(mail.created_at)}</div>
                </li>
              ))}
            </ul>
            <Link href={route('professors.students.mails', student.id)}><FontAwesomeIcon icon={faMailForward} /> All Mails</Link>
          </div>
        </div>
        <div className='right-data'>
          <h6>Sending Mail</h6>
          <div className="form-container">

            <div className="form-group">
              <InputLabel value='To' />
              <div>
                <div className="flex-box">
                  <select className='form-select' onChange={handleSelectStudent}>
                    {students.map(st => (
                      <option key={st.id} value={st.email} selected={st.id == student.id ? true : false}>{st.name + ' ' + st.national_id}</option>
                    ))}
                  </select>
                  <TextInput value={data.email} handleChange={ e => setData('email', e.target.value) } />
                </div>
                <InputError message={errors.id} />
              </div>
            </div>

            <div className="form-group">
              <InputLabel value='Subject' />
              <div>
                <TextInput handleChange={ e => setData('subject', e.target.value) } />
                <InputError message={errors.subject} />
              </div>
            </div>

            <div className="form-group">
              <InputLabel value='Importance' />
              <div>
                <select className='form-select' onChange={(e) => setData('importance', e.target.value)}>
                  <option value="0">{MAIL_IMPORTANCE[0]}</option>
                  <option value="1">{MAIL_IMPORTANCE[1]}</option>
                  <option value="2">{MAIL_IMPORTANCE[2]}</option>
                  <option value="3">{MAIL_IMPORTANCE[3]}</option>
                  <option value="4">{MAIL_IMPORTANCE[4]}</option>
                </select>
                <InputError message={errors.importance} />
              </div>
            </div>

            <div className="form-group">
              <InputLabel value='Message' />
              <div>
                <CKEditor
                  editor={ ClassicEditor }
                  data={editorData}
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    setData('content', data)
                  }}
                />
                <InputError message={errors.content} />
              </div>
            </div>

            <div className="form-group">
              <label></label>
              <div>
                <button onClick={submitEmail} className='btn btn-primary'><FontAwesomeIcon icon={faMailForward} /> Send</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProfessorLayout>
  );
}

export default SendMail
