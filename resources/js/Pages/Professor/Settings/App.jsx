import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import SettingsSidebar from "@/Pages/Professor/Settings/SettingsSidebar";

import './students/student-settings.scss'
import './settings.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCog, faSave} from "@fortawesome/free-solid-svg-icons";
import {useForm, usePage} from "@inertiajs/inertia-react";

import { Link } from "@inertiajs/inertia-react";

import { STUDENTS_SETTINGS_CODES, APP_MODES } from "@/helpers/constants";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {FormContainer, InputField} from "@/components/Form/FormContainer";

import Status01 from '@/assets/images/good.png'
import Status02 from '@/assets/images/main.png'
import Status03 from '@/assets/images/holiday.png'
import Status04 from '@/assets/images/percent.svg'
import Status05 from '@/assets/images/delete-account.png'

const StudentSettings = () => {

  const { activePage, appURL, settings, appMode, appName, appDescription, appLogo } = usePage().props

  const { data, setData, post, errors } = useForm({
    logo: null
  })

  const [APP_NAME, setAppName] = useState(appName)
  const [APP_DESCRIPTION, setAppDescription] = useState(appDescription)

  const changeAppDetails = () => {
    Inertia.post(route('professors.settings.change.details'), {
      name: APP_NAME,
      description: APP_DESCRIPTION
    })
  }

  const changeAppLogo = () => {
    post(route('professors.settings.change.logo'))
  }

  const changeAppMode = (mode) => {
    Inertia.post(route('professors.settings.change.mode'), {
      mode: mode
    })
  }

  return (
    <ProfessorLayout>

      <div className="settings-container">

        <div className="settings-content app-page">

          <h6 className='settings-content-title default-title'><FontAwesomeIcon icon={faCog} /> App Settings</h6>

          <FormContainer>

            <div className="select-app-status">

              <div onClick={ () => changeAppMode(APP_MODES.running) } className={appMode == APP_MODES.running ? 'status active' : 'status'}>
                <img src={Status01} alt=""/>
                <h6>Running Mode</h6>
              </div>

              <div onClick={ () => changeAppMode(APP_MODES.main) } className={appMode == APP_MODES.main ? 'status active' : 'status'}>
                <img src={Status02} alt=""/>
                <h6>Maintenance Mode</h6>
              </div>

              <div onClick={ () => changeAppMode(APP_MODES.holiday) } className={appMode == APP_MODES.holiday ? 'status active' : 'status'}>
                <img src={Status03} alt=""/>
                <h6>Holiday Mode</h6>
              </div>

              <div onClick={ () => changeAppMode(APP_MODES.grades) } className={appMode == APP_MODES.grades ? 'status active' : 'status'}>
                <img src={Status04} alt=""/>
                <h6>Grades Mode</h6>
              </div>

              <div onClick={ () => changeAppMode(APP_MODES.stopped) } className={appMode == APP_MODES.stopped ? 'status active' : 'status'}>
                <img src={Status05} alt=""/>
                <h6>App Stopped Mode</h6>
              </div>

            </div>

            <InputField
              label='Application Name'
              labelRequired={false}
              value={APP_NAME}
              handleChange={ e => setAppName(e.target.value) }
            />

            <InputField
              label='Application Description'
              labelRequired={false}
              value={APP_DESCRIPTION}
              handleChange={ e => setAppDescription(e.target.value) }
            />

            <button onClick={changeAppDetails} className='btn btn-dark'><FontAwesomeIcon icon={faSave} /> Save</button>

            <div className="app-logo">
              <img src={appURL + appLogo} alt=""/>
              <div>
                <input type='file' onChange={ e => setData('logo', e.target.files[0]) } />
                <h6>Application Logo </h6>
              </div>
              {errors.logo && (
                <label className='text-danger ml-4'>{errors.logo}</label>
              )}
            </div>

            <button onClick={changeAppLogo} className='btn btn-sm btn-primary'>Change</button>

          </FormContainer>

        </div>

        <SettingsSidebar activePage={activePage} />

      </div>

    </ProfessorLayout>
  )
}

export default StudentSettings
