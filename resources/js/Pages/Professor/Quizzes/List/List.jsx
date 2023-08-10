import './list-quizzes.scss'

import {Head, Link, usePage} from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import {FormContainer, InputField, SelectBox} from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBuilding, faEdit, faEye, faGraduationCap, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

import formatDate from "@/helpers/functions/format-date";

import { Tooltip } from "@mui/material";

const List = () => {

  const { year, quizzes, semesters, subjects } = usePage().props

  const [choosedYear, setChoosedYear] = useState(year != null ? year.id : null)
  const [choosedSubject, setChoosedSubject] = useState(null)
  const [subjectCode, changeSubjectCode] = useState(null)

  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes)
  const [filteredSubjects, setFilteredSubjects] = useState([])

  useEffect(() => {

    if (choosedYear != null && choosedSubject != null) {
      setFilteredQuizzes(quizzes.filter(q => q.year == choosedYear && q.subject.id == choosedSubject))
      const getYear = semesters.find(se => se.id == choosedYear)
      setFilteredSubjects(subjects.filter(su => su.department == getYear.department))
    }
    if (choosedYear != null && choosedSubject == null) {
      setFilteredQuizzes(quizzes.filter(q => q.year == choosedYear))
      const getYear = semesters.find(se => se.id == choosedYear)
      setFilteredSubjects(subjects.filter(su => su.department == getYear.department))
    }
    if (choosedYear == null && choosedSubject != null) {
      setFilteredQuizzes(quizzes.filter(q => q.subject.id == choosedSubject))
      const getYear = semesters.find(se => se.id == choosedYear)
      setFilteredSubjects(subjects.filter(su => su.department == getYear.department))
    }

    if (subjectCode != null) {
      setFilteredQuizzes(quizzes.filter(q => q.subject.code == subjectCode))
    }

    changeSubjectCode(null)

  }, [choosedYear, choosedSubject, subjectCode])

  return (
    <ProfessorLayout>

      <Head title={'Quizzes'} />

      <ProfessorLayoutHeader icon={faQuestionCircle} title={`Quizzes ${year ? '- ' + year.title + ' - ' + year.term_name : ''}`}>
        <Link className='btn btn-sm btn-primary' href={route('professors.quiz.create')}>Create Quiz</Link>
      </ProfessorLayoutHeader>

      <div className="group-lists">

        <div className="filter-quizzes">

          <div className="filter-group">

            <h6 className="default-title">Filter Quizzes</h6>

            <FormContainer>

              <InputField
                placeholder="Enter Subject Code"
                label="Subject code"
                handleChange={ e => changeSubjectCode(e.target.value) }
                labelRequired={false}
                value={subjectCode}
              />

            </FormContainer>

            <SelectBox
              label='Choose Year'
              selectedOptionValue={year ? year.id : ''}
              items={semesters.map(s => {
                return { value: s.id, text: `${s.title + ' - ' + s.term_name}` }
              })}
              handleChange={ e => setChoosedYear(e.target.value) }
            />

            {choosedYear && (
              <>
                <SelectBox
                  label='Subject'
                  items={filteredSubjects.map(s => {
                    return { value: s.id, text: `${s.title + ' - ' + 'View: ' + s.code}` }
                  })}
                  handleChange={ e => setChoosedSubject(e.target.value) }
                />
              </>
            )}
          </div>

        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="quizzes-list">
            {filteredQuizzes.map(quiz => (
              <div className="quiz">
                <div className="left-su">
                  <Link href={route('professors.subjects.chapters', quiz.subject.id)}>{quiz.subject.title}</Link>
                </div>
                <div className="right-su">
                  <div className="left-quiz-d">
                    <h6>{quiz.title} - <b>{`${quiz.questions.length} question(s)`}</b></h6>
                    <span>{formatDate(quiz.created_at)}</span>
                  </div>
                  <div className="right-quiz-d">
                    <Tooltip title='Update Quiz information'>
                      <Link href={route('professors.quiz.update', quiz.id)} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faEdit} /></Link>
                    </Tooltip>
                    <Tooltip title='Preview'>
                      <Link className='btn btn-sm btn-dark' href={route('professors.quiz.view', quiz.id)}><FontAwesomeIcon icon={faEye} /></Link>
                    </Tooltip>
                    <Tooltip title='View Answers'>
                      <Link className='btn btn-sm btn-dark' href={route('professors.quiz.answers', quiz.id)}><FontAwesomeIcon icon={faGraduationCap} /></Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-sm alert-primary" style={{ height: "fit-content" }}>
            There's no quizzes!
          </div>
        )}

      </div>



    </ProfessorLayout>
  )
}

export default List
