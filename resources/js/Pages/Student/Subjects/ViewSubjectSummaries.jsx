import {Head, Link, usePage} from "@inertiajs/inertia-react";

import '@/assets/css/students/global-students.scss'
import './subjects.scss'

import React, {useEffect, useState} from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Btn from "@/components/Btn";

import {
  faBook, faCheck,
  faDownload,
  faLink,
  faPlay,
  faQuestion,
  faSearch,
  faTasks,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

import formatDate from "@/helpers/functions/format-date";
import log from "@/helpers/functions/log";
import { FormContainer, InputField, SelectBox } from "@/components/Form/FormContainer";
import NotFoundAlert from "@/components/NotFoundAlert";
import {Inertia} from "@inertiajs/inertia";

const ListSubjectSummaries = () => {

  const { appURL, user, subject, students, selectedStudentID, selectedChapterID } = usePage().props

  const [username, setUsername] = useState(selectedStudentID && selectedStudentID)
  const [chapter, setChapter] = useState(selectedChapterID && selectedChapterID)
  const [searchType, setSearchType] = useState('')


  const applyClear = () => {
    setData(subject.summaries)
  }

  const applyFilterUsername = () => {
    Inertia.get(route('students.subjects.search.username.summaries', [subject.id, username]))
  }
  const applyFilterChapter = () => {
    Inertia.get(route('students.subjects.search.chapter.summaries', [subject.id, chapter]))
  }
  const applyFilterTwo = () => {
    Inertia.get(route('students.subjects.search.both.summaries', [subject.id, username, chapter]))
  }

  return (
    <StudentLayout user={user}>

      <Head title={`${subject.title} Summaries`} />

      <PageHeader
        pageTitle={`${subject.title} - Summaries`}
        pageIcon={faBook}
      />

      <div className="list-other-subject-summaries">

        <div className="filter">

          <FormContainer>

            {students.length > 0 && (
              <>
                <SelectBox
                  labelRequired={false}
                  label='Select Student'
                  items={students.map(student => {
                    return { text: `ID#${student.id} - ${student.username}`, value: student.id }
                  })}
                  handleChange={ e => setUsername(e.target.value) }
                  selectedOptionValue={selectedStudentID}
                />

                <div style={{ display: 'flex', gap: 5 }}>
                  <Btn handleClick={applyFilterUsername} color='secondary'><FontAwesomeIcon icon={faSearch} /> Apply Filter</Btn>
                </div>
              </>
            )}

            {subject.chapters.length > 0 && (
              <>
                <SelectBox
                  labelRequired={false}
                  label='Select Specific Chapter'
                  items={subject.chapters.map(ch => {
                    return { text: `Ch.${ch.number} - ${ch.name}`, value: ch.id }
                  })}
                  handleChange={ e => setChapter(e.target.value) }
                  selectedOptionValue={selectedChapterID}
                />


                <div style={{ display: 'flex', gap: 5 }}>
                  <Btn handleClick={applyFilterChapter} color='secondary'><FontAwesomeIcon icon={faSearch} /> Apply Filter</Btn>
                </div>
              </>
            )}

          </FormContainer>

          <div style={{ display: 'flex', gap: 5, marginTop: 10, paddingTop: 10, borderTop: '1px solid #ddd' }}>
            <Btn disabled={username == null && chapter == null ? true : false} classes='disable-styles' handleClick={applyFilterTwo} color='secondary'><FontAwesomeIcon icon={faCheck} /> Search By Username & Chapter</Btn>
          </div>

        </div>

        {subject.summaries.length > 0 ? (
          <div className="summaries-details">

            <div className="list-summaries">
              {subject.summaries.map(s => (
                <div className="summary" key={s.id}>
                  <div className="user-image">
                    <img src={appURL + s.student.picture} alt=""/>
                    <div className="user-details-popup">
                      <div className="top-popup">
                        <img src={appURL + s.student.picture} alt=""/>
                      </div>
                      <div className="content-popup">
                        <h6>{s.student.name}</h6>
                        <Link>{s.student.username}</Link>
                        <span>{s.student.year.title} <br /> {s.student.year.term_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="summary-full-details">
                    <div className="s-content">
                      <span>Ch.{s.chapter.number} - <b>{s.chapter.name}</b></span>
                      <p>{s.description}</p>
                      <div className="actions">
                        <Tooltip title='Quick Preview' followCursor><a href={s.quick_preview} target='_blank'><FontAwesomeIcon icon={faLink} /></a></Tooltip>
                        <Tooltip title='Download' followCursor><a download href={appURL + s.file} target='_blank'><FontAwesomeIcon icon={faDownload} /></a></Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="summaries-details">
            <NotFoundAlert  text='No data found!' type='primary' />
          </div>
        )}
      </div>

    </StudentLayout>
  )
}

export default ListSubjectSummaries
