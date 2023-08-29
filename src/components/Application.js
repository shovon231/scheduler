import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // Custom hook useApplicationData provides state management functions
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  // Get the interviewers for the current day
  const interviewers = getInterviewersForDay(state, state.day);

  // Generate Appointment components for each appointment in the day
  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      {/* Sidebar section */}
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Display the list of days */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      {/* Schedule section */}
      <section className="schedule">
        {/* Display appointment components */}
        {appointments}

        {/* Placeholder for the last slot */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
