import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";

import { StudentsColumns } from "@/columns/students";

const DepartmentStudents = () => {

  const { department } = usePage().props


  return (
    <ProfessorLayout>

      <Head title={`Students - Department: ${department.title}`} />

      <ProfessorLayoutHeader title={`Students - Department: ${department.title} - ${department.students ? department.students.length : '0'} student(s)`} icon={faLayerGroup}></ProfessorLayoutHeader>

      {department.students && department.students.length > 0 ? (
        <List rows={department.students} columns={StudentsColumns} checkBox={false} />
      ) : (
        <div className="alert alert-sm alert-primary">No Student Has been added for <b>{department.title}</b>. <Link className='alert-link' href={route('professors.deps.students.add.manual', department.id)}>Add Student</Link></div>
      )}

    </ProfessorLayout>
  )
}

export default DepartmentStudents
