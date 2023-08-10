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
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

const Update = () => {

  const { departments, current } = usePage().props

  const { data, setData, processing, errors, post } = useForm({
    name: current.name,
    username: current.username,
    email: current.email,
    department: current.department,
    phone: current.phone,
    title: current.title,
    type: current.type
  })

  const update = () => {
    post(route('professors.update', current.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Professor - ${current.username}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader
        title={<span>Update professors <b>{current.username}</b></span>}
        icon={faEdit}
      />

      <FormContainer>

        <InputField
          label='Name'
          value={data.name}
          handleChange={ e => setData('name', e.target.value) }
          error={errors.name}
        />

        <InputField
          label='Username'
          value={data.username}
          handleChange={ e => setData('username', e.target.value) }
          error={errors.username}
        />

        <InputField
          label='E-mail'
          value={data.email}
          handleChange={ e => setData('email', e.target.value) }
          error={errors.email}
        />

        <InputField
          label='Phone number'
          value={data.phone}
          handleChange={ e => setData('phone', e.target.value) }
          error={errors.phone}
        />

        <InputField
          label='Title'
          value={data.title}
          handleChange={ e => setData('title', e.target.value) }
          error={errors.title}
        />

        <SelectBox
          label='Choose type'
          items={[
            { text: 'Professor / Doctor', value: 0 },
            { text: 'Teaching Assistant', value: 1 },
          ]}
          handleChange={ e => setData('type', e.target.value) }
          error={errors.type}
          selectedOptionValue={data.type}
        />

        <SelectBox
          label='Department'
          items={departments.map(dep => {
            return { value: dep.id, text: dep.title }
          })}
          handleChange={ e => setData('department', e.target.value) }
          error={errors.department}
          selectedOptionValue={data.department}
        />
        <button onClick={update} className='btn btn-dark'>
          Update
        </button>

      </FormContainer>

    </ProfessorLayout>
  )
}

export default Update
