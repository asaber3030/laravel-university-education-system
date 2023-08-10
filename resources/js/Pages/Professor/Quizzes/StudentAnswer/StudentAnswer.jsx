import './student-answer.scss'

import { Head, useForm, usePage, Link } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import Loading from "@/components/Loading/Loading";

import { FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faEye,
  faGraduationCap,
  faPercentage,
  faQuestionCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import { QUIZ_STATUS_ARRAY, QUIZ_STATUS_OBJECT } from "@/helpers/constants";
import {Button, Tooltip} from "@mui/material";
import formatDate from "@/helpers/functions/format-date";
import StudentCard from "@/components/StudentCard/StudentCard";
import {nationalID, showStudentDepartment, showStudentPhone, showStudentUsername} from "@/helpers/functions/student";

const StudentAnswers = () => {

  const { quiz, student, appURL } = usePage().props

  console.log(student.quizzes_answers)

  const noOfCorrectAnswers = student.quizzes_answers.map(a => a.answer.is_correct == 1).length
  const noOfWrongAnswers = student.quizzes_answers.map(a => a.answer.is_correct == 0).length
  const noOfQuestions = student.quizzes_answers.length
  const questionGrade = quiz.grade / noOfQuestions
  const studentMarks = questionGrade * noOfCorrectAnswers

  console.log(student.quizzes_answers)

  return (
    <ProfessorLayout>

      <Head title={`Student Answers for - Quiz - #${quiz.id}`} />

      <ProfessorLayoutHeader icon={faPercentage} title={<span>Student - <b><Link href={route('professors.students.view', student.id)}>{student.username}</Link></b> Answers for Quiz - <b><Link href={route('professors.quiz.view', quiz.id)}>#{quiz.id}</Link></b></span>} />

      <div className="student-answers">

        <div className="quiz-answers">

          <StudentCard student={student} />

          <div className="actions">

            <Link href={route('professors.students.view', student.id)}>
              <Button variant='contained' size='small'><FontAwesomeIcon icon={faGraduationCap} /> Student</Button>
            </Link>

            <Link href={route('professors.students.view', student.id)}>
              <Button color='error' variant='contained' size='small'><FontAwesomeIcon icon={faQuestionCircle} /> Quizzes</Button>
            </Link>

            <Link href={route('professors.students.view', student.id)}>
              <Button color='secondary' variant='contained' size='small'><FontAwesomeIcon icon={faCheck} /> Assignments</Button>
            </Link>

            <Link href={route('professors.students.view', student.id)}>
              <Button color='success' variant='contained' size='small'><FontAwesomeIcon icon={faEdit} /> Update Student</Button>
            </Link>
          </div>

          <div className="questions">

            {quiz.questions.map((question, idx) => (
              <div className="question">
                <div className="question-header">
                  <h6 className="question-title"><b>Q{idx + 1}. </b> {question.title}</h6>
                  {question.image && (
                    <img src={appURL + question.image} alt="Question Image" />
                  )}
                </div>

                <div className="question-mcq">
                  {question.mcq.map(m => {
                    const f = student.quizzes_answers.find(a => m.title == a.answer.title);

                    return (
                      <>
                        <label className={`mcq`}>{m.title}</label>
                        <span>Choosed: <b>{f && f.answer.title}</b></span>
                      </>
                    )
                  })}
                </div>
              </div>
            ))}

            {/*{student.quizzes_answers.map((ans, idx) => (*/}

            {/*  <div className="question">*/}
            {/*    <div className="question-header">*/}
            {/*      <h6 className='question-title'><b>Q{idx+1}.</b> {ans.question.title}</h6>*/}
            {/*      {ans.question.image && (*/}
            {/*        <img src={appURL + ans.question.image} alt="Question Image" />*/}
            {/*      )}*/}
            {/*    </div>*/}

            {/*    <div className="question-mcq">*/}
            {/*      {ans.question.mcq.map(mcq => (*/}
            {/*        <label className={`mcq ${ans.student == mcq ? 'correct-val-lbl' : 'wrong-val-lbl'}`} htmlFor={`mcq_id_${mcq.id}`}>*/}
            {/*          {ans.question.answer == ans.title && (*/}
            {/*            <FontAwesomeIcon icon={faCheck} />*/}
            {/*          )}*/}
            {/*          {mcq.title}*/}
            {/*        </label>*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*))}*/}

          </div>

        </div>

        <div className="quiz-total-details">

          <div className="list-items student-details">
            <ul>
              <li>
                <span>Total Questions: </span>
                <span>{noOfQuestions} questions</span>
              </li>
              <li>
                <span>True Answers: </span>
                <span>{noOfCorrectAnswers} questions</span>
              </li>
              <li>
                <span>Wrong answers: </span>
                <span>{noOfWrongAnswers} questions</span>
              </li>
              <li>
                <span>Total Marks: </span>
                <span>{studentMarks} marks</span>
              </li>
              <li>
                <span>Assigned?</span>
                <span className='text-success'>Yes</span>
              </li>
              <button className='btn btn-sm mt-2 block w-full btn-primary'>Assign</button>
            </ul>
          </div>

          <div className="student-details list-items">

            <h6 className='default-title'><FontAwesomeIcon icon={faGraduationCap} /> Student Details</h6>

            <ul>
              <li><span>National ID</span> <span>{nationalID(student.national_id)}</span></li>
              <li><span>University Code</span> <span>{nationalID(student.university_code)}</span></li>
              <li><span>University E-mail</span> <span>{student.university_email}</span></li>
              <li><span>E-mail Address</span> <span>{student.email}</span></li>
              <li><span>Username</span> <span>{showStudentUsername(student)}</span></li>
              <li><span>Address</span> <span>{student.address}</span></li>
              <li><span>Department</span> <span>{showStudentDepartment(student)}</span></li>
              <li><span>Last Update</span> <span>{formatDate(student.updated_at)}</span></li>
              <li><span>Student Joined In</span> <span>{formatDate(student.created_at)}</span></li>
            </ul>

          </div>

        </div>

      </div>

    </ProfessorLayout>
  )
}

export default StudentAnswers
