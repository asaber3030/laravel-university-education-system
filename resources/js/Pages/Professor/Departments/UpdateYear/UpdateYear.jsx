import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faChalkboardTeacher, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const AddYear = () => {

  const { department, years, year } = usePage().props
  const { data, setData, post, errors } = useForm({
    title: year.title,
    start: year.start,
    end: year.end,
    grade: year.grade,
    term_name: year.term_name,
    next_year: year.next_year,
    information: year.information
  })

  const handleYear = () => {
    console.log(errors)
    post(route('professors.deps.year.update', [department.id, year.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Year - ${year.title} - ${year.term_name}`} />

      <ProfessorLayoutHeader title={`Update Year - ${year.title} - ${year.term_name}`} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

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
            selectedOptionValue={year.next_year}
            items={years.map(e => {
              return {
                value: e.id,
                text: e.title + ' - ' + e.term_name
              }
            })}
            handleChange={ e => setData('next_year', e.target.value) }
            error={errors.next_year}
          />

          <SelectBox
            label='Term Name'
            selectedOptionValue={year.term_name}
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
            <button onClick={handleYear} className="btn-sm btn btn-primary"><FontAwesomeIcon icon={faEdit} /> Update Year - <b>{year.title}</b></button>
          </div>

        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default AddYear
