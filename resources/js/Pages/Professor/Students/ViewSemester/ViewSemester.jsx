import './view-semester.scss'

import { useState } from "react"
import { usePage, Link, Head } from "@inertiajs/inertia-react"

import EngineerHelment from '../../../../assets/images/helmet.png'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook, faCheck,
  faCog,
  faEllipsis,
  faEllipsisVertical,
  faGraduationCap, faPercentage, faPlus, faTrash,
  faTrashRestore
} from "@fortawesome/free-solid-svg-icons"
import {faEdit, faEye, faFileLines, faIdCard, faQuestionCircle, faUser} from "@fortawesome/free-regular-svg-icons";

import showStudentName from "@/helpers/functions/showStudentName";
import capitilize from "@/helpers/functions/capitilize";

import { showStudentUsername, showStudentPhone, showStudentDepartment, nationalID } from "@/helpers/functions/student";
import formatDate from "@/helpers/functions/format-date";
import {Tooltip} from "@mui/material";
import StudentActionsDropdown from "@/Pages/Professor/Students/ActionsDropdown/StudentActionsDropdown";
import StudentCard from "@/components/StudentCard/StudentCard";
import {calcPercentage} from "@/helpers/functions/calcPercentage";
import Text from "@/components/TextSuccess/Text";

