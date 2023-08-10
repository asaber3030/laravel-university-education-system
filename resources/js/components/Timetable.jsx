import React from 'react';

import NotFoundAlert from "@/components/NotFoundAlert";
import formatDate from "@/helpers/functions/format-date";
import formatTime from "@/helpers/functions/format-time";

import { fullDateOptions, timeOptions } from "@/helpers/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const TimetableDay =  ({ day }) => {
  return (
    <div className="day" key={Math.random()}>
      <div className="day-text">
        {day.day} <span>({day.abbr})</span>
      </div>

      <div className="icon">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

      {day.timetable.length > 0 ? (
        <div className="day-events">
          {day.timetable.map(t => (
            <div className="event" key={t.id}>
              <div>
                <h6 className='event-title'>{t.text}</h6>
                <span className='event-details'>{t.event}</span>
                <div className="clock">
                  <span className="clock-span">
                    {formatTime(t.start)}
                    <br />
                    <i>Start</i>
                  </span>
                  <span className="clock-span">
                    {formatTime(t.end)}
                    <br />
                    <i>End</i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFoundAlert text={<span>No Events for this day <b>"{day.day}"</b></span>} />
      )}
    </div>
  )
}

export default TimetableDay;
