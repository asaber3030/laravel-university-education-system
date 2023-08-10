import './students/student-settings.scss'
import './settings.scss'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import SettingsSidebar from "@/Pages/Professor/Settings/SettingsSidebar";

import {usePage, Link, Head} from "@inertiajs/inertia-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotFoundAlert from "@/components/NotFoundAlert";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";


const Professors = () => {

  const { activePage, appURL, settings, departments } = usePage().props

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader title='Professors'>
        <Link className='btn btn-sm btn-dark' href={route('professors.create')}>New Professor</Link>
      </ProfessorLayoutHeader>

      <div className="settings-container mt-3">

        <Head title='Professors' />

        <div className="list-professors">

          <div className="departments-list">

            {departments.map(dep => (
              <div className="department">
                <div className="department-header">
                  <h6>{dep.title}</h6>
                </div>
                {dep.professors.length > 0 ? (
                  <div className="department-professors">
                    {dep.professors.map(prof => (
                      <Link href={route('professors.view', prof.id)} className="professor student-card">
                        <img src={appURL + prof.picture} alt=""/>
                        <span>
                        <span>{prof.title} <b>{prof.name}</b></span>
                        <span>@{prof.username}</span>
                      </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <NotFoundAlert text='No professors found!' />
                )}
              </div>
            ))}

          </div>

        </div>

        <SettingsSidebar activePage={activePage} />

      </div>

    </ProfessorLayout>
  )
}

export default Professors
