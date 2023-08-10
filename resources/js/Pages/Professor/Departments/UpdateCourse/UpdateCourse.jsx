
import { useEffect, useState, useMemo } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {value} from "lodash/seq";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const UpdateCourse = () => {

  const { year, subjects, course } = usePage().props

  const { data, setData, post, errors } = useForm({
    title: course.title,
    subject: course.subject,
    info: course.info
  })

  const handleAddCourse = () => {
    post(route('professors.deps.year.content.update', [year.department.id, year.id, course.id]))
  }

  return (

    <ProfessorLayout>

      <Head title={`Update Course - ${course.title}`} />

      <ProfessorLayoutHeader title={`Update Course - ${course.title}`} icon={faPlay}>

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
            selectedOptionValue={data.subject}
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
            <button onClick={handleAddCourse} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit} /> Update Course</button>
          </div>

        </FormContainer>
      </div>

    </ProfessorLayout>
  )
}

export default UpdateCourse
