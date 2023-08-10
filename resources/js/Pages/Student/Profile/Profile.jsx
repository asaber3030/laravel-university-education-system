import React, {useState} from "react";

import '@/assets/css/students/global-students.scss'
import './profile.scss'

import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import StudentLayout from "@/Pages/Student/Layout/Layout";

import log from "@/helpers/functions/log";
import formatDate from "@/helpers/functions/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileLayout from "@/Pages/Student/Profile/ProfileLayout";
import { nationalID } from "@/helpers/functions/student";
import { faBuilding, faClock, faEnvelope, faIdCard, faLocation, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { FormContainer, InputField } from "@/components/Form/FormContainer";
import Loading from "@/components/Loading/Loading";


const Profile = () => {

  const { appURL, user } = usePage().props

  console.log(user)

  const { data, processing, setData, errors, post } = useForm({
    username: user.username.substring(1, user.username.length),
    email: user.email,
    name: user.name,
    phone: user.phone,
  })

  const handleUpdate = () => {
    post(route('students.profile.main'))
  }

  return (
    <StudentLayout user={user}>

      <Head title='Profile' />

      <Loading load={processing} />

      <ProfileLayout activePage='profile'>

        <div className="main-profile">

          <div className="header">
            <div className="left-header">
              <img src={appURL + user.picture} alt=""/>
              <div>
                <h6>{user.name}</h6>
                <span><Link>{user.username}</Link></span>
              </div>
            </div>
            <div className="right-header">
              <span><FontAwesomeIcon fixedWidth icon={faIdCard} /> {nationalID(user.national_id)}</span>
              <span><FontAwesomeIcon fixedWidth icon={faUniversity} /> {nationalID(user.university_code)}</span>
            </div>
          </div>

          <div className="details list-items">
            <span><FontAwesomeIcon fixedWidth icon={faLocation} /> {user.address}</span>
            <span><FontAwesomeIcon fixedWidth icon={faEnvelope} /> {user.university_email}</span>
            <span><FontAwesomeIcon fixedWidth icon={faEnvelope} /> {user.email}</span>
            <span><FontAwesomeIcon fixedWidth icon={faBuilding} /> {user.department.title} - {user.year.title} / {user.year.term_name}</span>
            <span><FontAwesomeIcon fixedWidth icon={faClock} /> Joined: {formatDate(user.created_at)}</span>
          </div>

        </div>

        <div className="update-profile">

          <FormContainer>

            <InputField value={data.username} label='Username' error={errors.username} handleChange={ e => setData('username', e.target.value) } />
            <InputField value={data.name} label='Name' error={errors.name} handleChange={ e => setData('name', e.target.value) } />
            <InputField value={data.email} label='Email' error={errors.email} handleChange={ e => setData('email', e.target.value) } />
            <InputField value={data.phone} label='Phone' error={errors.phone} handleChange={ e => setData('phone', e.target.value) } />

            <button onClick={ handleUpdate } className="btn btn-sm btn-dark">Save changes</button>

          </FormContainer>

        </div>

      </ProfileLayout>

    </StudentLayout>
  )
}

export default Profile
