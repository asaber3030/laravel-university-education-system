import { useForm, usePage, Head } from "@inertiajs/inertia-react"

import List from "@/components/List/List"
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"
import Loading from "@/components/Loading/Loading";

import {FileInput, FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";
import { ProfessorsColumns } from "@/columns/professors";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import {Inertia} from "@inertiajs/inertia";

const Delete = () => {

  const { current } = usePage().props

  const submitDelete = () => {
    Inertia.post(route('professors.delete', current.id))
  }

  return (
    <ProfessorLayout>

      <Head title='Create Professor' />

      <ProfessorLayoutHeader
        title={<span>Delete Professor - <b>{current.username}</b></span>}
        icon={faTrash}
      />

      <ActionAlert
        title={<span>Delete Professor <b>{current.username} ?</b></span>}
        type='delete'
        submitAction={submitDelete}
        cancelRoute={'professors.list'}>
        <span>Are you sure that you want to delete this professor <b>{current.username}</b></span>
      </ActionAlert>


    </ProfessorLayout>
  )
}

export default Delete
