import React, { useState } from "react";

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
  faEnvelope,
  faIdCard,
  faImage,
  faLocation, faLock,
  faUniversity
} from "@fortawesome/free-solid-svg-icons";
import {FileInput, FormContainer, InputField} from "@/components/Form/FormContainer";
import PageHeader from "@/components/PageHeader/PageHeader";

const AccountPassword = () => {

  const { appURL, user } = usePage().props

  const { data, processing, setData, errors, post } = useForm({
    old_password: '',
    new_password: '',
  })

  const handleUpdate = () => {
    post(route('students.profile.password'))
  }

  return (
    <StudentLayout user={user}>

      <Head title='Change Password' />

      <ProfileLayout activePage='password'>
        <PageHeader
          pageTitle='Change Password'
          pageIcon={faLock}
        />
        <div>

          <FormContainer>

            <InputField
              value={data.old_password}
              handleChange={ e => setData('old_password', e.target.value) }
              label='Old Password'
              error={errors.old_password}
              type='password'
            />

            <InputField
              value={data.new_password}
              handleChange={ e => setData('new_password', e.target.value) }
              label='New Password'
              error={errors.new_password}
              type='password'
            />

            <button onClick={ handleUpdate } className="btn btn-sm btn-dark">Save changes</button>

          </FormContainer>

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default AccountPassword
