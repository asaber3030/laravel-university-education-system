import './import.scss'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {faCog, faDownload, faExclamation, faExclamationCircle, faFileImport} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { STUDENTS_IMPORT_EXCEL_SHEET } from "@/helpers/constants";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import { Tooltip } from "@mui/material";

import ExcelPicture from '../../../../assets/images/excel.svg'
import ImportExcel from "@/components/ImportExcel/ImportExcel";
import {useEffect, useState} from "react";

const ImportStudents = () => {

  const { customErrors } = usePage().props
  const { data, setData, post, errors } = useForm({
    file: ''
  })

  const handleSubmit = () => {
    post(route('professors.students.import'))
    console.log(customErrors)
  }

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader title='Import Students' icon={faFileImport} />

      <div className="import-students-container">

        <div className="left-items">
          <div className="upload-file">
            <ImportExcel handleSubmit={handleSubmit} handleChange={ e => setData('file', e.target.files[0]) } />
          </div>

          <div className="errors">
            {customErrors && (
              <>
                {customErrors.username && (
                  <div className="error">
                    <h6>Duplicated <b>usernames</b></h6>
                    <ul>
                      {customErrors.username.map(u => (
                        <li key={Math.random() * 100}>@{u.toLowerCase()}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {customErrors.email && (
                  <div className="error">
                    <h6>Duplicated <b>emails</b></h6>
                    <ul>
                      {customErrors.email.map(u => (
                        <li key={Math.random() * 100}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {customErrors.phone && (
                  <div className="error">
                    <h6>Duplicated <b>phones</b></h6>
                    <ul>
                      {customErrors.phone.map(u => (
                        <li key={Math.random() * 100}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {customErrors.university_email && (
                  <div className="error">
                    <h6>Duplicated <b>University emails</b></h6>
                    <ul>
                      {customErrors.university_email.map(u => (
                        <li key={Math.random() * 100}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {customErrors.university_code && (
                  <div className="error">
                    <h6>Duplicated <b>University codes</b></h6>
                    <ul>
                      {customErrors.university_code.map(u => (
                        <li key={Math.random() * 100}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {customErrors.national_id && (
                  <div className="error">
                    <h6>Duplicated <b>National IDs</b></h6>
                    <ul>
                      {customErrors.national_id.map(u => (
                        <li key={Math.random() * 100}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </>
            )}

          </div>
        </div>

        <div className="right-items">
          <div className="list-items needed-cols">
            <h5 className='default-title'>Required columns in excel sheet</h5>
            <ul>
              {STUDENTS_IMPORT_EXCEL_SHEET.map(field => (
                <li>
                  <span>{field.column}</span>
                  <div>
                    {field.type}
                    <span> </span>
                    <Tooltip title='Max Characters or Max Length of digits'>
                      <b>({field.max})</b>
                    </Tooltip>
                  </div>

                </li>
              ))}
            </ul>
          </div>
          <Link className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faDownload} /> Download Sample</Link>
          <Link className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faCog} /> Update Sample</Link>
        </div>

      </div>

    </ProfessorLayout>
  )

}

export default ImportStudents
