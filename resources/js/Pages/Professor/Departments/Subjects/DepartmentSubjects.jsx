import { Head, Link, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import List from "@/components/List/List";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faPlus } from "@fortawesome/free-solid-svg-icons";

import { StudentsColumns } from "@/columns/students";
import {SubjectsColumns} from "@/columns/subjects";

const DepartmentSubjects = () => {

  const { department, subjects } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`Subjects - Department: ${department.title}`} />

      <ProfessorLayoutHeader title={`Students - Department: ${department.title} - ${subjects ? subjects.length : '0'} subject`} icon={faLayerGroup}></ProfessorLayoutHeader>

      {subjects.length > 0 ? (
        <List rows={subjects} columns={SubjectsColumns} checkBox={false} />
      ) : (
        <div className="alert alert-sm alert-primary">No Subjects Has been added. <Link href={route('professors.subjects.create', department.id)}>Add Subject</Link></div>
      )}

    </ProfessorLayout>
  )
}

export default DepartmentSubjects
