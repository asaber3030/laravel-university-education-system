import './create-subject.scss'

import { useState } from "react";

import {usePage, Link, useForm, Head} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

import { SubjectsColumns } from "@/columns/subjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook, faFile, faLayerGroup, faPlus} from "@fortawesome/free-solid-svg-icons";

import {FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import InputError from "@/components/InputError";

import Swal from "sweetalert2";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import Loading from "@/components/Loading/Loading";

const CreateSubject = () => {

  const { subjects, department, departments } = usePage().props

  const [selected, setSelected] = useState([])

  const [code, setCode] = useState('')

  const { data, setData, errors, post, processing } = useForm({
    name: '',
    code: '',
    reference: '',
    information: '',
    department: department != null ? department.id : ''
  })

  const generateCode = (e) => {
    e.preventDefault()
    if (data.name) {
      setCode( value => data.name.slice(0, 4).toUpperCase() + (Math.random() * 1000).toFixed() )
    } else {
      Swal.fire({
        title: 'Subject Name!',
        text: 'Please enter subject name to generate a code based on subject name',
        icon: 'warning',
      })
    }
    setData('code', code)
  }

  const submitCreation = () => {
    post(route('professors.subjects.create'))
  }

  return (

    <ProfessorLayout>

      <Head title={`Add Subject`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader title={department ? `Add Subject - Department: ${department.title}` : `Add Subject`}>

      </ProfessorLayoutHeader>

      <div className="create-subject-container">

        <FormContainer>

          <SelectBox
            label='Department'

            error={errors.department}
            selectedOptionValue={department ? department.id : ''}
            items={departments.map(e => {
              return {
                value: e.id,
                text: e.title
              }
            })}
            handleChange={ e => setData('department', e.target.value) }
          />

          <InputField
            label='Subject Name'
            error={errors.name}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
          />

          <div className="code-container">
            <InputField
              label='Subject Code'
              value={data.code}
              error={errors.code}
              handleChange={ e => setData('code', e.target.value) }
            />
            <Link onClick={generateCode}>Generate Code</Link>
          </div>

          <FileInput
            label='Reference File'
            labelRequired={false}
            error={errors.reference}
            handleChange={ e => setData('reference', e.target.files[0]) }
          />

          <TextArea
            label='Information'
            error={errors.information}
            value={data.information}
            handleChange={ e => setData('information', e.target.value) }
          />

          <div className="form-group">
            <button onClick={submitCreation} className='form-submit btn btn-primary'>Submit</button>
          </div>

        </FormContainer>

      </div>

      <List contentHeight={'400px'} rows={subjects} checkBox={false} columns={SubjectsColumns} handleSelected={row => setSelected(row)} />

    </ProfessorLayout>

  )
}

export default CreateSubject
