import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to manage application data and state
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Function to set the currently selected day
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const baseURL = "http://localhost:8001";

    // Fetch data from multiple API endpoints in parallel using Promise.all
    Promise.all([
      axios.get(`${baseURL}/api/days`),
      axios.get(`${baseURL}/api/appointments`),
      axios.get(`${baseURL}/api/interviewers`),
    ]).then((results) => {
      const days = results[0].data;
      const appointments = results[1].data;
      const interviewers = results[2].data;

      // Update state with fetched data
      setState({
        ...state,
        days,
        appointments,
        interviewers,
      });
    });

    // eslint-disable-next-line
  }, []);

  // Function to book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Update database and state with the booked interview
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const days = updateSpots(appointments, id);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Function to cancel an interview
  function cancelInterview(id) {
    const appointments = {
      ...state.appointments,
    };

    // Update database and state with the canceled interview
    return axios.delete(`/api/appointments/${id}`).then(() => {
      appointments[id].interview = null;
      const days = updateSpots(appointments, id);
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  // Function to update available spots for a day
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
    days[dayIndex].spots = freeSpots;

    return days;
  }

  // Return the state and relevant functions
  return { state, setDay, bookInterview, cancelInterview };
}
