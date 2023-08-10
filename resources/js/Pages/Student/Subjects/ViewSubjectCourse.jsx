import {Head, Link, usePage} from "@inertiajs/inertia-react";

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

import { faDownload, faFilePdf, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mui/material";

const ViewSubjectCourse = () => {

  const { appURL, user, subject } = usePage().props

  return (
    <StudentLayout user={user}>

      <Head title={`${subject.title} Course`} />

      <PageHeader
        pageTitle={<span>Course of Subject: <Link href={route('students.subjects.view', subject.id)}><b>{subject.title} ({subject.code})</b></Link></span>}
        pageIcon={faPlay}
      />

      {subject.course ? (

        <div className="view-subject-course">

          {subject.course.lectures.length > 0 ? (

            <div className="content">

              <Tab.Container id="chapters-tabs" defaultActiveKey={`${subject.course.lectures.length > 0 ? `lecture-tab-${subject.course.lectures[0].id}` : 'tab' }`}>

                <Row>

                  <Col sm={4}>
                    <Nav variant="pills" className="flex-column lectures-list">
                      <h6>Course Lectures - <span>{subject.course.lectures.length} lecture(s)</span></h6>
                      {subject.course.lectures.map((lecture, idx) => (
                        <Nav.Item key={idx}>
                          <Nav.Link eventKey={`lecture-tab-${lecture.id}`}><span><FontAwesomeIcon icon={faPlay} /> <b>{lecture.title}</b></span> <span>{formatDate(lecture.created_at)}</span></Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Col>

                  <Col sm={8}>
                    <Tab.Content>
                      {subject.course.lectures.map((lecture, idx) => (
                        <Tab.Pane eventKey={`lecture-tab-${lecture.id}`} key={idx}>
                          <div className="lecture-content-tab">
                            <div className="lecture-video">
                              <video controls>
                                <source src={appURL + lecture.video} type="video/mp4" />
                              </video>
                            </div>
                            <div className="lecture-header">
                              <h5>{lecture.title} </h5>
                              <div className="links">
                                <Tooltip followCursor title='Attached File to this Lecture'><a download={'file.pdf'} href={appURL + lecture.file} className='btn btn-sm btn-dark'><FontAwesomeIcon icon={faFilePdf} /></a></Tooltip>
                                <Tooltip followCursor title='YouTube'><a className='btn btn-sm btn-danger'><FontAwesomeIcon icon={faPlay} /></a></Tooltip>
                                <Tooltip followCursor title='Download'><a href={appURL + lecture.video} download className='btn btn-sm btn-success'><FontAwesomeIcon icon={faDownload} /></a></Tooltip>
                              </div>
                            </div>
                            <div className="lecture-description">
                              <p>{lecture.information}</p>
                            </div>
                          </div>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </Col>

                </Row>

              </Tab.Container>

            </div>

          ) : (
            <div className="alert alert-sm alert-primary">No lectures has been added yet!</div>
          )}

          <div className="header" style={{ marginTop: 10 }}>
            <h6><i>Course Title: <b>{subject.course.title}</b></i> <span>Added: <b>{formatDate(subject.course.created_at)}</b></span></h6>
            <p>{subject.course.info}</p>
          </div>

        </div>

      ) : (

        <div className="alert alert-sm alert-primary">No course found for this subject <b>{subject.title}</b></div>

      )}

    </StudentLayout>
  )
}

export default ViewSubjectCourse
