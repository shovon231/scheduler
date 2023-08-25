import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const baseURL = "http://localhost:8001";
    Promise.all([
      axios.get(`${baseURL}/api/days`),
      axios.get(`${baseURL}/api/appointments`),
      axios.get(`${baseURL}/api/interviewers`),
    ]).then((results) => {
      const days = results[0].data;
      const appointments = results[1].data;
      const interviewers = results[2].data;
      //console.log(interviewer);
      //setState((prev) => ({ ...prev, days }));
      setState({
        ...state,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // setState({
    //   ...state,
    //   appointments,
    // });
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // const appointments = {
      //   ...state.appointments,
      //   [id]: appointment,
      // };
      //      const days = writeSpotsToDays(appointments, id);
      // setState((prev) => {
      //   let newState = { ...prev };
      //   newState.appointments = appointments;
      //   // newState.days = days;
      //   return newState;
      // });
      setState({
        ...state,
        appointments,
      });
    });
  }
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    (appointment) => {
      //console.log("appoinment", appointment);
      const interview = getInterview(state, appointment.interview);

      //console.log("appoinment.interview", appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
        />
      );
    }
  );
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.days} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