const ViewSemester = () => {

  const { student, semester, appURL } = usePage().props

  console.log(semester)

  return (
    <ProfessorLayout>

      <Head title={`View Semester - ${student.name}`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faGraduationCap} /> Semester - {semester.year.title} - {showStudentName(student)}</h5>
        <div className="layout-actions">
          <Link href={route('professors.students.semesters.grades.add', [student.id, semester.id])} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faPlus} /> Add Subject Grade</Link>
          <StudentActionsDropdown student={student} />
        </div>
      </div>

      <div className="view-semester">

        <div className="first-column">

          <div className="list-subjects">

            {semester.year.courses.length > 0 ? (
              <>
                {semester.year.courses.map(course => (
                  <>
                    {course.student_grades != null ? (
                      <div className="subject">
                        <h6 className='subject-title'>
                          <span><Link href={route('professors.subjects.chapters', course.subject.id)}>{course.subject.title} - {course.subject.chapters.length ?? 0} chapter(s)</Link></span>
                          <Tooltip title='Click to update!'>
                            <Text><Link href={route('professors.students.semesters.grades.update.final', [student.id, semester.id, course.student_grades.id])}>{course.student_grades != null ? course.student_grades.total + ' marks' : 'Not Set'}</Link></Text>
                          </Tooltip>
                        </h6>
                        <div className="grades-table">
                          <table className="table table-bordered">
                            <thead>
                            <tr>
                              <th className='th-title' scope="col">Type:</th>
                              <th scope="col">Oral</th>
                              <th scope="col">Lab</th>
                              <th scope="col">Mid-term</th>
                              <th scope="col">Assignments</th>
                              <th scope="col">Quizzes</th>
                              <th scope="col">Final</th>
                              <th scope="col">Total</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                              <th className='th-title' scope="col">Student's Marks:</th>
                              <td>
                                <span>{course.student_grades ? course.student_grades.oral : '0'} marks</span>
                              </td>
                              <td>
                                <span>{course.student_grades ? course.student_grades.lab : '0'} marks</span>
                              </td>
                              <td>
                                <span>{course.student_grades ? course.student_grades.midterm : '0'} marks</span>
                              </td>
                              <td>
                                <span>{course.student_grades ? course.student_grades.assignments : '0'} marks</span>
                              </td>
                              <td>
                                <span>{course.student_grades ? course.student_grades.quizzes : '0'} marks</span>
                              </td>
                              <td>
                                <span>{course.student_grades ? course.student_grades.final : '0'} marks</span>
                              </td>
                              {course.student_grades && course.subject.grades ? (
                                <>
                                  {course.subject.grades ? (
                                    <td className={
                                      course.student_grades.total >= course.subject.grades.total / 2 ?
                                        'text-success bg-green' : 'text-danger bg-red'
                                    }>
                                      <span style={{ fontWeight: 'bold' }}>{course.student_grades ? course.student_grades.total : '0'} marks</span>
                                    </td>
                                  ) : (
                                    <td>
                                      <span style={{ fontWeight: 'bold' }}>{course.student_grades ? course.student_grades.total : '0'} marks</span>
                                    </td>
                                  )}

                                </>
                              ) : (
                                <td>
                                  <span style={{ fontWeight: 'bold' }}>{course.student_grades ? course.student_grades.total : '0'} marks</span>
                                </td>
                              )}
                            </tr>
                            {course.subject.grades && (
                              <tr>
                                <th className='th-title' scope="col">Default Marks:</th>
                                <td>{`${course.subject.grades.oral} marks`}</td>
                                <td>{`${course.subject.grades.lab} marks`}</td>
                                <td>{`${course.subject.grades.midterm} marks`}</td>
                                <td>{`${course.subject.grades.assignments} marks`}</td>
                                <td>{`${course.subject.grades.quizzes} marks`}</td>
                                <td>{`${course.subject.grades.final} marks`}</td>
                                <td>{`${course.subject.grades.total} marks`}</td>
                              </tr>
                            )}
                            {course.subject.grades && course.student_grades && (
                              <tr>
                                <th className='th-title' scope="col">Percentage:</th>
                                <td>
                                  {calcPercentage(course.subject.grades.oral, course.student_grades.oral)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.lab, course.student_grades.lab)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.midterm, course.student_grades.midterm)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.assignments, course.student_grades.assignments)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.quizzes, course.student_grades.quizzes)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.final, course.student_grades.final)}
                                </td>
                                <td>
                                  {calcPercentage(course.subject.grades.total, course.student_grades.total)}
                                </td>
                              </tr>
                            )}
                            </tbody>

                          </table>
                          {!course.subject.grades && (
                            <div className="alert alert-sm alert-custom">
                              This Subject "<Link className='alert-link' href={route('professors.subjects.chapters', course.subject.id)}><b>{course.subject.title}</b></Link>" doesn't has default grades please set it <b><Link href={route('professors.subjects.grades', course.subject.id)} className="alert-link"> from here</Link></b> to avoid any issues calculating grades of student
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="alert alert-custom alert-sm" style={{ marginTop: '5px' }}>
                        Subject "<b>{course.subject.title}</b>" grade is missing! Please <Link href={route('professors.students.semesters.grades.add', [student.id, semester.id])}>click here</Link> to add.
                      </div>
                    )}

                  </>
                ))}
              </>
            ) : (
              <div className='not-found alert-sm alert alert-primary'>There's no courses to add grades!</div>
            )}


          </div>

        </div>

        <div className="second-column">

          <StudentCard student={student} />

          <div className="default-section">
            <h5 style={{ fontSize: '15px' }} className='default-title'>{semester.year.title}</h5>
            <div className="list-items">
              <ul>
                <li><span>Semester Of Year</span> <span>{semester.year.title}</span></li>
                <li><span>Default Total Grades</span> <Text>{semester.default_grade} marks</Text></li>
                {semester.is_done ? (
                  <>
                    <li><span>Student Grades</span> <Text type={ semester.default_grade / 2 >= 750 ? 'success' : 'danger' }>{semester.grade} marks - { 100 - ((semester.default_grade - semester.grade) / semester.default_grade) * 100 }%</Text></li>
                    <li><span>Completed</span> <Text type={ semester.is_done ? 'success' : 'danger' }>{semester.is_done ? 'Yes' : 'No'}</Text></li>
                  </>
                ) : <></>}
              </ul>
            </div>
          </div>

          <div className="default-section">
            <h5 style={{ fontSize: '15px' }} className='default-title'>Subjects</h5>
            <div className="list-items">
              <ul>
                {semester.year.courses.length > 0 && semester.year.courses.map(course => (
                  <li>
                    <span>
                      <Link>
                        {course.subject.title} -
                        <Text type='secondary'> {course.subject.code}</Text>
                      </Link>
                    </span>
                    <Text type='success'>
                      {course.subject.grades ?
                        <Tooltip title={'Subject default grades'}>
                          <p style={{ margin: 0 }}>{`${course.subject.grades.total} marks`}</p>
                        </Tooltip>
                        : <Link href={route('professors.subjects.grades', course.subject.id)}><FontAwesomeIcon icon={faEdit}/> Set Default Grades</Link> }
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link style={{ marginRight: '5px' }} href={route('professors.students.semesters.update', [student.id, semester.id])} className='btn btn-sm btn-primary'><FontAwesomeIcon icon={faEdit} /> Update Semester</Link>
          <Link href={route('professors.students.semesters.grades.update', [student.id, semester.id])} className='btn btn-sm btn-secondary'><FontAwesomeIcon icon={faPercentage} /> Update Semester Grades</Link>
        </div>

      </div>

    </ProfessorLayout>
  )
}

export default ViewSemester
