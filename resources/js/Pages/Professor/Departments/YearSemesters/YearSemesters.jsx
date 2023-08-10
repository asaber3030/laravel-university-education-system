
import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";


import {faChalkboardTeacher, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CheckBox, FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {readCSV} from "@/helpers/functions/convertCSVToArray";
import {useState} from "react";
import {SemestersColumns} from "@/columns/semesters";

const YearSemesters = () => {

  const { year } = usePage().props
  console.log(year.semesters)

  return (
    <ProfessorLayout>

      <Head title={`Create Semester - ${year.title}`} />

      <ProfessorLayoutHeader title={`Year Semesters - ${year.title}`} icon={faChalkboardTeacher}></ProfessorLayoutHeader>

      <div className="year-semesters">

        <List columns={SemestersColumns} rows={year.semesters} checkBox={false} />

      </div>

    </ProfessorLayout>
  )
}

export default YearSemesters
