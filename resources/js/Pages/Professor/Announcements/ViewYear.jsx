import '../Timetable/timetable.scss'
import './announcements.scss'

import { usePage, Link } from "@inertiajs/inertia-react";

import {faClock, faFlag, faTrash} from "@fortawesome/free-solid-svg-icons";

import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import NotFoundAlert from "@/components/NotFoundAlert";
import formatDate from "@/helpers/functions/format-date";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Inertia} from "@inertiajs/inertia";

const ViewYearAnnouncements = () => {

  const { year, appURL } = usePage().props

  const handleDelete = (id) => {
    Inertia.post(route('professors.ann.delete', id))
  }

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title={`${year.title} / ${year.term_name} - Announcements`} icon={faFlag}>
        <Link className='btn btn-sm btn-dark' href={route('professors.deps.year.ann.add', [year.department, year.id])}>Add Announcement</Link>
      </ProfessorLayoutHeader>

      {year.announcements.length > 0 ? (
        <div className="list-anns">

          <div className="list-all">

            {year.announcements.map(a => (
              <div className="ann">

                <div className="user-card">
                  <div className="image">
                    <img src={appURL + a.professor.picture} alt=""/>
                  </div>
                  <div className="text">
                    <h6>{a.professor.title} <b>{a.professor.name}</b></h6>
                    <span>{a.professor.username}</span>
                  </div>
                </div>

                <div className="ann-description">
                  <span><FontAwesomeIcon icon={faClock} /> {formatDate(a.created_at)}</span>
                  <h6>{a.title}</h6>
                  <p>{a.description}</p>

                  <button onClick={ () => handleDelete(a.id) } className='btn btn-danger btn-sm'><FontAwesomeIcon icon={faTrash} /> Delete</button>
                </div>

              </div>
            ))}


          </div>

        </div>
      ) : (
        <NotFoundAlert text='No announcements' />
      )}

    </ProfessorLayout>

  )
}

export default ViewYearAnnouncements
