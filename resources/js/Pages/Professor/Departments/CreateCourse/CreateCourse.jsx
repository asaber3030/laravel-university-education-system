
import { useEffect, useState, useMemo } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {value} from "lodash/seq";

const CreateCourse = () => {

  const { year, subjects } = usePage().props

  const { data, setData, post, errors } = useForm({
    title: '',
    subject: '',
    info: ''
  })

  const handleAddCourse = () => {
    post(route('professors.deps.year.content.add', [year.department.id, year.id]))
  }

  return (

    <ProfessorLayout>

      <Head title={`Studying Content`} />

      <ProfessorLayoutHeader title={`Create Course - ${year.title}`} icon={faPlay}>

        <Link href={route('professors.deps.year.content', [year.department.id, year.id])} className='btn btn-primary btn-sm'>Year Courses</Link>

      </ProfessorLayoutHeader>

      <div className="create-course">
        <FormContainer>

          <InputField
            label='Semester'
            labelRequired={false}
            disabled={true}
            value={year.title}
          />

          <InputField
            label='Course Title'
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <SelectBox
            label='Course Subject'
            items={subjects.map(s => {
              return {
                text: `${s.title} - Code: ${s.code}`,
                value: s.id
              }
            })}
            handleChange={ e => setData('subject', e.target.value) }
            error={errors.subject}
          />

          <TextArea
            label='Course Description'
            value={data.info}
            handleChange={ e => setData('info', e.target.value) }
            error={errors.info}
          />

          <div className="form-group">
            <button onClick={handleAddCourse} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faPlus} /> Add Course</button>
          </div>

        </FormContainer>
      </div>

    </ProfessorLayout>
  )
}

export default CreateCourse
