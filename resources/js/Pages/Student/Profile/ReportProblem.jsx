import React, {useState} from "react";

import '@/assets/css/students/global-students.scss'
import './profile.scss'

import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";

import log from "@/helpers/functions/log";
import formatDate from "@/helpers/functions/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import {nationalID} from "@/helpers/functions/student";
import {
  faBuilding,
  faClock,
  faEnvelope, faFlag,
  faIdCard,
  faLocation,
  faPlus,
  faUniversity
} from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";
import Loading from "@/components/Loading/Loading";
import {fullDateOptions} from "@/helpers/constants";

const ReportProblem = () => {

  const { appURL, user, problems } = usePage().props

  const [activeTab, setActiveTab] = useState('mine')

  const { data, processing, setData, errors, post } = useForm({
    title: '',
    description: '',
  })

  const handleUpdate = () => {
    post(route('students.profile.report'))
  }

  return (
    <StudentLayout user={user}>
      <Head title='Report a problem' />

      <Loading load={processing} />

      <ProfileLayout activePage='problem'>

        <div className="tabs flex gap-2 border-b-2 py-3">
          <button onClick={ () => setActiveTab('mine') } className={`btn btn-sm btn-dark ${activeTab == 'mine' && 'active'}`}><FontAwesomeIcon icon={faFlag} /> My Problems & Answers</button>
          <button onClick={ () => setActiveTab('new') } className={`btn btn-sm btn-dark ${activeTab == 'new' && 'active'}`}><FontAwesomeIcon icon={faPlus} /> New Report</button>
        </div>

        {activeTab == 'new' && (
          <div className="send-report">
            <FormContainer>

              <InputField value={data.title} label='Problem Title' error={errors.title} handleChange={ e => setData('title', e.target.value) } />
              <TextArea value={data.description} label='Description' error={errors.description} handleChange={ e => setData('description', e.target.value) } />

              <button onClick={ handleUpdate } className="btn btn-sm btn-dark">Send Report</button>

            </FormContainer>
          </div>
        )}

        {activeTab == 'mine' && (
          <div>
            {problems.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Report ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Answered?</th>
                    <th scope="col">Sent in</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                <tbody>
                {problems.map(problem => (
                  <tr key={problem.id}>
                    <th scope="row">{problem.id}</th>
                    <td>{problem.answer ? <span className="text-success">Yes</span> : <span className="text-primary">Not Yet</span>}</td>
                    <td className='truncate-200'>{problem.title}</td>
                    <td>{formatDate(problem.created_at, fullDateOptions)}</td>
                    <td><Link href={route('students.profile.report.view', problem.id)} className='btn btn-sm btn-secondary'>View</Link></td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-sm alert-dark">No Reports found!</div>
            )}
          </div>
        )}

      </ProfileLayout>

    </StudentLayout>
  )
}

export default ReportProblem
