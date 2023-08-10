import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import '@/assets/css/students/global-students.scss'
import './assignments.scss'

import React from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";

import { faPaperPlane, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileInput, FormContainer, InputField, TextArea } from "@/components/Form/FormContainer";


const SendAnswer = () => {

  const { appURL, user, assignment } = usePage().props

  const { data, setData, post, errors, processing } = useForm({
    file: '',
    notes: ''
  })

  const handleAnswering = () => {
    post(route('students.assignments.answer', [assignment.id, assignment.code]))
  }

  return (
    <StudentLayout user={user}>

      <Head
        title={`Answering assignment - ${assignment.code}`}
      />

      <div className="view-assignment">
        <PageHeader
          pageTitle={<span>Answering Assignment: <b>{assignment.code}</b> - Subject: <b>{assignment.subject.title}</b></span>}
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
              label='Notes'
              labelRequired={false}
              handleChange={ e => setData('notes', e.target.value) }
            />

            <button onClick={handleAnswering} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faPaperPlane} /> Submit Answer!</button>

          </FormContainer>
        </div>

      </div>

    </StudentLayout>
  )
}

export default SendAnswer
