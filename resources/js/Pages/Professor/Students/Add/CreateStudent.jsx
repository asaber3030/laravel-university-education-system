import './create-student.scss'

import { useEffect, useState } from "react"
import { useForm, usePage, Head } from "@inertiajs/inertia-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { StudentsColumns } from "@/columns/students"
import { CheckBox, FormContainer, InputField, SelectBox } from "@/components/Form/FormContainer";

import List from "@/components/List/List"
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import InputLabel from "@/components/InputLabel"
import TextInput from "@/components/TextInput"
import InputError from "@/components/InputError"
import Loading from "@/components/Loading/Loading";

const CreateStudent = () => {

  const { students, departments, years } = usePage().props

  const [departmentActivated, setDepartment] = useState(false)
  const [createSemester, setSemesterStatus] = useState(false)
  const [departmentYears, setDepartmentYears] = useState([])

  const { data, setData, processing, errors, post } = useForm({
    name: '',
    arabic_name: '',
    username: '',
    email: '',
    department: '',
    university_email: '',
    university_code: '',
    national_id: '',
    phone: '',
    address: '',
    picture: '',
    password: '',
    year: '',
    grade: 0,
    title: '',
    information: '',
    is_done: false,
    started: '',
    ended: '',
    addSemester: false
  })

  const handleCreation = () => {
    post(route('professors.students.create'))
    console.log(errors)
  }

  useEffect(() => {
    setDepartmentYears(years.filter(year => year.department == data.department))
    setDepartment(departmentYears.length > 0)
  }, [data.department])

  return (
    <ProfessorLayout>

      <Head title='Create Student' />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faUserPlus} /> Create Student</h5>
      </div>

      <Loading load={processing} />

      <div className="add-students-container">

        <div className="add-form">

          <div className="form-container">

            <div className="form-group">
              <InputLabel value='Full-name' />
              <TextInput handleChange={ e => setData('name', e.target.value) } />
              <InputError message={errors.name} />
            </div>

            <div className="form-group">
              <InputLabel value='Full-name in Arabic' />
              <TextInput handleChange={ e => setData('arabic_name', e.target.value) } />
              <InputError message={errors.arabic_name} />
            </div>

            <div className="form-group">
              <InputLabel value='Username' />
              <TextInput handleChange={ e => setData('username', e.target.value) } />
              <InputError message={errors.username} />
            </div>

            <div className="form-group">
              <InputLabel value='E-mail' />
              <TextInput handleChange={ e => setData('email', e.target.value) } />
              <InputError message={errors.email} />
            </div>

            <div className="form-group">
              <SelectBox
                label='Department'
                handleChange={ e => {
                  setData('department', e.target.value)
                  setDepartment(status => true)
                  setDepartmentYears(years => years.map(year => year.department == data.department))
                }}
                items={departments.map(item => {
                  return {value: item.id, text: item.title}
                })}
              />
              <InputError message={errors.department} />
            </div>


            <div className="form-group">
              <InputLabel value='Year' />
              <select className='form-select' onChange={ e => setData('year', parseInt(e.target.value)) }>
                <option value=''>----------</option>
                {departmentYears.map(item => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
              <InputError message={errors.year} />
            </div>

            <div className="form-group">
              <InputLabel value='University E-mail' />
              <TextInput handleChange={ e => setData('university_email', e.target.value) } />
              <InputError message={errors.university_email} />
            </div>

            <div className="form-group">
              <InputLabel value='University Code' />
              <TextInput handleChange={ e => setData('university_code', e.target.value) } />
              <InputError message={errors.university_code} />
            </div>

            <div className="form-group">
              <InputLabel value='National ID' />
              <TextInput handleChange={ e => setData('national_id', e.target.value) } />
              <InputError message={errors.national_id} />
            </div>

            <div className="form-group">
              <InputLabel value='Phone Number' />
              <TextInput handleChange={ e => setData('phone', e.target.value) } />
              <InputError message={errors.phone} />
            </div>

            <div className="form-group">
              <InputLabel value='Address' />
              <TextInput handleChange={ e => setData('address', e.target.value) } />
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
              <TextInput handleChange={ e => setData('password', e.target.value) } type='password' />
              <InputError message={errors.password} />
            </div>

            <div className="form-group">
              <button onClick={handleCreation} className='btn btn-primary'>Create</button>
            </div>

          </div>

        </div>

        <div className="add-semester">
          <div className="add-semester-header">
            <h5>Add Semester</h5>
            <CheckBox value={createSemester} handleChange={ e => { setSemesterStatus(e.target.checked); setData('addSemester', e.target.checked) } } />
          </div>

          {createSemester ? (
            <FormContainer>
              <InputField value={data.grade} type='number' handleChange={ e => setData('grade', e.target.value) } label={'Student Grade'} />
              <InputField value={data.title} handleChange={ e => setData('title', e.target.value) } label={'Year Title'} />
              <InputField value={data.information} handleChange={ e => setData('information', e.target.value) } label={'Year Information'} />
              <InputField labelRequired={false} value={data.started} type='datetime-local' handleChange={ e => setData('started', e.target.value) } label={'Started at'} />
              <InputField labelRequired={false} value={data.ended} type='datetime-local' handleChange={ e => setData('ended', e.target.value) } label={'Ended at'} />
              <CheckBox value={data.is_done} handleChange={ e => setData('is_done', e.target.checked) } label={'Is Done?'} />
            </FormContainer>
          ) : (
            <div className="no-semester">
              <div className="alert alert-sm alert-primary">Click the slider checkbox above if you want to include additional information about added student's semester!</div>
            </div>
          )}

        </div>
      </div>

      <List checkBox={false} rows={students} contentHeight={400} columns={StudentsColumns} />

    </ProfessorLayout>
  )
}

export default CreateStudent
