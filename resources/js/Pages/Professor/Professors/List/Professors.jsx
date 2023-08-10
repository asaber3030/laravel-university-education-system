import { useState } from "react";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import { ProfessorsColumns } from "@/columns/professors";

const ListProfessors = () => {

  const { professors } = usePage().props

  return (
    <ProfessorLayout>

      <Head title='Professors' />

      <ProfessorLayoutHeader title='Professors / Assistants' icon={faChalkboardTeacher}>
        <Link href={route('professors.create')} className='btn btn-sm btn-dark'>Create</Link>
      </ProfessorLayoutHeader>

      <List rows={professors} checkBox={false} columns={ProfessorsColumns} />

    </ProfessorLayout>
  )
}

export default ListProfessors
