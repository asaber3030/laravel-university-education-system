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
import ActionAlert from "@/components/DeleteAlert/ActionAlert";

const DeleteSummary = () => {

  const { user, summary } = usePage().props

  const handleDelete = () => {
    Inertia.post(route('students.summary.delete', summary.id))
  }

  return (
    <StudentLayout user={user}>

      <Head title='Delete summary' />

      <PageHeader
        pageTitle={<span>Delete Summary  <b>ID#{summary.id}</b></span>}
        pageIcon={faTrash}
        pageRightComponent={
          <Link href={route('students.summary.create')}><FontAwesomeIcon icon={faPlus} /> Add Summary</Link>
        }
      />

      <section className='delete-summary-container' style={{ position: 'relative' }}>
        <ActionAlert
          title='Deleting summary!'
          paragraph='Are you sure that you want to delete this summary?'
          type='delete'
          submitAction={ handleDelete }
          cancelRoute={ 'students.summary.list' }
        />
      </section>
    </StudentLayout>
  )
}

export default DeleteSummary
