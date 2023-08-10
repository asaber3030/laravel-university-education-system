import './update-subject.scss'

import { useState } from "react";

import {usePage, Link, useForm, Head} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

import { SubjectsColumns } from "@/columns/subjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBook, faFile, faPlus} from "@fortawesome/free-solid-svg-icons";

import {FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";


const UpdateSubject = () => {

  const { subjects, subject, departments } = usePage().props

  const [selected, setSelected] = useState([])

  const { data, setData, errors, post } = useForm({
    name: subject.title,
    reference: '',
    information: subject.information,
    department: subject.department
  })


  const submitCreation = () => {
    post(route('professors.subjects.update', subject.id))
  }

  return (

    <ProfessorLayout>

      <Head title={`Update Subject ${subject.title}`} />

      <div className="layout-header">

        <h5><FontAwesomeIcon icon={faPlus} /> Create Subject</h5>

      </div>

      <div className="create-subject-container">

        <FormContainer>

          <InputField
            label='Subject Name'
            error={errors.name}
            value={data.name}
            handleChange={ e => setData('name', e.target.value) }
          />

          <SelectBox
            label='Department'
            error={errors.department}
            selectedOptionValue={subject.department.id}
            items={departments.map(e => {
              return {
                value: e.id,
                text: e.title
              }
            })}
            handleChange={ e => setData('department', e.target.value) }
          />

          <div className="form-disbaled">
            <InputField
              label='Subject code'
              value={subject.code}
              disabled={true}
              labelRequired={false}
              handleChange={ e => setData('code', e.target.value) }
            />
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

export default UpdateSubject
