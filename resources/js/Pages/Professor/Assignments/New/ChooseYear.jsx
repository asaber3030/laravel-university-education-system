import './new.scss'

import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faList, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Inertia} from "@inertiajs/inertia";

import Swal from "sweetalert2";

const ChooseYear = () => {

  const { departments } = usePage().props

  console.log('new')

  const [activeYear, setActiveYear] = useState(null)

  console.log(activeYear)

  const sendAssignment = () => {
    if (activeYear) {
      Inertia.get(route('professors.ass.new', activeYear))
    } else {
      Swal.fire({
        title: 'Year Selection Error!',
        text: 'Please select a year from the above elements!',
        icon: 'error',
      })
    }
  }

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader icon={faList} title='Select Studying Semester to send an assignment' />

      <div className="choose-year-container">

        <div className="choice-group">

          <div className="departments">
            {departments.map(dep => (
              <div className="department">
                <h6 className='department-title'>{dep.title}</h6>
                <div className="years">
                  {dep.years.map(year => (
                    <div onClick={ () => setActiveYear(year.id) } className={`year ${activeYear == year.id ? 'active' : ''}`}>
                      <h6 className='year-title'>
                        {activeYear == year.id && <FontAwesomeIcon icon={faCheck} />}
                        {year.title} - <span>{year.term_name}</span>
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={sendAssignment} className={`btn btn-primary btn-sm ${activeYear ? 'ac' : 'disabled'}`} style={{ marginTop: '10px' }}><FontAwesomeIcon icon={faPaperPlane} /> Send Assignment</button>
          </div>

        </div>

      </div>

    </ProfessorLayout>
  )

}

export default ChooseYear
