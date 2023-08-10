import './subject-chapters.scss'

import { Head, Link, usePage } from "@inertiajs/inertia-react"

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons"

import formatDate from "@/helpers/functions/format-date";

const SubjectChapters = () => {

  const { subject } = usePage().props

  return (
    <ProfessorLayout>

      <Head title={`Subject ${subject.title} - Chapters`} />

      <div className="layout-header">
        <h5><FontAwesomeIcon icon={faFilePdf} /> Chapters - {subject.title}</h5>
        <div className="header-actions">
          <Link href={route('professors.subjects.create.chapter', subject.id)} className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faPlus} /> New Chapter</Link>
        </div>
      </div>

      <div className="subject-chapters">

        <div className="subject">

          {subject.chapters.length > 0 ? (
            <ul>
              {subject.chapters.map((chapter, idx) => (
                <li>
                  <div className="data" key={idx}>
                    <span className='chapter-name'>Chapter {chapter.number} - {chapter.name} <span style={{ float: 'right' }}>#{chapter.number}</span></span>
                    <p>{chapter.info}</p>
                  </div>
                  <div className="actions">
                    <Link href={route('professors.subjects.update.chapter', [subject.id, chapter.id])}>Edit</Link>
                    <Link href={route('professors.subjects.delete.chapter', [subject.id, chapter.id])}>Delete</Link>
                    {chapter.file && (
                      <Link>Download</Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="alert alert-sm alert-primary" style={{ marginTop: 0 }}>This subject doesn't have chapters. please add chapters <Link href={route('professors.subjects.create.chapter', subject.id)} className='alert-link'>from here</Link></div>
          )}

        </div>

        <div className="subject-information list-items">
          <h6>{subject.title}</h6>
          <ul>

            <li><span>Chapters</span> <span>{subject.chapters.length} chapters</span></li>
            <li><span>Department</span> <span><Link href={route('professors.deps.years', subject.department)}>{subject.department.title}</Link></span></li>
            <li><span>Code</span> <span>{subject.code}</span></li>
            <li><span>Created in</span> <span>{formatDate(subject.created_at)}</span></li>
            <li><span>Last update</span> <span>{formatDate(subject.updated_at)}</span></li>
          </ul>
        </div>

      </div>


    </ProfessorLayout>
  )
}

export default SubjectChapters
