import './teaching-staff.scss'

import List from "@/components/List/List";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { FormContainer, InputField, SelectBox, SelectOptionGroup } from "@/components/Form/FormContainer";
import { useEffect, useState } from "react";
import {usePage, Link, useForm} from "@inertiajs/inertia-react";
import CircularProgress from '@mui/material/CircularProgress';


const AddStaff = () => {

  const { years, subjects, professors } = usePage().props

  const { data, setData, post, processing, errors, progress } = useForm({
    type: '',
    year: '',
    subject: ''
  })

  const [selectedSubjects, setSelectedSubjects] = useState([])

  const submitAdd = () => {
    post(route('professors.staff.add'))
  }

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader
        title='Add New Teaching Staff'
        icon={faPlus}
      />


      <div className="add-new-staff">

        <FormContainer>

          <SelectBox
            label='Staff Type'
            items={[ { text: 'Assistant', value: 1 }, { text: 'Professor / Doctor', value: 0 } ]}
            handleChange={ e => setData('type', e.target.value) }
            error={errors.type}
          />

          <SelectOptionGroup
            label='Select Semester'
            handleChange={ e => setData('year', e.target.value) }
            items={years.map(dep => {
              return { groupTitle: dep.title, list: dep.years.map(n => {
                  return { text: `${n.title} - ${n.term_name}`, value: n.id  }
                })}
            })}
            error={errors.year}
          />

          <SelectOptionGroup
            label='Select Doctor or Assistant'
            handleChange={ e => setData('professor', e.target.value) }
            items={professors.map(dep => {
              return { groupTitle: dep.title, list: dep.professors.map(n => {
                  return { text: `${n.type == 0 ? 'Prof. ' : 'Assistant. '} ${n.name} - ${n.username}`, value: n.id  }
                })}
            })}
            error={errors.professor}
          />

          <SelectBox
            label='Subject'
            handleChange={ e => setData('subject', e.target.value) }
            items={subjects.map(n => {
              return { text: `${n.title} (${n.code})`, value: n.id  }
            })}
            error={errors.subject}
          />

          <button onClick={submitAdd} className='btn btn-dark'>
            Add Staff
          </button>

        </FormContainer>

      </div>

    </ProfessorLayout>
  )
}

export default AddStaff
