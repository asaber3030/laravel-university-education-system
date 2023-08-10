import { usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

import { SubjectsColumns } from "@/columns/subjects";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook, faPlus} from "@fortawesome/free-solid-svg-icons";

import { FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

const Subjects = () => {

  const { subjects } = usePage().props

  const [selected, setSelected] = useState([])

  return (

    <ProfessorLayout>

      <div className="layout-header">

        <h5><FontAwesomeIcon icon={faBook} /> Subjects</h5>

        <div className="layout-actions">
          <Link href={route('professors.subjects.create')} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faPlus} /> Create</Link>
        </div>

      </div>

      <List rows={subjects} checkBox={false} columns={SubjectsColumns} handleSelected={row => setSelected(row)} />

    </ProfessorLayout>

  )
}

export default Subjects
