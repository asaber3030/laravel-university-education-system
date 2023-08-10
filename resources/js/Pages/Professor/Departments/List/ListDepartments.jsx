import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import {faLayerGroup, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DepartmentsColumns } from "@/columns/departments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListDepartments = () => {

  const { departments } = usePage().props

  console.log(departments)

  return (
    <ProfessorLayout>

      <Head title='Departments' />

      <ProfessorLayoutHeader title='Departments' icon={faLayerGroup}>
        <Link className='btn btn-sm btn-primary' href={route('professors.deps.create')}><FontAwesomeIcon icon={faPlus} /> Create Department</Link>
      </ProfessorLayoutHeader>

      <List
        rows={departments}
        columns={DepartmentsColumns}
        checkBox={false}
      />

    </ProfessorLayout>
  )
}

export default ListDepartments
