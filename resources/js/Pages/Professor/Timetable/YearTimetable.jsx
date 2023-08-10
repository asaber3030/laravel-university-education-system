import './timetable.scss'

import { usePage, Link } from "@inertiajs/inertia-react";

import { faBuilding } from "@fortawesome/free-solid-svg-icons";

import formatTime from '@/helpers/functions/format-time'

import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import NotFoundAlert from "@/components/NotFoundAlert";

const YearTimetable = () => {

  const { days, year } = usePage().props

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title={`Timetable - ${year.title} / ${year.term_name}`} icon={faBuilding} />

      <div className="list-timetable-events">

        <div className="days">

          {days.map(day => (
            <div className="day">

              <div className='header-container'>
                <div className="day-header">
                  <h6>{day.day} <span> / {day.timetable.length} event(s)</span></h6>
                </div>
                <Link href={route('professors.timetable.add', [year.id, day.id])} className='btn btn-sm btn-dark'>Create Event</Link>
              </div>

              {day.timetable.length > 0 ? (
                <div className="day-events">
                  {day.timetable.map(event => (
                    <div className="event">
                      <div className="event-section title">{event.text}</div>
                      <div className="event-section title">{event.event}</div>
                      <div className="event-section clock">Start: <span className="font-bold text-success">{formatTime(event.start)}</span></div>
                      <div className="event-section clock">Ends: <span className="font-bold text-danger">{formatTime(event.end)}</span></div>
                      <div className="event-section action">
                        <Link href={route('professors.timetable.update', [year.id, event.id])}>Update</Link>
                        <Link href={route('professors.timetable.delete', [year.id, event.id])}>Remove</Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <NotFoundAlert text='No events for this day!' />
              )}

            </div>
          ))}

        </div>

      </div>

    </ProfessorLayout>

  )
}

export default YearTimetable
