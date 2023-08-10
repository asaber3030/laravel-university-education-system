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
  faEnvelope,
  faIdCard,
  faImage,
  faLocation,
  faUniversity
} from "@fortawesome/free-solid-svg-icons";
import {FileInput, FormContainer, InputField} from "@/components/Form/FormContainer";
import PageHeader from "@/components/PageHeader/PageHeader";


const ProfilePicture = () => {

  const { appURL, user } = usePage().props

  const { data, processing, setData, errors, post } = useForm({
    picture: '',
  })

  const handleUpdate = () => {
    post(route('students.profile.picture'))
  }

  return (
    <StudentLayout user={user}>

      <Head title='Change profile picture' />

      <ProfileLayout activePage='picture'>
        <PageHeader
          pageTitle='Update My Picture'
          pageIcon={faImage}
        />
        <div>

          <FormContainer>

            <FileInput label='New Profile Picture' error={errors.picture} handleChange={ e => setData('picture', e.target.files[0]) } />

            <button onClick={ handleUpdate } className="btn btn-sm btn-dark">Save changes</button>

          </FormContainer>

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default ProfilePicture
