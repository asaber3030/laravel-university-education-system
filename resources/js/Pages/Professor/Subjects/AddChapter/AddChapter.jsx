import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {usePage, Link, useForm, Head} from "@inertiajs/inertia-react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import List from "@/components/List/List";
import {ChaptersColumns} from "@/columns/chapters";
import {FileInput, FormContainer, InputField, TextArea} from "@/components/Form/FormContainer";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading/Loading";

const AddChapter = () => {

  const [showChapterTitle, setChapterTitleStatus] = useState(false)

  const { subject, appURL, lastChapterNumber } = usePage().props
  const { data, errors, post, setData, processing } = useForm({
    name: '',
    order: lastChapterNumber,
    file: '',
    info: ''
  })

  useEffect(() => {
    if (data.name && data.order) {
      setChapterTitleStatus(true)
    } else {
      setChapterTitleStatus(false)
    }
  }, [data.name, data.order])

  const handleAddChapter = () => {
    post(route('professors.subjects.create.chapter', subject.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Add Chapter for Subject - ${subject.title}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader title={`Add Chapter - ${subject.title}`} icon={faPlus}>
        <Link href={route('professors.subjects.chapters', subject.id)} className='btn-sm btn btn-secondary'>{`${subject.title} Chapters`}</Link>
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
            handleChange={ e => setData('file', e.target.files[0]) }
            error={errors.file}
          />

          <div className="form-group">
            <button onClick={handleAddChapter} className='btn btn-primary'>Create Chapter for <b>{subject.title}</b></button>
          </div>

        </FormContainer>

        <List columns={ChaptersColumns} rows={subject.chapters} />

      </div>

    </ProfessorLayout>
  )
}

export default AddChapter
