
import { useEffect, useState, useMemo } from "react";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {CoursesColumns} from "@/columns/courses";

const CreateLecture = () => {

  const { course } = usePage().props
  const { data, setData, errors, processing, post } = useForm({
    title: '',
    video: '',
    file: '',
    information: '',
  })

  const createLecture = () => {
    post(route('professors.courses.add.lecture', course.id))
  }

  return (

    <ProfessorLayout>

      <Head title={`Create New Lecture - ${course.title}`} />

      <ProfessorLayoutHeader title={`Create New Lecture - ${course.title}`} icon={faPlus}></ProfessorLayoutHeader>

      <div className="create-course">

        <FormContainer>

          <InputField
            label='Course'
            value={course.title}
            disabled={true}
            labelRequired={false}
          />

          <InputField
            label='Subject'
            value={course.subject.title + ' - View: ' + course.subject.code}
            disabled={true}
            labelRequired={false}
          />

          <InputField
            label='Lecture title'
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <TextArea
            label='Lecture Description'
            value={data.information}
            handleChange={ e => setData('information', e.target.value) }
            error={errors.information}
          />

          <FileInput
            label={'Lecture Video'}
            handleChange={ e => setData('video', e.target.files[0]) }
            error={errors.video}
          />

          <div className="form-group">
            <FileInput
              label={'Lecture File'}
              labelRequired={false}
              handleChange={ e => setData('file', e.target.files[0]) }
              error={errors.video}
            />
          </div>

          <div className="form-group">
            <button onClick={createLecture} className="btn btn-primary btn-sm">Create Lecture</button>
          </div>

        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default CreateLecture
