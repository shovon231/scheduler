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
  //console.log("interview", interview);
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}
