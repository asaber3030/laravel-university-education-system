import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import {faBook, faLayerGroup, faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfessorsColumns } from "@/columns/professors";
import {FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";

const CreateProfessor = () => {

  const { department, departments } = usePage().props

  const { data, setData, errors, post } = useForm({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    title: '',
    department: '',
  })

  const addProfessor = () => {
    post(route('professors.deps.create.professor', department.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Create Professor For Department - ${department.title}`} />

      <ProfessorLayoutHeader title={`Create Professor For Department - ${department.title}`} icon={faLayerGroup}>
        <Link className='btn btn-primary btn-sm' href={route('professors.deps.professors', department.id)}><FontAwesomeIcon icon={faBook} /> Professors - <b>{department.title}</b></Link>
      </ProfessorLayoutHeader>

      <FormContainer>

        <InputField
          label='Full name'
          value={data.name}
          error={errors.name}
          handleChange={ e => setData('name', e.target.value) }
        />

        <InputField
          label='Username'
          value={data.username}
          error={errors.username}
          handleChange={ e => setData('username', e.target.value) }
        />

        <InputField
          label='E-mail'
          value={data.email}
          error={errors.email}
          handleChange={ e => setData('email', e.target.value) }
        />

        <InputField
          label='Password'
          type='password'
          value={data.password}
          error={errors.password}
          handleChange={ e => setData('password', e.target.value) }
        />

        <InputField
          label='Phone Number'
          value={data.phone}
          error={errors.phone}
          handleChange={ e => setData('phone', e.target.value) }
        />

        <InputField
          label='Professor Title'
          value={data.title}
          error={errors.title}
          handleChange={ e => setData('title', e.target.value) }
        />

        <SelectBox
          label='Department'
          items={departments.map(e => {
            return {
              value: e.id,
              text: e.title
            }
          })}
          selectedOptionValue={department.id}
          handleChange={ e => setData('department', e.target.value) }
          error={errors.department}
        />

        <div className="form-group">
          <button onClick={addProfessor} className='btn btn-sm btn-primary'>Create Professor - <b>{department.title}</b></button>
        </div>

      </FormContainer>

      <List
        rows={department.professors}
        columns={ProfessorsColumns}
        checkBox={false}
      />

    </ProfessorLayout>
  )
}

export default CreateProfessor
