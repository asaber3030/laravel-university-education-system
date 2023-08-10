
import { useEffect, useState, useMemo } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {CoursesColumns} from "@/columns/courses";

const CreateCourse = () => {

  const { years, courses, subjects } = usePage().props
  const { data, setData, errors, processing, post } = useForm({
    title: '',
    subject: '',
    info: '',
    year: '',
  })

  const createCourse = () => {
    post(route('professors.courses.add'))
    console.log(errors)
  }

  return (

    <ProfessorLayout>

      <Head title={`Create New Course`} />

      <ProfessorLayoutHeader title={`Create Course`} icon={faPlay}></ProfessorLayoutHeader>

      <div className="create-course">

        <FormContainer>

          <InputField
            label='Course Name'
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <TextArea
            label='Course Information'
            value={data.info}
            handleChange={ e => setData('info', e.target.value) }
            error={errors.info}
          />

          <SelectBox
            label='Subject'
            items={subjects.map(subject => {
              return { value: subject.id, text: subject.title + ' - View: ' + subject.code }
            })}
            handleChange={ e => setData('subject', e.target.value) }
            error={errors.subject}
          />

          <SelectBox
            label='Year'
            items={years.map(year => {
              return { value: year.id, text: year.title }
            })}
            handleChange={ e => setData('year', e.target.value) }
            error={errors.year}
          />

          <div className="form-group">
            <button onClick={createCourse} className="btn btn-primary btn-sm">Create Course</button>
          </div>

        </FormContainer>

        <List rows={courses} columns={CoursesColumns} />

      </div>

    </ProfessorLayout>
  )
}

export default CreateCourse
