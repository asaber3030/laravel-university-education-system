import '@/assets/css/students/global-students.scss'
import './summary.scss'

import React, { useEffect, useState } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Loading from "@/components/Loading/Loading";
import NotFoundAlert from "@/components/NotFoundAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

const CreateSummary = () => {

  const { user, subjects, chapters } = usePage().props

  const { data, setData, errors, processing, post } = useForm({
    subject: '',
    chapter: '',
    file: '',
    quick_preview: '',
    description: '',
    private: ''
  })

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedChapters, setSelecetedChapters] = useState([])

  useEffect(() => {
    if (selectedSubject) {
      setSelecetedChapters(chapters.filter(ch => ch.subject == selectedSubject))
    }
  }, [selectedSubject])

  const handleCreation = () => {
    post(route('students.summary.create'))
  }

  return (
    <StudentLayout user={user}>

      <Head title='Create new summary' />

      <PageHeader
        pageTitle='New Summary'
        pageIcon={faPlus}
      />

      <Loading load={processing} />

      <div className="create-summary-container">

        <FormContainer>

          <SelectBox
            label='Subject'
            items={subjects.map(subject => {
              return { text: `${subject.title} (${subject.code})`, value: subject.id }
            })}
            handleChange={ e => {
              setData('subject', e.target.value)
              setSelectedSubject(e.target.value)
            }}
            error={errors.subject}
          />

          {selectedSubject && selectedChapters.length > 0 ? (
            <SelectBox
              label='Chapter'
              handleChange={ e => setData('chapter', e.target.value) }
              error={errors.chapter}
              items={selectedChapters.map(ch => {
                return { text: ch.name, value: ch.id }
              })}
            />
          ) : (
            <NotFoundAlert
              text='Cannot find chapters related to this subject. So you cannot add a summary now!'
            />
          )}

          <InputField
            label='Quick Preview URL'
            value={data.quick_preview}
            error={errors.quick_preview}
            handleChange={ e => setData('quick_preview', e.target.value) }
          />

          <FileInput
            label='Summary File'
            error={errors.file}
            handleChange={ e => setData('file', e.target.files[0]) }
          />

          <TextArea
            label='Description'
            labelRequired={false}
            value={data.description}
            error={errors.description}
            handleChange={ e => setData('description', e.target.value) }
          />

          <CheckBox
            label='Private'
            handleChange={ e => setData('private', e.target.checked) }
          />

          <button onClick={handleCreation} className="btn btn-sm btn-dark">Save Summary</button>

        </FormContainer>

      </div>
    </StudentLayout>
  )
}

export default CreateSummary
