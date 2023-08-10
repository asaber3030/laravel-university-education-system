import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import '@/assets/css/students/global-students.scss'
import './assignments.scss'

import React from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import {faEdit, faPaperPlane, faTasks} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FileInput, FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";
import {faSave} from "@fortawesome/free-regular-svg-icons";


const SendAnswer = () => {

  const { appURL, user, assignment, answer } = usePage().props

  const { data, setData, post, errors, processing } = useForm({
    file: '',
    notes: answer[0].notes
  })

  const handleUpdateAnswer = () => {
    post(route('students.assignments.answer.update', [assignment.id, assignment.code]))
  }

  return (
    <StudentLayout user={user}>

      <Head
        title={`Update assignment answer - ${assignment.code}`}
      />
      <div className="view-assignment">
        <PageHeader
          pageTitle={<span>Update Assignment Answer: <b>{assignment.code}</b> - Subject: <b>{assignment.subject.title}</b></span>}
          pageIcon={faTasks}
        />

        <div className="send-answer-container">
          <FormContainer>

            <FileInput
              error={errors.file}
              handleChange={ e => setData('file', e.target.files[0]) }
              label='Add File'
            />

            <TextArea
              value={data.notes}
              label='Notes'
              labelRequired={false}
              handleChange={ e => setData('notes', e.target.value) }
            />

            <button onClick={handleUpdateAnswer} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faSave} /> Save</button>

          </FormContainer>
        </div>

      </div>

    </StudentLayout>
  )
}

export default SendAnswer
