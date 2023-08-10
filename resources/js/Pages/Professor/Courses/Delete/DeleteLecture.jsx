import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteLecture = () => {

  const { appURL, course, lecture } = usePage().props

  const handleDeleteLecture = () => {
    Inertia.post(route('professors.courses.delete.lecture', [course.id, lecture.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Lecture - ${lecture.title}`} />

      <ProfessorLayoutHeader title={`Delete Course - ${lecture.title}`} icon={faTrash}>
        <Link href={route('professors.courses.view', lecture.id)} className='btn-sm btn btn-secondary'>Course Home Page</Link>
      </ProfessorLayoutHeader>

      <div className="add-chapter">

        <ActionAlert
          title={`Delete Lecture!`}
          type='delete'
          submitAction={handleDeleteLecture}
          cancelRoute={'professors.courses.list'}
          cancelParams={null}
          paragraph={`Are you sure that you want to delete this lecture ${lecture.title}`}
        />

      </div>

    </ProfessorLayout>
  )
}

export default DeleteLecture
