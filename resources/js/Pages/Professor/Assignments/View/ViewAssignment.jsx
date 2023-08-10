import './view-assignment.scss';

import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import Loading from "@/components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDownload, faEye, faFile,
  faHashtag, faLink, faPaperPlane, faPlay,
  faPlus, faQuestionCircle,
  faTimes, faSave
} from "@fortawesome/free-solid-svg-icons";

import { Tooltip } from "@mui/material";
import { FileInput, FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

import SettingsImage from '@/assets/images/settings.svg'
import AnswerImage from '@/assets/images/answer.svg'
import WarningImage from '@/assets/images/warning.svg'
import ViewImage from '@/assets/images/view.svg'
import DeleteImage from '@/assets/images/delete.svg'
import {Inertia} from "@inertiajs/inertia";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";

const ViewAssignment = () => {

  const { assignment, studentsWithNoAnswers, studentsWithAnswers, panel, appURL } = usePage().props
  console.log(studentsWithNoAnswers)

  const [activeAnswerTab, setAnswerActiveTab] = useState({ t1: true, t2: false })

  const { data, post,  setData, processing, errors } = useForm({
    title: assignment.title,
    information: assignment.information,
    code: assignment.code,
    link: assignment.link,
    accept_answers: assignment.accept_answer,
    allow_update: assignment.allow_update,
    file: '',
    deadline: assignment.deadline
  })

  const [reason, setReason] = useState('')

  const sendWarning = () => {
    Inertia.post(route('professors.ass.send-warning', assignment.id), {
      reason
    })
  }
  const submitUpdateAssignment = () => {
    post(route('professors.ass.view', [assignment.id, 'settings']))
  }
  const handleDelete = () => {
    Inertia.post(route('professors.ass.delete', [assignment.id]))
  }

  return (
    <ProfessorLayout>

      <Loading load={processing} />

      {panel == 'settings' && (
        <Head title={`${assignment.code} - Assignment Settings`} />
      )}
      {panel == 'preview' && (
        <Head title={`${assignment.code} - Preview Assignment`} />
      )}
      {panel == 'Delete' && (
        <Head title={`${assignment.code} - Delete Assignment`} />
      )}
      {panel == 'warnings' && (
        <Head title={`${assignment.code} - Warnings Of Assignments`} />
      )}
      {panel == 'answers' && (
        <Head title={`${assignment.code} - Assignment Answers`} />
      )}

      <ProfessorLayoutHeader icon={faQuestionCircle} title={<span>Assignment - <b>{assignment.code}</b> of <b>{assignment.year.title} - {assignment.year.term_name}</b></span>}>
        <Tooltip title='New Assignment'>
          <Link href={route('professors.ass.choose-year')} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPlus} /></Link>
        </Tooltip>
      </ProfessorLayoutHeader>

      <div className="group-container">

        <div className="list-links">

          <Link
            href={route('professors.ass.view', [assignment.id, 'preview'])}
            className={`link-section ${panel == 'preview' && 'active'}`}>
            <img src={ViewImage} />
            <h6>Preview</h6>
          </Link>

          <Link
            href={route('professors.ass.view', [assignment.id, 'settings'])}
            className={`link-section ${panel == 'settings' && 'active'}`}>
            <img src={SettingsImage} />
            <h6>Settings</h6>
          </Link>

          <Link
            href={route('professors.ass.view', [assignment.id, 'answer'])}
            className={`link-section ${panel == 'answer' && 'active'}`}>
            <img src={AnswerImage} />
            <h6>Answers</h6>
          </Link>

          <Link
            href={route('professors.ass.view', [assignment.id, 'warnings'])}
            className={`link-section ${panel == 'warnings' && 'active'}`}>
            <img src={WarningImage} />
            <h6>Warnings</h6>
          </Link>

          <Link
            href={route('professors.ass.view', [assignment.id, 'delete'])}
            className={`link-section ${panel == 'delete' && 'active'}`}>
            <img src={DeleteImage} />
            <h6>Delete</h6>
          </Link>

        </div>

        <div className="group-details">

          {panel == 'preview' && (
            <div className="default-section">
              <h6 className="default-title">Preview</h6>

              <div className="assignment-details">
                <h6 className='assignment-title'><FontAwesomeIcon icon={faHashtag}/> {assignment.title}</h6>
                <p>{assignment.information}</p>

                <h6 className='assignment-title'>Published By:</h6>
                <div className="d-flex">
                  <div className="professor">
                    <img src={appURL + assignment.professor.picture} alt="Professor Picture" />
                    <h6>
                      {assignment.professor.name}
                      <span>{assignment.professor.title}</span>
                    </h6>
                  </div>
                  <div className="file-download">
                    <h6>Attached File</h6>
                    <Link className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faEye} /> Preview</Link>
                    <Link className='btn btn-sm btn-success'><FontAwesomeIcon icon={faDownload} /> Download</Link>
                  </div>
                  <div className="link">
                    <h6>Attached URL</h6>
                    <Link><FontAwesomeIcon icon={faLink} /> Preview</Link>
                  </div>
                </div>

                <div className="course-details">
                  <h6 className='default-title'><FontAwesomeIcon icon={faPlay} /> Course Details</h6>
                  <Link href={route('professors.courses.view', assignment.course.id)}>{assignment.course.title}</Link> - <Link href={route('professors.subjects.chapters', assignment.course.subject.id)}>{assignment.course.subject.title} ({assignment.course.subject.code})</Link>
                  {assignment.course.subject.chapters.length > 0 ? (
                    <div className='chapters-group'>
                      <div className="chapters">
                        <h6 className='title-gr'><FontAwesomeIcon icon={faFile} /> Chapters</h6>
                        {assignment.course.subject.chapters.map(ch => (
                          <div key={Math.random()} className="chapter"><b>Chapter {ch.number}</b> - {ch.name}</div>
                        ))}
                      </div>
                      <div className="lectures">
                        <h6 className='title-gr'><FontAwesomeIcon icon={faFile} /> Lectures</h6>
                        {assignment.course.lectures.map(lec => (
                          <div key={Math.random()} className="lecture"><Link href={route('professors.courses.view.lecture', [lec.course, lec.id])}>{lec.title}</Link></div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-sm alert-warning">
                      Subject <b>{assignment.course.subject.title}</b> doesn't have any chapters! <Link className="alert-link" href={route('professors.subjects.create.chapter', assignment.course.subject.id)}>Click here</Link> to add new chapters
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {panel == 'settings' && (
            <div className="default-section settings-preview-page">

              <h6 className='default-title'>Settings</h6>

              <FormContainer>

                <div className='course-details-div'>
                  <Link>{assignment.course.title}</Link> - <Link>{assignment.course.subject.title}</Link>
                </div>

                <InputField error={errors.title} handleChange={ e => setData('title', e.target.value) } value={data.title} label='Assignment Title' />

                <InputField error={errors.code} handleChange={ e => setData('code', e.target.value) } value={data.code} label='Code' />

                <InputField error={errors.link} handleChange={ e => setData('link', e.target.value) } labelRequired={false}  value={data.link} type='URL' label='Attached Link' />

                <InputField error={errors.deadline} handleChange={ e => setData('deadline', e.target.value) } value={data.deadline} type='datetime-local' label='Deadline' />

                <div className="item-select-box">
                  <SelectBox
                    label='Allow Answers'
                    selectedOptionValue={assignment.accept_answer}
                    items={[
                      { value: 1, text: 'Allow' },
                      { value: 0, text: 'Disable' }
                    ]}
                    handleChange={ e => setData('accept_answers', e.target.value) }
                  />
                  <SelectBox
                    label='Allow Updating Answers'
                    selectedOptionValue={assignment.allow_update}
                    items={[
                      { value: 1, text: 'Allow' },
                      { value: 0, text: 'Disable' }
                    ]}
                    handleChange={ e => setData('allow_update', e.target.value) }
                  />
                </div>

                <FileInput error={errors.file} handleChange={ e => setData('file', e.target.files[0]) } labelRequired={false} label='File' />

                <TextArea error={errors.information} handleChange={ e => setData('information', e.target.value) } labelRequired={false} value={data.information} label='Assignment Details' />

                <button onClick={submitUpdateAssignment} className='btn btn-success btn-sm'><FontAwesomeIcon icon={faSave} /> Save</button>

              </FormContainer>
            </div>
          )}

          {panel == 'answer' && (
            <div className="default-section answers-div">
              <h6 className="default-title">Answers</h6>

              <div className="tabs">
                <dv className={`tab ${activeAnswerTab.t1 ? 'active' : ''}`} onClick={ () => setAnswerActiveTab({ t1: true, t2: false }) }>
                  <FontAwesomeIcon icon={faCheck} />
                  Answered: <b>{studentsWithAnswers.length} student</b>
                </dv>
                <dv className={`tab ${activeAnswerTab.t2 ? 'active' : ''}`} onClick={ () => setAnswerActiveTab({ t1: false, t2: true }) }>
                  <FontAwesomeIcon icon={faTimes} />
                  Not Answered: <b>{studentsWithNoAnswers.length} student</b>
                </dv>
              </div>

              {activeAnswerTab.t1 && (
                <div className="assignments-list">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Answer ID</th>
                        <th>Student</th>
                        <th>Assignment</th>
                        <th>Course</th>
                        <th>Subject</th>
                        <th>Grade Assigned?</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {studentsWithAnswers.map(student => (
                      <tr key={student.id}>
                        <td>{student.assignments_answers[0].id}</td>
                        <td><Link href={route('professors.')}>{student.username}</Link></td>
                        <td>{student.assignments_answers[0].assignment.code}</td>
                        <td><Link href={route('professors.courses.view', student.assignments_answers[0].assignment.course.id)}>{student.assignments_answers[0].assignment.course.title}</Link></td>
                        <td><Link href={route('professors.subjects.chapters', student.assignments_answers[0].assignment.course.subject.id)}>{student.assignments_answers[0].assignment.course.subject.title}</Link></td>
                        <td>Yes</td>
                        <td>
                          <Tooltip title='View Answer'>
                            <Link className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faEye} /></Link>
                          </Tooltip>
                          <Tooltip title='Assign Grade'>
                            <Link className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faPlus} /></Link>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeAnswerTab.t2 && (
                <div className="assignments-list">
                  <table className="table table-striped">
                    <thead>
                    <tr>
                      <th>Student ID</th>
                      <th>Student Username</th>
                      <th>Assignment</th>
                      <th>Subject</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentsWithNoAnswers.map(student => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.username}</td>
                        <td>{assignment.code}</td>
                        <td><Link href={route('professors.subjects.chapters', assignment.subject.id)}>{assignment.subject.title} / {assignment.subject.code}</Link></td>
                        <td>
                          <Link className='btn btn-warning btn-sm'>Send Warning</Link>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {panel == 'warnings' && (
            <div className="default-section warnings-div">
              <h6 className="default-title"><FontAwesomeIcon icon={faPaperPlane} /> Send Warnings!</h6>

              <FormContainer>

                <TextArea label={'Reason'} handleChange={ e => setReason(e.target.value) } value={reason} />
                <div className='alert alert-sm alert-dark'><b>Notice</b>: This warnings will be sent to the students who didn't send the answers! <br /> <b>Note that:</b> Reason must be greater than 10 letters!</div>

                {reason && reason.length > 10 && (
                  <button onClick={sendWarning} className='btn btn-warning btn-sm'><FontAwesomeIcon icon={faPaperPlane} /> Send Warnings</button>
                )}

              </FormContainer>

            </div>
          )}

          {panel == 'delete' && (
            <div className="default-section delete-section">
              <h6 className='default-title'>Delete Assignment</h6>
              <ActionAlert
                title={<span>Delete Assignment <b>{assignment.code} ?</b></span>}
                type='delete'
                submitAction={handleDelete}
                cancelRoute={'professors.ass.list'}>
                <span>Are you sure that you want to delete this assignment <b>{assignment.code}</b></span>
              </ActionAlert>

            </div>
          )}

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ViewAssignment
