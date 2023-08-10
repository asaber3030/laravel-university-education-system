import './add-students.scss'

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

const AddStudentsCSV = () => {

  const { department } = usePage().props
  const { data, setData, post, errors } = useForm({
    student: '',
    year: '',
    is_done: false,
    grade: 1500,
  })

  const [file, setFile] = useState('')

  const handleSubmit = () => {
    post(route('professors.deps.students.add.manual', department.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Add Student Manually - ${department.title}`} />

      <ProfessorLayoutHeader title={`Create Semester For Student - ${department.title}`} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

      <div className="add-students">

        <FormContainer>

          <InputField
            label='Department'
            labelRequired={false}
            value={department.title}
            disabled={true}
          />

          <SelectBox
            label='Choose Student'
            handleChange={ e => setData('student', e.target.value) }
            items={department.students.map(student => {
              return { value: student.id, text: student.username + ' - National ID: ' + student.national_id }
            })}
          />

          <SelectBox
            label='Choose Studying Year'
            handleChange={ e => setData('year', e.target.value) }
            items={department.years.map(year => {
              return { value: year.id, text: year.title }
            })}
            error={errors.year}
          />

          <InputField
            label='Student Grade (1500 marks as default)'
            value={data.grade}
            handleChange={ e => setData('grade', e.target.value) }
            error={errors.grade}
          />

          <CheckBox
            label='Is Done?'
            handleChange={ e => setData('is_done', e.target.checked) }
          />

          <div className="form-group">
            <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
          </div>

        </FormContainer>


      </div>

    </ProfessorLayout>
  )
}

export default AddStudentsCSV
