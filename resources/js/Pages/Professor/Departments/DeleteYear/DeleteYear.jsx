import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const DeleteYear = () => {

  const { year, department, appURL } = usePage().props

  const handleDeleteYear = () => {
    Inertia.post(route('professors.deps.year.delete', [department.id, year.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Year - ${year.title}`} />

      <ProfessorLayoutHeader title={`Delete Year - ${year.title}`} icon={faTrash}>
      </ProfessorLayoutHeader>

      <div className="add-year">

        <ActionAlert
          title={`Delete Course!`}
          type='delete'
          submitAction={handleDeleteYear}
          cancelRoute={'professors.deps.list'}
          paragraph={`Are you sure that you want to delete this year '${year.title}'`}
        />

      </div>

    </ProfessorLayout>
  )
}

export default DeleteYear
