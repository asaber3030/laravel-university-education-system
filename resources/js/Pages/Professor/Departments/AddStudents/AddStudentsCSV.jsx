import './add-students.scss'

import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";

import {faChalkboardTeacher, faFileImport, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {readCSV} from "@/helpers/functions/convertCSVToArray";
import {useState} from "react";
import {STUDENTS_IMPORT_EXCEL_SHEET} from "@/helpers/constants";
import Loading from "@/components/Loading/Loading";

const AddStudentsCSV = () => {

  const { year, customErrors } = usePage().props
  const { data, setData, post, errors, processing } = useForm({
    file: '',
    info: '',
    is_done: false
  })

  const [file, setFile] = useState('')

  const handleSubmit = () => {
    post(route('professors.deps.year.students.add', [year.department.id, year.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Add Students - ${year.title}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader title={`Add Students - ${year.title}`} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

      <div className="add-student-container">

        <div className="add-students">

          {customErrors && customErrors.colsErrors && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Provided data has wrong column names please check rules!
                  <strong>Provided Columns</strong>:
                  {customErrors.colsErrors.map(err => (
                    <span>{err} </span>
                  ))}
                </li>
              </ul>
            </div>
          )}

          {customErrors && customErrors.username && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Duplicated usernames: {customErrors.username.map(err => (
                  <span>{err} </span>
                ))}
                </li>
              </ul>
            </div>
          )}

          {customErrors && customErrors.email && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Duplicated email addresses: {customErrors.email.map(err => (
                  <span>{err} </span>
                ))}
                </li>
              </ul>
            </div>
          )}

          {customErrors && customErrors.national_id && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Duplicated National IDs: {customErrors.national_id.map(err => (
                  <span>{err}</span>
                ))}
                </li>
              </ul>
            </div>
          )}

          {customErrors && customErrors.university_code && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Duplicated University codes: {customErrors.university_code.map(err => (
                  <span>{err} </span>
                ))}
                </li>
              </ul>
            </div>
          )}

          {customErrors && customErrors.university_email && (
            <div className='errors-container'>
              <ul>
                <li className='alert alert-sm alert-primary'>
                  Duplicated University e-mail address: {customErrors.university_email.map(err => (
                  <span>{err} </span>
                ))}
                </li>
              </ul>
            </div>
          )}

          <FormContainer>

            <InputField
              label='Department'
              labelRequired={false}
              value={year.department.title}
              disabled={true}
            />

            <InputField
              label='Studying Year'
              labelRequired={false}
              value={year.title}
              disabled={true}
            />

            <FileInput
              label='CSV File'
              handleChange={ e => setData('file', e.target.files[0]) }
              error={errors.file}
            />

            <div className="form-group">
              <button onClick={handleSubmit} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faFileImport} /> Import Students</button>
            </div>

          </FormContainer>


        </div>

        <div className="cols-desc">
          <h6 className="default-title">Required Fields</h6>
          <ul>
            {STUDENTS_IMPORT_EXCEL_SHEET.map(c => (
              <li>{c.column} <span>{c.type} - ({c.max})</span></li>
            ))}
          </ul>
        </div>

      </div>


    </ProfessorLayout>
  )
}

export default AddStudentsCSV
