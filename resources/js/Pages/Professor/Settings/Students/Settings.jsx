import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import SettingsSidebar from "@/Pages/Professor/Settings/SettingsSidebar";

import './student-settings.scss'
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAddressCard, faCog, faGlobe, faLightbulb, faLock, faSave, faSignIn} from "@fortawesome/free-solid-svg-icons";
import {usePage} from "@inertiajs/inertia-react";
import {SelectBox} from "@/components/Form/FormContainer";

import {THEMES, LANUGAGES, STUDENTS_SETTINGS_CODES} from "@/helpers/constants";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";

const StudentSettings = () => {

  const { activePage, settings } = usePage().props

  console.log(settings)

  const settingsData = {
    theme: settings.find(a => a.key == STUDENTS_SETTINGS_CODES.theme),
    language: settings.find(a => a.key == STUDENTS_SETTINGS_CODES.language),
  }

  const [defaultTheme, setTheme] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.theme))
  const [defaultLang, setLang] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.language).value)
  const [defaultPersonal, setPersonal] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.personal_information).value == 1 ? true : false)
  const [resetPassword, setReset] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.reset_password).value == 1 ? true : false)
  const [loginStatus, setLogin] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.login_status).value == 1 ? true : false)
  const [uploadSummary, setSummary] = useState(settings.find(s => s.key == STUDENTS_SETTINGS_CODES.upload_summary).value == 1 ? true : false)

  console.log(defaultTheme)

  // [post] actions
  const saveTheme = () => {
    Inertia.post(route('professors.settings.students.update.theme', [defaultTheme.id, ]))
  }

  return (
    <ProfessorLayout>

      <div className="settings-container">

        <div className="settings-content">

          <h6 className='settings-content-title default-title'><FontAwesomeIcon icon={faCog} /> Students Settings</h6>

          <div className="student-settings-main">

            <div className="settings-set-left-right">

              <div className="set-lbl-txt">Default Theme</div>
              <div className="icon"><FontAwesomeIcon icon={faLightbulb} /></div>

              <div className="set-choose-options">
                <SelectBox
                  selectedOptionValue={defaultTheme}
                  items={THEMES.map((th, idx) => {
                    return { value: th.themeName, text: th.themeName }
                  })}
                  handleChange={ e => setTheme(e.target.value) }
                />
              </div>

              <div className="save-button">
                <button onClick={saveTheme} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>

            </div>

            <div className="settings-set-left-right">

              <div className="set-lbl-txt">Language</div>
              <div className="icon"><FontAwesomeIcon icon={faGlobe} /></div>

              <div className="set-choose-options">
                <SelectBox
                  selectedOptionValue={defaultLang}
                  items={LANUGAGES.map((lang, idx) => {
                    return { value: lang.langName, text: lang.langName }
                  })}
                />
              </div>

              <div className="save-button">
                <button className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>

            </div>

            <div className="settings-set-left-right">

              <div className="set-lbl-txt">Personal Information</div>

              <div className="icon"><FontAwesomeIcon icon={faAddressCard} /></div>

              <div className="set-choose-options">
                <SelectBox
                  items={[
                    { value: 1, text: 'Allow Editing' },
                    { value: 0, text: 'Disable Editing Everything in (Username, E-mail, Password, Name, Phone, Picture)' }
                  ]}
                />
              </div>

              <div className="save-button">
                <button className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>

            </div>

            <div className="settings-set-left-right">

              <div className="set-lbl-txt">Reset Password</div>

              <div className="icon"><FontAwesomeIcon icon={faLock} /></div>

              <div className="set-choose-options">
                <SelectBox
                  selectedOptionValue={resetPassword}
                  items={[
                    { value: 1, text: 'Can Reset Password Using E-mail Address' },
                    { value: 0, text: 'Disable Reset Password' }
                  ]}
                />
              </div>

              <div className="save-button">
                <button className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>

            </div>

            <div className="settings-set-left-right">

              <div className="set-lbl-txt">Login Status</div>

              <div className="icon"><FontAwesomeIcon icon={faSignIn} /></div>

              <div className="set-choose-options">
                <SelectBox
                  selectedOptionValue={loginStatus}
                  items={[
                    { value: 1, text: 'Students Can Login' },
                    { value: 0, text: 'Disable login for a while' }
                  ]}
                />
              </div>

              <div className="save-button">
                <button className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faSave} /> Save</button>
              </div>

            </div>

          </div>

        </div>

        <SettingsSidebar activePage={activePage} />

      </div>

    </ProfessorLayout>
  )
}

export default StudentSettings
