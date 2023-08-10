import '@/assets/css/students/global-students.scss'
import './summary.scss'

import React, { useEffect, useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import NotFoundAlert from "@/components/NotFoundAlert";
import Btn from "@/components/Btn";
import formatDate from "@/helpers/functions/format-date";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faDownload,
  faEllipsisH,
  faEye,
  faFilter, faLink,
  faPlus, faSave,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

const ViewSummaries = () => {

  const { appURL, user, summary } = usePage().props
  const { data, setData, post, processing, errors } = useForm({
    quick_preview: summary.quick_preview,
    private: summary.private,
    description: summary.description,
    file: '',
  })

  const saveUpdate = () => {
    post(route('students.summary.view', [summary.id]))
  }

  return (
    <StudentLayout user={user}>

      <Head title='View Summary' />

      <PageHeader
        pageTitle={<span>View Summary  <b>ID#{summary.id}</b></span>}
        pageIcon={faEye}
        pageRightComponent={
          <Link href={route('students.summary.create')}><FontAwesomeIcon icon={faPlus} /> Add Summary</Link>
        }
      />

      <section className="view-summary-container">
        <div className="header-section">
          <div className="update-summary section">
            <FormContainer>
              <InputField
                label='Created By Student'
                labelRequired={false}
                value={user.username}
                disabled={true}
              />

              <InputField
                label='Semester'
                labelRequired={false}
                value={summary.year.title + ' - ' + summary.year.term_name}
                disabled={true}
              />

              <InputField
                label='Quick Preview'
                labelRequired={true}
                value={data.quick_preview}
                handleChange={ e => setData('quick_preview', e.target.value) }
                error={errors.quick_preview}
              />

              <FileInput
                label='Summary File'
                labelRequired={true}
                handleChange={ e => setData('file', e.target.files[0]) }
                error={errors.file}
              />

              <TextArea
                label='Description'
                labelRequired={true}
                value={data.description}
                handleChange={ e => setData('description', e.target.value) }
                error={errors.description}
              />

              <CheckBox
                value={data.private}
                handleChange={ e => setData('private', e.target.checked) }
                label='Private?'
              />

              <Btn icon={faSave} handleClick={saveUpdate}>Save Update!</Btn>

            </FormContainer>
          </div>
          <div className="summary-details list-items section">
            <h6>Summary for subject <Link href={route('students.subjects.view', summary.subject.id)}><b>{summary.subject.title}</b></Link></h6>
            <ul>
              <li><span>Created at</span> <span>{formatDate(summary.created_at)}</span></li>
              <li><span>Last update</span> <span>{formatDate(summary.updated_at)}</span></li>
              <li><span>Subject</span> <span><Link href={route('students.subjects.view', summary.subject.id)}><b>{summary.subject.title}</b></Link></span></li>
              <li><span>Chapter</span> <span>Ch. {`${summary.chapter.number}. ${summary.chapter.name}`}</span></li>
              <li><span>Year</span> <span>{summary.year.title} / {summary.year.term_name}</span></li>
            </ul>
            <div className="actions">
              <a download href={appURL + summary.file}><FontAwesomeIcon icon={faDownload} /> Download</a>
              <a href={summary.quick_preview} target='_blank'><FontAwesomeIcon icon={faLink} /> Quick Preview</a>
            </div>
          </div>

        </div>
      </section>

    </StudentLayout>
  )
}

export default ViewSummaries
