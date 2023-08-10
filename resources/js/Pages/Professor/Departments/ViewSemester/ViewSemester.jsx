import './view-semester.scss'
import { Head, Link, usePage } from "@inertiajs/inertia-react";

import { Tooltip } from "@mui/material";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

import { showMarks } from "@/helpers/functions/showMarks";
import formatDate from "@/helpers/functions/format-date";

const YearContent = () => {

  const { year, semester } = usePage().props
  console.log(semester)

  return (
    <ProfessorLayout>

      <Head title={`Semester for student - ${semester.student.username}`} />

      <ProfessorLayoutHeader title={
        <span> Semester of student
          <Link href={route('professors.students.view', semester.student.id)}> {semester.student.username} </Link>
          -
          <Link href={route('professors.deps.year.content', [year.department.id, semester.year.id])}> {semester.year.title} </Link>
        </span>
      } icon={faChalkboardTeacher}>
      </ProfessorLayoutHeader>

      <div className="view-semester-data">
        <div className="left-grades">
            <div className="subject-grade">
              <table className="table table-bordered">
                <thead className='thead-dark'>
                  <tr>
                    <th scope="col">Subject</th>
                    <th scope="col">Total Marks</th>
                    <th scope="col">Final</th>
                    <th scope="col">Mid-term</th>
                    <th scope="col">Lab</th>
                    <th scope="col">Oral</th>
                    <th scope="col">Quizzes</th>
                    <th scope="col">Assignments</th>
                    <th scope="col">Smart</th>
                  </tr>
                </thead>
                <tbody>
                {semester.grades.map(grade => (
                  <tr>
                    {grade.subject.grades ? (
                      <th className={`${grade.total >= grade.subject.grades.total / 2 ? 'bg-success' : 'bg-danger'}`} scope="row"><Link href={route('professors.subjects.chapters', grade.subject.id)}>{grade.subject.title}</Link></th>
                    ) : (
                      <Tooltip followCursor={true} title="Warning: This Subject default grades doesn't exist! click to set">
                        <th className='bg-warning' scope="row"><Link href={route('professors.subjects.chapters', grade.subject.id)}>{grade.subject.title}</Link></th>
                      </Tooltip>
                    )}
                    <td>{showMarks(grade.total)}</td>
                    <td>{showMarks(grade.final)}</td>
                    <td>{showMarks(grade.midterm)}</td>
                    <td>{showMarks(grade.lab)}</td>
                    <td>{showMarks(grade.oral)}</td>
                    <td>{showMarks(grade.quizzes)}</td>
                    <td>{showMarks(grade.assignments)}</td>
                    <td>{showMarks(grade.smart)}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
        </div>

        <div className="right-grades">
          <h6 className='default-title'>{semester.year.title}</h6>
          <div className="list-items">
            <ul>
              <li>
                <span>Started</span>
                <span>{formatDate(semester.started)}</span>
              </li>
              <li>
                <span>Finished</span>
                <span>{semester.ended ? <span className="text-warning">Not yet</span> : formatDate(semester.ended)}</span>
              </li>
              <li>
                <span>Year</span>
                <span><Link href={route('professors.deps.year.content', [semester.year.department, semester.year.id])}>{semester.year.title}</Link></span>
              </li>
              <li>
                <span>Term</span>
                <span>{semester.year.term_name}</span>
              </li>
            </ul>
          </div>
          <div className="actions">
            <Link href={route('professors.students.view', semester.student.id)}>View Student</Link>
            <Link href={route('professors.deps.year.content', [semester.year.department, semester.year.id])}>Year Content</Link>
            <Link href={route('professors.deps.year.update', [semester.year.department, semester.year.id])}>Update Year</Link>
          </div>
        </div>
      </div>

    </ProfessorLayout>
  )
}

export default YearContent
