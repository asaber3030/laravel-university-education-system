import './view.scss'

import { Link, usePage, Head } from "@inertiajs/inertia-react"
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import NotFoundAlert from "@/components/NotFoundAlert";
import formatDate from "@/helpers/functions/format-date";

const ViewProfessor = () => {

  const { current, appURL } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`View Professor - ${current.username}`} />

      <ProfessorLayoutHeader
        title={<span>{current.title} {current.name} - <b>{current.username}</b></span>}
        icon={faChalkboardTeacher}
      />

      <section className="view-professor-container">

        <div className="professor-header">

          <img src={appURL + current.picture} alt=""/>

          <h6>{current.title + ' ' + current.name}</h6>

          <span>{'@' + current.username}</span>

          <span style={{ fontSize: 12, display: 'block' }}>{formatDate(current.created_at)}</span>

        </div>

        <div className="professor-content">

          <Link href={route('professors.deps.years', current.department.id)} className="left-part department-section">
            <h6>{current.department.title}</h6>
            <img src={appURL + current.department.icon} alt=""/>
            <p>{current.department.info}</p>
          </Link>

          <div className="subjects">

            {current.subjects.length > 0 && (
              <>
                {current.subjects.map(sub => (
                  <Link href={route('professors.subjects.chapters', sub.subject.id)} className="subject">
                    <h6>Teaching: {sub.subject.title} <b>({sub.subject.code})</b></h6>
                  </Link>
                ))}
              </>
            )}

            {current.subjects.length == 0 && (
              <NotFoundAlert text='No Membership added' />
            )}

          </div>

        </div>

      </section>

    </ProfessorLayout>
  )
}

export default ViewProfessor
