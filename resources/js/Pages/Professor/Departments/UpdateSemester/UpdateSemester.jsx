
import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faChalkboardTeacher, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {readCSV} from "@/helpers/functions/convertCSVToArray";
import {useState} from "react";
import {SemestersColumns} from "@/columns/semesters";
import {faEdit} from "@fortawesome/free-regular-svg-icons";

const YearSemesters = () => {

  const { year, semester } = usePage().props
  const { data, setData, processing, post, errors } = useForm({
    is_done: semester.is_done == 1 ? true : false,
    information: semester.information,
    grade: semester.grade,
    started: semester.started,
    ended: semester.ended
  })

  const updateSemester = () => {
    console.log(errors)
    post(route('professors.deps.year.semesters.update', [semester.student.department, semester.year.id, semester.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Semester for student - ${semester.student.username}`} />

      <ProfessorLayoutHeader title={<span>Update Student Semester - <Link href={route('professors.students.view', semester.student.id)}>{semester.student.username}</Link> - {semester.year.title}</span>} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

      <div className="year-semesters">

        <FormContainer>

          <InputField
            label={'Student'}
            value={`${semester.student.username} - National ID: ${semester.student.national_id}`}
            disabled={true}
            labelRequired={false}
          />

          <InputField
            label={'Year'}
            value={`${semester.year.title}`}
            disabled={true}
            labelRequired={false}
          />

          <InputField
            label={'Grade'}
            value={data.grade}
            handleChange={ e => setData('grade', e.target.value) }
            error={errors.grade}
          />

          <InputField
            label={'Started'}
            type='datetime-local'
            value={data.started}
            handleChange={ e => setData('started', e.target.value) }
            error={errors.started}
          />
          <InputField
            label={'Ended'}
            type='datetime-local'
            value={data.ended}
            labelRequired={false}
            handleChange={ e => setData('ended', e.target.value) }
            error={errors.started}
          />
          <CheckBox
            label={'Is Done?'}
            labelRequired={false}
            value={data.is_done}
            handleChange={ e => setData('is_done', e.target.checked) }
          />
          <TextArea
            label={'Semester Details'}
            labelRequired={false}
            value={data.information}
            handleChange={ e => setData('information', e.target.value) }
          />

          <div className="form-group">
            <button onClick={updateSemester} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEdit} /> Update Semester</button>
          </div>

        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default YearSemesters
