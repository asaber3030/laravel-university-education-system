import './style.scss'

import {useForm, usePage} from "@inertiajs/inertia-react";

import React, {useState} from "react";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import {Alert, Snackbar} from "@mui/material";

const ProfessorLogin = () => {

  const { flash } = usePage().props
  const { data, setData, post, errors, processing } = useForm({
    username: '',
    password: ''
  })

  const [flashMessageState, setFlashState] = useState(true)

  const handleRequest = () => {
   post(route('professors.login'))
  }

  return (
    <div className='login-form'>
      <h1>Login</h1>

      {flash.message && (
        <Snackbar open={flashMessageState} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={ () => setFlashState(false) }>
          <Alert onClose={ () => setFlashState(false) } severity={flash.type} sx={{ width: '500px' }}>
            {flash.message}
          </Alert>
        </Snackbar>
      )}

      <div className='form-container'>

        <div className='form-group'>
          <InputLabel value='Username' />
          <TextInput handleChange={ e => setData('username', e.target.value) } />
          <InputError message={errors.username} />
        </div>

        <div className='form-group'>
          <InputLabel value='Password' />
          <TextInput type='password' handleChange={ e => setData('password', e.target.value) } />
          <InputError message={errors.password} />
        </div>

        <div className='form-submit'>
          <button onClick={handleRequest} className='btn btn-primary'><FontAwesomeIcon icon={faSignInAlt} /> Submit</button>
        </div>

      </div>

    </div>
  )
}

export default ProfessorLogin
