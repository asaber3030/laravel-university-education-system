import { Head, Link, usePage } from "@inertiajs/inertia-react";

import './student-quizzes.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import { Tooltip } from "@mui/material";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import createBreadCrumb from "@/helpers/functions/createBreadcrumb";
import formatDate from "@/helpers/functions/format-date";
import {FormContainer, SelectBox} from "@/components/Form/FormContainer";
import {useEffect, useState} from "react";

const ViewStudentQuizzes = () => {

  const { student, quizzes } = usePage().props

  const [filterQuizzes, setFilteredQuizzes] = useState(quizzes.filter(quiz => quiz.year == student.year))
  const [choosedYear, setChoosedYear] = useState(student.year)

  useEffect(() => {
    if (choosedYear) {
      setFilteredQuizzes(quizzes.filter(quiz => quiz.year == choosedYear))
    }
  }, [choosedYear])

  return (
    <ProfessorLayout>

      <Head title={`Student Quizzes - ${student.username}`} />

      <PageHeader
        allowBreadcrumb={true}
        breadCrumbs={[
          createBreadCrumb(1, 'Home',  false,false, 'professors.dashboard'),
          createBreadCrumb(2, 'Students', false, false, 'professors.students.list'),
          createBreadCrumb(3, student.username, true, false, 'professors.students.view', student.id),
          createBreadCrumb(4, 'Quizzes', false, true, 'professors.students.quizzes', student.id),
        ]}
        pageTitle={'Student Quizzes - ' + student.username}
        pageIcon={faQuestionCircle}
        pageRightComponent={
          <RightComponent
            value={choosedYear}
            handleChange={ e => setChoosedYear(e.target.value) }
            items={student.semesters.map(sem => {
              return {
                value: sem.year.id,
                text: `${sem.year.title} - ${sem.year.term_name}`
              }
        })} /> }
      />

      <div className="student-quizzes">

        <table className='table table-responsive table-striped'>
          <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Subject</th>
            <th>Total Marks</th>
            <th>True Questions</th>
            <th>Wrong</th>
            <th>Starting</th>
            <th>Finish</th>
            <th>Minutes</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {quizzes.map(quiz => {
              let noOfTrue = quiz.answers.filter(e => e.grade > 0)
              let noOfFalse = quiz.answers.filter(e => e.grade == 0)
              let sumGrades = 0;
              quiz.answers.map(e => sumGrades += e.grade)

              return (
                <>
                  <tr>
                    <td>{quiz.id}</td>
                    <td><Link href={route('professors.subjects.grades', quiz.subject.id)}>{quiz.subject.title}</Link></td>
                    <td><b>{sumGrades}</b> mark(s)</td>
                    <td><b>{noOfTrue.length}</b> question(s)</td>
                    <td><b>{noOfFalse.length}</b> question(s)</td>
                    <td>{formatDate(quiz.start)}</td>
                    <td>{formatDate(quiz.end)}</td>
                    <td>{quiz.minutes}</td>
                    <td>{QUIZ_STATUS_OBJECT[quiz.status]}</td>
                    <td>
                      <div className="table-actions">
                        <Tooltip title='View Answers'>
                          <Link href={route('professors.quiz.answers.student', [quiz.id, student.id])} className="btn btn-sm btn-dark action"><FontAwesomeIcon icon={faEye} /></Link>
                        </Tooltip>
                        <Tooltip title='Assign Grade to Semester'>
                          <Link className="btn btn-sm btn-dark action"><FontAwesomeIcon icon={faPlus} /></Link>
                        </Tooltip>
                      </div>

                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>

      </div>

    </ProfessorLayout>
  )
}

const RightComponent = ({ value, handleChange, items, }) => {
  return (
    <FormContainer>
      <SelectBox
        items={items}
        handleChange={handleChange}
        selectedOptionValue={value}
      />
    </FormContainer>
  )
}

export default ViewStudentQuizzes
