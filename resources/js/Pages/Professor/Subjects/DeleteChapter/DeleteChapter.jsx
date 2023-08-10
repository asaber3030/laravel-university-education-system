import { usePage, Link, useForm, Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import ActionAlert from "@/components/DeleteAlert/ActionAlert";
import List from "@/components/List/List";

import { ChaptersColumns } from "@/columns/chapters";

import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const AddChapter = () => {

  const { subject, appURL, chapter } = usePage().props

  const handleDeleteChapter = () => {
    Inertia.post(route('professors.subjects.delete.chapter', [subject.id, chapter.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Delete Chapter - ${chapter.name}`} />

      <ProfessorLayoutHeader title={`Delete Chapter - ${chapter.name}`} icon={faTrash}>
        <Link href={route('professors.subjects.chapters', subject.id)} className='btn-sm btn btn-secondary'>{`${subject.title} Chapters`}</Link>
      </ProfessorLayoutHeader>

      <div className="add-chapter">

        <ActionAlert
          title={`Delete Chapter!`}
          type='delete'
          submitAction={handleDeleteChapter}
          cancelRoute={'professors.subjects.chapters'}
          cancelParams={subject.id}
          paragraph={`Are you sure that you want to delete this chapter ${chapter.name}`}
        />

        <List columns={ChaptersColumns} checkBox={false} rows={subject.chapters} />

      </div>

    </ProfessorLayout>
  )
}

export default AddChapter
