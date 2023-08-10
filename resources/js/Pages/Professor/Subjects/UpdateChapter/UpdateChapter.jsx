import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {usePage, Link, useForm, Head} from "@inertiajs/inertia-react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import List from "@/components/List/List";
import {ChaptersColumns} from "@/columns/chapters";
import {FileInput, FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";
import {useEffect, useState} from "react";

const UpdateChapter = () => {

  const [showChapterTitle, setChapterTitleStatus] = useState(false)

  const { subject, chapter, appURL, lastChapterNumber } = usePage().props
  const { data, errors, post, setData } = useForm({
    name: chapter.name,
    order: chapter.number,
    file: '',
    info: chapter.info
  })

  useEffect(() => {
    if (data.name && data.order) {
      setChapterTitleStatus(true)
    } else {
      setChapterTitleStatus(false)
    }
  }, [data.name, data.order])

  const handleAddChapter = () => {
    post(route('professors.subjects.update.chapter', [subject.id, chapter.id]))
  }

  return (
    <ProfessorLayout>

      <Head title={`Updating Chapter - ${chapter.name}`} />

      <ProfessorLayoutHeader title={`Update Chapter - ${subject.title}`} icon={faPlus}>
        <Link href={route('professors.subjects.chapters', subject.id)} className='btn-sm btn btn-secondary'><b>{subject.title}</b> Chapters</Link>
      </ProfessorLayoutHeader>

      <div className="add-chapter">

        <FormContainer>

          <InputField
            label='Subject'
            value={`${subject.title} - ${subject.code}`}
            disabled={true}
            handleChange={ e => setData('order', e.target.value) }
          />

          <div className="group">
            <InputField
              value={data.name}
              handleChange={ e => setData('name', e.target.value) }
              label='Chapter Name'
              error={errors.name}
            />
            {showChapterTitle && <span className='text-secondary'>Chapter name will appear to students Like this <b>Chapter {data.order} - {data.name}</b></span>}
          </div>

          <InputField
            label='Chapter Order'
            value={data.order}
            handleChange={ e => setData('order', e.target.value) }
            error={errors.order}
          />

          <TextArea
            label='Description'
            value={data.info}
            error={errors.info}
            handleChange={ e => setData('info', e.target.value) }
          />

          <FileInput
            label='Chapter File'
            labelRequired={false}
            handleChange={ e => setData('file', e.target.files[0]) }
            error={errors.file}
          />

          <div className="form-group">
            <button onClick={handleAddChapter} className='btn btn-primary'>Update Chapter</button>
          </div>

        </FormContainer>

        <List columns={ChaptersColumns} rows={subject.chapters} />

      </div>

    </ProfessorLayout>
  )
}

export default UpdateChapter
