import { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import './list-students.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faFileExport, faFileImport, faTrash, faTrashRestore, faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { DataGrid } from "@mui/x-data-grid";
import { StudentsColumns } from "@/columns/students";
import { Tooltip } from "@mui/material";
import { SelectBox } from "@/components/Form/FormContainer";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

const ListStudents = () => {

  const { professor, students, years, departments, yearID, depID } = usePage().props
  const [choosedDep, setChoosedDep] = useState(depID ?? null)
  const [choosedYear, setChoosedYear] = useState(yearID ?? null)

  const handleRouteRedirect = () => {
    if (choosedDep && choosedYear) {
      Inertia.get(route('professors.students.list', [choosedDep, choosedYear]))
    }
    if (choosedDep && !choosedYear) {
      Inertia.get(route('professors.students.list', [choosedDep]))
    }
  }

  const clearFilter = () => {
    Inertia.get(route('professors.students.list'))
  }

  return (
    <ProfessorLayout>

      <div className="layout-header">
        <h4><FontAwesomeIcon icon={faUser} /> Students</h4>
        <div className="layout-actions">
          <Tooltip followCursor={true} title='Import Students'>
            <Link href={route('professors.students.import')} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faFileImport} /></Link>
          </Tooltip>
          <Tooltip followCursor={true} title='Export Students'>
            <Link href='' className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faFileExport} /></Link>
          </Tooltip>
          <Tooltip followCursor={true} title='Create'>
            <Link href={route('professors.students.create')} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faUserPlus} /></Link>
          </Tooltip>
        </div>
      </div>

      <div className="groupBy d-flex" style={{ gap: '5px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <SelectBox
            startingText='Choose Department....'
            selectedOptionValue={choosedDep ? departments.find(dep => dep.id == choosedDep).id : null}
            handleChange={ e => setChoosedDep(e.target.value) }
            items={departments.map(dep => {
              return { value: dep.id, text: dep.title }
            })}
          />
        </div>

        <div style={{ flex: 1 }}>
          <SelectBox
            startingText='Choose year after choosing department....'
            selectedOptionValue={choosedYear ? years.find(yr => yr.id == choosedYear).id : null}
            handleChange={ e => setChoosedYear(e.target.value) }
            items={years.filter(year => year.department == choosedDep).map(dep => {
              return { value: dep.id, text: dep.title }
            })}
          />
        </div>

        <div style={{ flex: .6, display: 'flex', gap: 3 }}>
          <button onClick={handleRouteRedirect} className='btn btn-sm btn-secondary'>Group</button>
          <button onClick={clearFilter} className='btn btn-sm btn-dark'>Clear Filter</button>
        </div>

      </div>

      <List rows={students} columns={StudentsColumns} />

    </ProfessorLayout>
  )
}

export default ListStudents
