import {Head, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FileInput, FormContainer, InputField, TextArea } from "@/components/Form/FormContainer";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DepartmentsColumns } from "@/columns/departments";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const UpdateDepartment = () => {

  const { departments, department } = usePage().props
  const { data, setData, errors, post } = useForm({
    title: department.title,
    info: department.info,
    icon: '',
  })

  const createDepartment = () => {
    post(route('professors.deps.update', department.id))
  }

  return (
    <ProfessorLayout>

      <Head title='Create Department' />

      <ProfessorLayoutHeader title={`Update Department - ${department.title}`} icon={faEdit}>

      </ProfessorLayoutHeader>

      <FormContainer>

        <InputField
          label='Department Name'
          value={data.title}
          handleChange={ e => setData('title', e.target.value) }
          error={errors.title}
        />

        <TextArea
          label='Department Description'
          value={data.info}
          handleChange={ e => setData('info', e.target.value) }
          error={errors.info}
        />

        <FileInput
          label='Department Icon'
          handleChange={ e => setData('icon', e.target.files[0]) }
          error={errors.icon}
        />

        <div className="form-group">
          <button onClick={createDepartment} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faEdit} /> Update</button>
        </div>

      </FormContainer>

      <List
        rows={departments}
        columns={DepartmentsColumns}
        checkBox={false}
      />

    </ProfessorLayout>
  )
}

export default UpdateDepartment
