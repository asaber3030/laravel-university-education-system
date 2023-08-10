import './create-question.scss';

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import { FileInput, FormContainer, InputField } from "@/components/Form/FormContainer";

import Loading from "@/components/Loading/Loading";

const ListAssignments = () => {

  const { quiz } = usePage().props

  const { post, processing, data, setData, errors } = useForm({
    grade: '',
    title: '',
    answer: '',
    file: '',
    numberOfMCQ: 1,
  })

  const createQuestion = () => {
    post(route('professors.quiz.create.question', quiz.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Create New Question - ${quiz.title}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader title={`Create New Question - ${quiz.title}`} />

      <div className="update-question-container">

        <div className="question-update-form">

          <FormContainer>

            <InputField
              label='Quiz'
              value={"#" + quiz.id + ' - ' + quiz.title}
              labelRequired={false}
              disabled={true}
            />

            <InputField
              label='Subject'
              value={quiz.subject.title}
              labelRequired={false}
              disabled={true}
            />

            <InputField
              label='Question'
              value={data.title}
              handleChange={ e => setData('title', e.target.value) }
              error={errors.title}
            />

            <InputField
              label='Number of MCQ'
              value={data.numberOfMCQ}
              handleChange={ e => setData('numberOfMCQ', e.target.value) }
              error={errors.numberOfMCQ}
            />

            <InputField
              label='Answer'
              value={data.answer}
              handleChange={ e => setData('answer', e.target.value) }
              error={errors.answer}
            />

            <InputField
              label='Grade for question'
              value={data.grade}
              handleChange={ e => setData('grade', e.target.value) }
              error={errors.grade}
            />

            <FileInput
              label='Attach image for question'
              handleChange={ e => setData('file', e.target.files[0]) }
              error={errors.file}
            />

            <div className="form-group">
              <button onClick={createQuestion} className='btn btn-sm btn-primary'>Create Question</button>
            </div>

          </FormContainer>
        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ListAssignments
