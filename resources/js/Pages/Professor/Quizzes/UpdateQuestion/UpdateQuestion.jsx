import './update-question.scss'

import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {FileInput, FormContainer, InputField, SelectBox, TextArea} from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";

import { Tooltip } from "@mui/material";

import Loading from "@/components/Loading/Loading";
import {Inertia} from "@inertiajs/inertia";

const UpdateQuestion = () => {

  const { question, quiz } = usePage().props
  const { post, processing, data, setData, errors } = useForm({
    grade: question.grade,
    title: question.title,
    answer: question.answer,
    file: question.file
  })

  const [mcqItemVal, setMCQVal] = useState('')

  const createMCQ = () => {
    Inertia.post(route('professors.quiz.create.mcq', question.id), {
      title: mcqItemVal,
    });
  }

  const updateQuestion = () => {
    post(route('professors.quiz.update.question', question.id))
  }

  return (
    <ProfessorLayout>

      <Head title='Create new quiz!' />

      <Loading load={processing} />

      <ProfessorLayoutHeader
        icon={faEdit}
        title={<span>Update Question - <b>{question.title}</b> - Quiz: <b><Link href={route('professors.quiz.view', quiz.id)}>{quiz.title}</Link></b></span>}>

      </ProfessorLayoutHeader>

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
              <button onClick={updateQuestion} className='btn btn-sm btn-primary'>Update Question</button>
            </div>

          </FormContainer>
        </div>

        <div className="right-details">

          <div className="question-mcq-data">

            <h6 className='default-title'><FontAwesomeIcon icon={faPlus} /> Add New MCQ</h6>

            <FormContainer>

              <InputField
                label='MCQ item Title'
                value={mcqItemVal}
                handleChange={ e => setMCQVal(e.target.value) }
              />

              <div className="form-group">
                <button onClick={createMCQ} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faPlus} /> Create MCQ item</button>
              </div>

            </FormContainer>

          </div>

          <div className="list-mcqs">
            <h6 className='default-title'>Question MCQ</h6>
            {question.mcq.map((q, idx) => (
              <div className="mcq-item" key={idx}>{idx + 1}. {q.title} {q.is_correct == 1 && <span className='text-success'> (Correct Answer)</span>}</div>
            ))}
          </div>

        </div>



      </div>

    </ProfessorLayout>
  )
}

export default UpdateQuestion
