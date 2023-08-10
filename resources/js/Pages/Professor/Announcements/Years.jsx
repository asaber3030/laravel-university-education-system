import '../Timetable/timetable.scss'

import { usePage, Link } from "@inertiajs/inertia-react";

import {faBuilding, faFlag} from "@fortawesome/free-solid-svg-icons";

import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

const ListYears = () => {

  const { departments } = usePage().props

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title='Announcements' icon={faFlag} />

      <div className="list-years" style={{ marginTop: '10px' }}>

        {departments.map(dep => (
          <div className="department">
            <div className="department-header">
              {dep.title}
            </div>
            <div className="years">
              {dep.years.map(year => (
                <Link href={route('professors.ann.year.view', year.id)} className="year">{year.title} - {year.term_name}</Link>
              ))}
            </div>
          </div>
        ))}

      </div>

    </ProfessorLayout>

  )
}

export default ListYears
