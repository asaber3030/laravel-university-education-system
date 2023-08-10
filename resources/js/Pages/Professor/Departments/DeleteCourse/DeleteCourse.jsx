import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const DeleteCourse = () => {

  const { year, appURL, course } = usePage().props

  const handleDeleteChapter = () => {
    Inertia.post(route('professors.deps.year.content.delete', [year.department.id, year.id, course.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Course - ${course.title}`} />

      <ProfessorLayoutHeader title={`Delete Course - ${course.title}`} icon={faTrash}>
      </ProfessorLayoutHeader>

      <div className="add-course">

        <ActionAlert
          title={`Delete Course!`}
          type='delete'
          submitAction={handleDeleteChapter}
          cancelRoute={'professors.deps.list'}
          paragraph={`Are you sure that you want to delete this course '${course.title}'`}
        />

      </div>

    </ProfessorLayout>
  )
}

export default DeleteCourse
