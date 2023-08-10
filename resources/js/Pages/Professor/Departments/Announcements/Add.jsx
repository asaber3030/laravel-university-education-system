import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { faFlag } from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";

const AddAnnouncement = () => {

  const { year } = usePage().props
  const { data, setData, post, errors } = useForm({
    title: '',
    description: ''
  })

  const submit = () => {
    post(route('professors.deps.year.ann.add', [year.department, year.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Studying Content - ${year.title}`} />

      <ProfessorLayoutHeader title={<span>Send Announcement - <b>{year.title} / {year.term_name}</b></span>} icon={faFlag} />

      <FormContainer>

        <InputField
          label='Title'
          value={data.title}
          handleChange={ e => setData('title', e.target.value) }
          error={errors.title}
        />

        <TextArea
          label='Description'
          value={data.description}
          handleChange={ e => setData('description', e.target.value) }
          error={errors.description}
        />


        <button onClick={submit} className='btn btn-primary'>
          Send
        </button>

      </FormContainer>

    </ProfessorLayout>
  )
}

export default AddAnnouncement
