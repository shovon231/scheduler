import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
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
      setState({
        ...state,
        days,
        appointments,
        interviewers,
      });
    });

    // eslint-disable-next-line
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
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(appointments, id);
      //console.log("book interview days", days);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
  function cancelInterview(id) {
    const appointments = {
      ...state.appointments,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      appointments[id].interview = null;
      const days = updateSpots(appointments, id);
      //console.log("delete", days);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
  function updateSpots(appointments, id) {
    const days = [...state.days];
    let slots;
    let freeSpots = 0;
    let dayIndex;

    for (let i = 0; i < days.length; i++) {
      if (days[i].appointments.includes(id)) {
        slots = [...days[i].appointments];
        dayIndex = i;
        break;
      }
    }
    for (const slot of slots) {
      if (appointments[slot].interview === null) {
        freeSpots++;
      }
    }

    // set free slots in day
    days[dayIndex].spots = freeSpots;

    return days;
  }

  return { state, setDay, bookInterview, cancelInterview };
}
