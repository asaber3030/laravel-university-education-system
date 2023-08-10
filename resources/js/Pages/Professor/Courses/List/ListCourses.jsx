import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {CoursesColumns} from "@/columns/courses";

const ListCourses = () => {

  const { courses } = usePage().props

  return (

    <ProfessorLayout>

      <Head title={`Courses`} />

      <ProfessorLayoutHeader title={`Courses`} icon={faPlay}>
        <Link href={route('professors.courses.add')} className='btn btn-primary'><FontAwesomeIcon icon={faPlus} /> Create</Link>
      </ProfessorLayoutHeader>

      <List rows={courses} columns={CoursesColumns} />

    </ProfessorLayout>
  )
}

export default ListCourses
