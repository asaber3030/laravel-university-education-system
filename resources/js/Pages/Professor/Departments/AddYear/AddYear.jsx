import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faChalkboardTeacher, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loading from "@/components/Loading/Loading";

const AddYear = () => {

  const { department, years } = usePage().props
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    start: '',
    end: '',
    grade: '',
    term_name: '',
    next_year: '',
    information: ''
  })

  const handleYear = () => {
    console.log(errors)
    post(route('professors.deps.year.add', department.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Add Year - ${department.title}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader title={`Add Year - ${department.title}`} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

      <div className="add-year">

        <FormContainer>

          <InputField
            label='Department'
            labelRequired={false}
            disabled={true}
            value={department.title}
          />

          <InputField
            label='Year Title'
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <InputField
            label='Start At'
            value={data.start}
            type={'datetime-local'}
            handleChange={ e => setData('start', e.target.value) }
            error={errors.start}
          />

          <InputField
            label='Finish At'
            value={data.end}
            type={'datetime-local'}
            handleChange={ e => setData('end', e.target.value) }
            error={errors.end}
          />

          <InputField
            label='Total Grades'
            value={data.grade}
            handleChange={ e => setData('grade', e.target.value) }
            error={errors.grade}
          />

          <SelectBox
            label='Next Year'
            items={years.map(e => {
              return {
                value: e.id,
                text: e.title
              }
            })}
            handleChange={ e => setData('next_year', e.target.value) }
            error={errors.next_year}
          />

          <SelectBox
            label='Term Name'
            items={[
              { text: 'First Term', value: 'First Term' },
              { text: 'Second Term', value: 'Second Term' }
            ]}
            handleChange={ e => setData('term_name', e.target.value) }
            error={errors.term_name}
          />

          <TextArea
            label='Description'
            value={data.information}
            handleChange={ e => setData('information', e.target.value) }
            error={errors.information}
          />

          <div className="form-group">
            <button onClick={handleYear} className="btn-sm btn btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Year - <b>{department.title}</b></button>
          </div>

        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default AddYear
