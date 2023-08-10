import './teaching-staff.scss'

import List from "@/components/List/List";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";

import { StaffColumns } from "@/columns/staff";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { SelectBox, SelectOptionGroup } from "@/components/Form/FormContainer";
import { useEffect, useState } from "react";
import { usePage, Link } from "@inertiajs/inertia-react";


const ListStaff = () => {

  const { staff, years, subjects } = usePage().props

  const [sYear, ssYear] = useState()
  const [sType, ssType] = useState()
  const [sSubject, ssSubject] = useState()
  const [filters, setFilters] = useState([])

  const [filtered, setFiltered] = useState(staff)

  useEffect(() => {

    if (filters.includes('type') && sType != null) {
      setFiltered(staff.filter(e => e.type == sType))
    }

    if (filters.includes('subject') && sSubject != null) {
      setFiltered(staff.filter(e => e.subject.id == sSubject))
    }

    if (filters.includes('year') && sYear != null) {
      setFiltered(staff.filter(e => e.year.id == sYear))
    }

    if (filters.includes('year') && filters.includes('subject') && filters.includes('type')) {
      setFiltered(staff.filter(e => e.year.id == sYear && e.subject.id == sSubject && e.type == sType))
    }

    if (filters.includes('type') && filters.includes('subject') && sType != null && sSubject != null) {
      setFiltered(staff.filter(e => e.type == sType && e.subject.id == sSubject))
    }

    if (filters.includes('type') && filters.includes('year') && sYear != null && sType != null) {
      setFiltered(staff.filter(e => e.type == sType && e.year.id == sYear))
    }

    if (filters.includes('subject') && filters.includes('year') && sYear != null && sSubject != null) {
      setFiltered(staff.filter(e => e.subject.id == sSubject && e.year.id == sYear))
    }

    console.log(filters)
  }, [filters])

  const clearFilters = () => {
    setFiltered(staff)
  }

  return (
    <ProfessorLayout>

      <ProfessorLayoutHeader
        title='Teaching Staff Of Every Year'
        icon={faChalkboardTeacher}
      >

        <Link className='btn btn-sm btn-dark' href={route('professors.staff.add')}>Add Staff</Link>

      </ProfessorLayoutHeader>

      <div className="filter-data">

        <div className="group-filter">
          <SelectBox
            handleChange={ e => {
              ssType(e.target.value)
              setFilters(e.target.value && !filters.includes('type') ? [...filters, 'type'] : [...filters]);
            }}
            items={[
              { text: 'All', value: 2 },
              { text: 'Professor / Doctor', value: 0 },
              { text: 'Teacher Assistant', value: 1 },
            ]}
            label='Filter Staff'
          />

          <SelectOptionGroup
            label='Select Semester'
            handleChange={ e => {
              ssYear(e.target.value)
              setFilters(e.target.value && !filters.includes('year') ? [...filters, 'year'] : [...filters]);
            }}
            items={years.map(dep => {
              return { groupTitle: dep.title, list: dep.years.map(n => {
                  return { text: `${n.title} - ${n.term_name}`, value: n.id  }
                })}
            })}
          />

          <SelectBox
            label='Subject'
            handleChange={ e => {
              ssSubject(e.target.value)
              setFilters(e.target.value && !filters.includes('subject') ? [...filters, 'subject'] : [...filters]);
            }}
            items={subjects.map(n => {
              return { text: `${n.title} (${n.code})`, value: n.id  }
            })}
          />
        </div>

        <button onClick={ clearFilters } className='btn btn-sm btn-dark'>
          Clear Filters
        </button>

      </div>

      <List
        columns={StaffColumns}
        rows={filtered}
        checkBox={false}
      />

    </ProfessorLayout>
  )
}

export default ListStaff
