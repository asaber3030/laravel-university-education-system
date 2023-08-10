import '@/assets/css/students/global-students.scss'
import './summary.scss'

import React, {useEffect, useState} from "react";
import {Head, Link, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import NotFoundAlert from "@/components/NotFoundAlert";
import Btn from "@/components/Btn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faClose, faEllipsisH, faEye, faFilter, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { SelectBox } from "@/components/Form/FormContainer";

import formatDate from "@/helpers/functions/format-date";
import {Inertia} from "@inertiajs/inertia";

const Summary = () => {

  const { user, summary, subjects, subject } = usePage().props

  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedSummaries, setSelectedSummaries] = useState(summary)

  useEffect(() => {
    if (selectedSubject) {
      setSelectedSummaries(summary.filter(s => s.subject.id == selectedSubject))
    } else {
      setSelectedSummaries(summary)
    }
  }, [selectedSubject])

  return (
    <StudentLayout user={user}>

      <Head title={`Summaries`} />

      <PageHeader
        pageTitle='My Subject Summaries'
        pageIcon={faCheck}
        pageRightComponent={
          <Link href={route('students.summary.create')}><FontAwesomeIcon icon={faPlus} /> Add Summary</Link>
        }
      />

      <section className='summary-container'>
        <div className="filter-summary">
          <SelectBox
            items={subjects.map(s => {
              return { text: `${s.title} (${s.code})`, value: s.id }
            })}
            handleChange={ e => setSelectedSubject(e.target.value) }
            selectedOptionValue={subject && subject.id}
          />
          <Btn handleClick={ () => Inertia.get(route('students.summary.list', selectedSubject)) } icon={faFilter} color='primary'>Apply Filter</Btn>
          <Btn handleClick={ () => Inertia.get(route('students.summary.list')) } icon={faClose}>Clear Filter</Btn>
        </div>
        {selectedSummaries.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Chapter</th>
                  <th scope="col">Private?</th>
                  <th scope="col">Added in</th>
                  <th scope="col">Last update</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
              {selectedSummaries.map(s => (
                <tr>
                  <th scope="row">{s.id}</th>
                  <td><Link>{s.subject.title}</Link></td>
                  <td>{s.chapter.name}</td>
                  <td>{s.private ? <span className='text-danger'>Yes</span> : <span className='text-success'>No</span>}</td>
                  <td>{formatDate(s.created_at)}</td>
                  <td>{formatDate(s.updated_at)}</td>
                  <td className='table-actions'>
                    <Link href={route('students.summary.view', s.id)}  className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEye} /> View or Update</Link>
                    <Link href={route('students.summary.delete', s.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faTrash} /> Delete</Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </>
        ) : (
          <NotFoundAlert text='No Summaries Found was added by you!' />
        )}
      </section>
    </StudentLayout>
  )
}

export default Summary
