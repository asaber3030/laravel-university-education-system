import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfessorsColumns } from "@/columns/professors";

const DepartmentProfessors = () => {

  const { department } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`Professors - ${department.title}`} />

      <ProfessorLayoutHeader title={`Professors - ${department.title}`} icon={faLayerGroup}>
        <Link className='btn btn-sm btn-primary' href={route('professors.deps.create.professor', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Professor</Link>
      </ProfessorLayoutHeader>

      <List
        rows={department.professors}
        columns={ProfessorsColumns}
        checkBox={false}
      />

    </ProfessorLayout>
  )
}

export default DepartmentProfessors
