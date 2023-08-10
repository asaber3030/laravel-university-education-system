import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteCourse = () => {

  const { appURL, course } = usePage().props

  const handleDeleteCourse = () => {
    Inertia.post(route('professors.courses.delete', [course.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Course - ${course.title}`} />

      <ProfessorLayoutHeader title={`Delete Course - ${course.title}`} icon={faTrash}>
        <Link href={route('professors.courses.view', course.id)} className='btn-sm btn btn-secondary'>Course Home Page</Link>
      </ProfessorLayoutHeader>

      <div className="add-chapter">

        <ActionAlert
          title={`Delete Course!`}
          type='delete'
          submitAction={handleDeleteCourse}
          cancelRoute={'professors.courses.list'}
          cancelParams={null}
          paragraph={`Are you sure that you want to delete this course ${course.title}`}
        />

      </div>

    </ProfessorLayout>
  )
}

export default DeleteCourse
