import { usePage, Link, useForm } from "@inertiajs/inertia-react";

import ProfessorLayout from "@/Layouts/Professor/ProfessorLayout";
import List from "@/components/List/List";

import { SubjectsColumns } from "@/columns/subjects";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBuilding, faPlus } from "@fortawesome/free-solid-svg-icons";

import { eventsTypes } from "@/helpers/constants";
import { FormContainer, InputField, SelectBox, TextArea } from "@/components/Form/FormContainer";
import ProfessorLayoutHeader from "@/components/ProfessorLayoutHeader/ProfessorLayoutHeader";

const Subjects = () => {

  const { year, days, event } = usePage().props

  const { data, setData, post, errors } = useForm({
    title: event.text,
    event: event.event,
    start: event.start,
    end: event.end,
    day: event.day
  })

  const handleUpdate = () => {
    post(route('professors.timetable.update', [year.id, event.id]))
  }

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title={`Update timetable event for semester: ${year.title} - ${year.term_name}`} icon={faPlus} />

      <div className="add-new-event">

        <FormContainer>

          <InputField
            label='Title'
            value={data.title}
            handleChange={ e => setData('title', e.target.value) }
            error={errors.title}
          />

          <SelectBox
            label='Day'
            selectedOptionValue={ event.day }
            handleChange={ e => setData('day', e.target.value) }
            items={ days.map(day => {
              return { value: day.id, text: day.day }
            }) }
            error={errors.day}
          />

          <SelectBox
            label='Event type'
            selectedOptionValue={ event.event }
            handleChange={ e => setData('event', e.target.value) }
            items={eventsTypes}
            error={errors.day}
          />

          <InputField
            type='time'
            handleChange={ e => setData('start', e.target.value) }
            label='Starts'
            error={errors.start}
            value={data.start}
          />

          <InputField
            type='time'
            handleChange={ e => setData('end', e.target.value) }
            label='Ends'
            error={errors.end}
            value={data.end}
          />

          <button onClick={handleUpdate} className='btn btn-dark'>Update Event</button>

        </FormContainer>

      </div>

    </ProfessorLayout>

  )
}

export default Subjects
