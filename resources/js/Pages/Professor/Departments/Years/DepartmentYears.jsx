import './department-years.scss'

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import {
  faBook,
  faChalkboardTeacher,
  faGraduationCap,
  faPercentage,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Tooltip} from "@mui/material";
import {faEdit, faEye} from "@fortawesome/free-regular-svg-icons";
import formatDate from "@/helpers/functions/format-date";

const DepartmentYears = () => {

  const { department } = usePage().props

  return (
    <ProfessorLayout>
      <Head title={`Studying years of ${department.title}`} />
      <ProfessorLayoutHeader title={`Studying years of ${department.title}`} icon={faBook}>
        <Link className='btn btn-primary btn-sm' href={route('professors.deps.year.add', department.id)}><FontAwesomeIcon icon={faPlus} /> Add Year</Link>
      </ProfessorLayoutHeader>

      {department.years && department.years.length > 0 ? (
        <div className="studying-years">

          {department.years.map(year => (

            <div className="year-container" key={year.id}>

              <h6 className='year-title'><Link href={route('professors.deps.year.content', [department.id, year.id])}>{year.title} - {year.term_name}</Link> <span>{year.courses.length} courses - <span className="text-success">{year.grade} marks</span></span></h6>

              <div className="list-year-information">

                <div className="list-items">

                  <ul>
                    <li><span>Total Students</span> <span>{department.students_count} students</span></li>
                    <li><span>Courses</span> <span>{year.courses.length} course(s)</span></li>
                    <li><span>Start</span> <span>{formatDate(year.start)}</span></li>
                    <li><span>Finish</span> <span>{formatDate(year.end)}</span></li>
                  </ul>

                </div>

              </div>

              <div className="list-subjects">

                {year.courses.length > 0 ? (
                  <>
                    {year.courses.map(course => (
                      <Tooltip followCursor={true} title={`This subject has ${course.subject.chapters_count} chapter(s) and its total marks is ${course.subject.grades ? course.subject.grades.total : 0} mark(s) - click to update data`}>
                        <Link href={route('professors.subjects.chapters', course.subject.id)} className="subject">
                          {course.subject.title}
                        </Link>
                      </Tooltip>
                    ))}
                  </>
                ) : (
                  <div className="alert alert-warning alert-sm">No studying subjects for this semester! <Link href={route('professors.deps.year.content.add', [department.id, year.id])} className='alert-link'>Click here to assign</Link></div>
                )}

              </div>

              <div className="year-actions">
                <div>
                  <Link href={route('professors.deps.year.content', [department.id, year.id])} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faEye} /> View</Link>
                </div>
                <div>
                  <Link href={route('professors.deps.year.content.add', [department.id, year.id])} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faPlus} /> Add Course</Link>
                </div>
                <div>
                  <Link href={route('professors.deps.year.update', [department.id, year.id])} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faEdit} /> Update</Link>
                </div>
                <div>
                  <Link href={route('professors.deps.year.delete', [department.id, year.id])} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faTrash} /> Delete</Link>
                </div>
                <div>
                  <Link href={route('professors.deps.year.grades', [department.id, year.id])} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faPercentage} /> Grades</Link>
                </div>
              </div>

            </div>

          ))}
        </div>
      ) : (
        <div className="alert alert-primary alert-sm">No Studying years for this department <b>"{department.title}"</b>. <Link href={route('professors.deps.year.add', [department.id])}>Click here to add</Link></div>
      )}

    </ProfessorLayout>
  )
}

export default DepartmentYears
