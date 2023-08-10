import './update-student.scss'

import { useEffect, useState } from "react"
import { useForm, usePage, Head } from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"
import Loading from "@/components/Loading/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import { SelectBox } from "@/components/Form/FormContainer";

const UpdateStudent = () => {

  const { student, departments, years } = usePage().props

  const [departmentYears, setDepartmentYears] = useState(years.map(year => year.department == student.department.id))

  const { data, setData, processing, errors, post } = useForm({
    name: student.name,
    arabic_name: student.arabic_name,
    username: student.username.substring(1, student.username.length),
    email: student.email,
    department: student.department,
    university_email: student.university_email,
    university_code: student.university_code,
    national_id: student.national_id,
    phone: "0" +student.phone,
    address: student.address,
    picture: '',
    password: '',
    year: student.year,
  })

  const handleCreation = () => {
    post(route('professors.students.update', student.id))
  }

  useEffect(() => {
    setDepartmentYears(years.filter(year => year.department == data.department))
  }, [data.department])

  return (
    <ProfessorLayout>

      <Head title={`Update Student - ${student.username}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faEdit} /> {`Update Student - ${student.username}`}</h5>
      </div>

      <Loading load={processing} />

      <div className="add-students-container">

        <div className="add-form">

          <div className="form-container">

            <div className="form-group">
              <InputLabel value='Full-name' />
              <TextInput value={data.name} handleChange={ e => setData('name', e.target.value) } />
              <InputError message={errors.name} />
            </div>

            <div className="form-group">
              <InputLabel value='Full-name in Arabic' />
              <TextInput value={data.arabic_name} handleChange={ e => setData('arabic_name', e.target.value) } />
              <InputError message={errors.arabic_name} />
            </div>

            <div className="form-group">
              <InputLabel value='Username' />
              <TextInput value={data.username} handleChange={ e => setData('username', e.target.value) } />
              <InputError message={errors.username} />
            </div>

            <div className="form-group">
              <InputLabel value='E-mail' />
              <TextInput value={data.email} handleChange={ e => setData('email', e.target.value) } />
              <InputError message={errors.email} />
            </div>

            <div className="form-group">
              <SelectBox
                label='Department'
                handleChange={ e => {
                  setData('department', e.target.value)
                  setDepartmentYears(years => years.map(year => year.department == data.department))
                }}
                selectedOptionValue={student.department.id}
                items={departments.map(item => {
                  return {value: item.id, text: item.title}
                })}
                error={errors.department}
              />
            </div>


            <div className="form-group">
              <SelectBox
                label='Year'
                handleChange={ e => setData('year', e.target.value) }
                selectedOptionValue={student.department.id}
                items={departmentYears.map(item => {
                  return {value: item.id, text: item.title + ' - ' + item.term_name}
                })}
                error={errors.year}
              />
            </div>

            <div className="form-group">
              <InputLabel value='University E-mail' />
              <TextInput value={data.university_email} handleChange={ e => setData('university_email', e.target.value) } />
              <InputError message={errors.university_email} />
            </div>

            <div className="form-group">
              <InputLabel value='University Code' />
              <TextInput value={data.university_code} handleChange={ e => setData('university_code', e.target.value) } />
              <InputError message={errors.university_code} />
            </div>

            <div className="form-group">
              <InputLabel value='National ID' />
              <TextInput value={data.national_id} handleChange={ e => setData('national_id', e.target.value) } />
              <InputError message={errors.national_id} />
            </div>

            <div className="form-group">
              <InputLabel value='Phone Number' />
              <TextInput value={data.phone} handleChange={ e => setData('phone', e.target.value) } />
              <InputError message={errors.phone} />
            </div>

            <div className="form-group">
              <InputLabel value='Address' />
              <TextInput value={data.address} handleChange={ e => setData('address', e.target.value) } />
              <InputError message={errors.address} />
            </div>

            <div className="form-file-group">
              <InputLabel value='Picture' />
              <TextInput handleChange={ e => setData('picture', e.target.files[0]) } type='file' />
              <FontAwesomeIcon icon={faFile} />
              <InputError message={errors.picture} />
            </div>

            <div className="form-group">
              <InputLabel value='Password' />
              <TextInput value={data.password} handleChange={ e => setData('password', e.target.value) } type='password' />
              <InputError message={errors.password} />
            </div>

            <div className="form-group">
              <button onClick={handleCreation} className='btn btn-primary'>Update</button>
            </div>

          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default UpdateStudent
