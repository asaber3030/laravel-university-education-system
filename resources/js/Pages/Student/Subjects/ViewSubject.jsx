import { Link, usePage, Head } from "@inertiajs/inertia-react";

import '@/assets/css/students/global-students.scss'
import './subjects.scss'

import React from "react";

import StudentLayout from "@/Pages/Student/Layout/Layout";
import PageHeader from "@/components/PageHeader/PageHeader";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import formatDate from "@/helpers/functions/format-date";
import displayGrades from "@/helpers/functions/displayGrade";

import {faBook, faClock, faDownload, faFilePdf, faPlay} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubjectLinks = ({ id }) => {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      <Link className='btn btn-sm btn-dark' href={route('students.assignments.view.subject', id)}>Assignments</Link>
      <Link className='btn btn-sm btn-dark' href={route('students.quizzes.view.subject', id)}>Quizzes</Link>
      <Link className='btn btn-sm btn-dark' href={route('students.subjects.view.summaries', id)}>Summaries</Link>
      <Link className='btn btn-sm btn-dark' href={route('students.subjects.view.course', id)}>Course</Link>
    </div>
  )
}

const ViewSubject = () => {

  const { appURL, user, subject } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title={`${subject.title} - ${subject.code}`} />

      <PageHeader
        pageTitle={<span>Subject: <b>{subject.title} ({subject.code})</b></span>}
        pageIcon={faBook}
        pageRightComponent={<SubjectLinks id={subject.id} />}
      />

      <div className="view-subject-container">

        {subject.chapters.length > 0 ? (
          <Tab.Container id="chapters-tabs" defaultActiveKey={`${subject.chapters.length > 0 ? `chapter-tab-${subject.chapters[0].id}` : 'tab' }`}>

            <Row>

              <Col sm={3}>
                <span className='section-title' style={{ display: 'block', margin: '0 0 5px', color: '#0054c1', fontWeight: 700 }}><FontAwesomeIcon icon={faBook} /> Chapters</span>
                <Nav variant="pills" className="flex-column">
                  {subject.chapters.map((chapter, idx) => (
                    <Nav.Item key={idx}>
                      <Nav.Link eventKey={`chapter-tab-${chapter.id}`}>Ch.{chapter.number} - <b>{chapter.name}</b></Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>

              <Col sm={9}>
                <Tab.Content>
                  {subject.chapters.map((chapter, idx) => (
                    <Tab.Pane eventKey={`chapter-tab-${chapter.id}`} key={idx}>
                      <div className="default-tab-content">
                        <div className="chapter-header">
                          <h5>{chapter.name} <span>Ch.{chapter.number}</span></h5>
                        </div>
                        <div className="chapter-content">
                          <p>{chapter.info}</p>
                        </div>
                        <div className="chapter-footer list-items">
                          <ul>
                            <li><span>Subject name</span> <span>{subject.title}</span></li>
                            <li><span>Subject Code</span> <span>{subject.code}</span></li>
                            <li><span>Chapter Number</span> <span>{chapter.number}</span></li>
                            <li><span>Created at</span> <span>{ formatDate(chapter.created_at) }</span></li>
                            <li><span>Updated at</span> <span>{ formatDate(chapter.updated_at) }</span></li>
                          </ul>
                          <div className="actions">
                            <Link href={route('students.subjects.view.course', subject.id)} className='btn btn-secondary btn-sm'><FontAwesomeIcon icon={faPlay} /> View Course</Link>
                            <a download href={appURL + chapter.file} className='btn btn-dark btn-sm'><FontAwesomeIcon icon={faDownload} /> Download PDF</a>
                          </div>
                        </div>
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>

            </Row>

          </Tab.Container>
        ) : (
          <div className="alert alert-sm alert-info">No data has been added yet!</div>
        )}

        <div className="display-subject-details">
          <div className="details-header">
            <div>
              <img src={appURL + subject.icon} alt=""/>
              <span>{subject.title} <b>({subject.code})</b></span>
            </div>
            <h6><span><FontAwesomeIcon icon={faClock} /> {formatDate(subject.created_at)}</span></h6>
          </div>
          <p>{subject.information}</p>
          {subject.reference && (
            <div className="actions" style={{ margin: '15px 15px 0' }}>
              <a href={appURL + subject.reference} download className='btn btn-sm btn-success'><FontAwesomeIcon icon={faDownload} /> Download Reference</a>
            </div>
          )}
        </div>

        {subject.grades && (
          <div className="default-subject-grades">
            <h6>Subject grades in public!</h6>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Subject Code</th>
                  <th scope="col">Final</th>
                  <th scope="col">Midterm</th>
                  <th scope="col">Lab</th>
                  <th scope="col">Oral</th>
                  <th scope="col">Smart</th>
                  <th scope="col">Quizzes</th>
                  <th scope="col">Assignments</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{subject.code}</th>
                  <td>{displayGrades(subject.grades.final)}</td>
                  <td>{displayGrades(subject.grades.midterm)}</td>
                  <td>{displayGrades(subject.grades.lab)}</td>
                  <td>{displayGrades(subject.grades.oral)}</td>
                  <td>{displayGrades(subject.grades.smart)}</td>
                  <td>{displayGrades(subject.grades.quizzes)}</td>
                  <td>{displayGrades(subject.grades.assignments)}</td>
                  <td className='text-success fw-bold'>{displayGrades(subject.grades.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>

    </StudentLayout>
  )
}

export default ViewSubject
