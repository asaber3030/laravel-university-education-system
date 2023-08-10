import { usePage, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteStaff = () => {

  const { appURL, staff } = usePage().props

  const handleDelete = () => {
    Inertia.post(route('professors.staff.delete', [staff.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Staff from: ${staff.year.title}`} />

      <ProfessorLayoutHeader title={`Delete Staff Member from - ${staff.year.title} / ${staff.year.term_name}`} icon={faTrash} />

      <div className="add-chapter">

        <ActionAlert
          title={`Delete Teaching Staff!`}
          type='delete'
          submitAction={handleDelete}
          cancelRoute={'professors.staff.list'}
          cancelParams={null}>
          <span>Are you sure that you want to delete this staff member <b>{staff.professor.title} {staff.professor.name}</b> from this semester <b>{staff.year.title} / {staff.year.term_name}</b></span>
        </ActionAlert>

      </div>

    </ProfessorLayout>
  )
}

export default DeleteStaff
