import { Head, useForm, usePage } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import Loading from "@/components/Loading/Loading";
import {QUIZ_STATUS_ARRAY} from "@/helpers/constants";

const UpdateQuiz = () => {

  const { quiz } = usePage().props

  const { post, errors, data, setData, processing } = useForm({
    title: quiz.title,
    information: quiz.information,
    start: quiz.start,
    end: quiz.end,
    grade: quiz.grade,
    time: quiz.minutes,
    status: quiz.status
  })

  const updateQuiz = () => {
    post(route('professors.quiz.update', quiz.id))
  }

  return (
    <ProfessorLayout>

      <Head title={`Update Quiz - #${quiz.id}`} />

      <Loading load={processing} />

      <ProfessorLayoutHeader icon={faEdit} title={`Update Quiz - #${quiz.id}`}></ProfessorLayoutHeader>

      <div className="update-quiz-container">

          <FormContainer>

            <InputField
              label='Semester'
              value={quiz.year.title + ' - ' + quiz.year.term_name}
              disabled={true}
              labelRequired={false}
            />

            <InputField
              label='Subject'
              value={quiz.subject.title + ' - Code: ' + quiz.subject.code}
              disabled={true}
              labelRequired={false}
            />

            <SelectBox
              label='Quiz Status'
              handleChange={ e => setData('status', e.target.value) }
              items={QUIZ_STATUS_ARRAY}
              selectedOptionValue={quiz.status}
              error={errors.status}
            />

            <InputField
              label='Quiz Title'
              handleChange={ e => setData('title', e.target.value) }
              value={data.title}
              error={errors.title}
            />

            <InputField
              label='Quiz Grade'
              handleChange={ e => setData('grade', e.target.value) }
              value={data.grade}
              error={errors.grade}
            />

            <TextArea
              label='Quiz Details'
              handleChange={ e => setData('information', e.target.value) }
              value={data.information}
              error={errors.information}
            />

            <div className="group-form">
              <InputField
                label='Start'
                type={'datetime-local'}
                handleChange={ e => setData('start', e.target.value) }
                value={data.start}
                error={errors.start}
              />
              <InputField
                label='End'
                type={'datetime-local'}
                handleChange={ e => setData('end', e.target.value) }
                value={data.end}
                error={errors.end}
              />
              <InputField
                label='Time (in minutes) Ex: 60 means 1 hr'
                handleChange={ e => setData('time', e.target.value) }
                value={data.time}
                error={errors.time}
              />
            </div>

            <div className="form-group">
              <button onClick={ updateQuiz } className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faEdit} /> Update Quiz</button>
            </div>

          </FormContainer>

        </div>

    </ProfessorLayout>
  )
}

export default UpdateQuiz
