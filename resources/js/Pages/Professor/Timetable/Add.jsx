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

const AddEvent = () => {

  const { year, days, selectedDay } = usePage().props
  const { data, setData, post, errors } = useForm({
    title: '',
    event: '',
    start: '',
    end: '',
    day: selectedDay.id
  })

  const handleAdd = () => {
    post(route('professors.timetable.add', [year.id, data.day]))
  }

  return (

    <ProfessorLayout>

      <ProfessorLayoutHeader title={`Add timetable event for semester: ${year.title} - ${year.term_name}`} icon={faPlus} />

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
            handleChange={ e => setData('day', e.target.value) }
            items={ days.map(day => {
              return { value: day.id, text: day.day }
            })}
            selectedOptionValue={selectedDay.id}
            error={errors.day}
          />

          <SelectBox
            label='Event type'
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

          <button onClick={handleAdd} className='btn btn-dark'>Add Event</button>

        </FormContainer>

      </div>

    </ProfessorLayout>

  )
}

export default AddEvent
