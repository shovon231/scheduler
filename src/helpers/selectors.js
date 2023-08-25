export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointments = state.appointments;
  const result = [];
  for (const wDay of days) {
    if (wDay.name === day) {
      wDay.appointments.forEach((element) => {
        result.push(appointments[element]);
      });
    }
  }
  return result;
}
export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];

  state.days.map((dayObject) => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach((interviewerId) =>
        interviewersArr.push(interviewerId)
      );
    }
  });
  return interviewersArr.map((id) => state.interviewers[id]);
}
