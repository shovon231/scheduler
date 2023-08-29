// Function to get appointments for a specific day
export function getAppointmentsForDay(state, day) {
  const days = state.days;
  const appointments = state.appointments;
  const result = [];

  // Loop through days to find the matching day
  for (const wDay of days) {
    if (wDay.name === day) {
      // Loop through appointments for the day and add them to the result
      wDay.appointments.forEach((element) => {
        result.push(appointments[element]);
      });
    }
  }
  return result;
}

// Function to get interview data from state
export function getInterview(state, interview) {
  if (!interview) return null;

  // Return interview details with student and interviewer data
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

// Function to get interviewers available on a specific day
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  const dayObject = state.days.find((d) => d.name === day);

  // If the dayObject is found, extract interviewer ids
  dayObject &&
    dayObject.interviewers.forEach((interviewerId) =>
      interviewersArr.push(interviewerId)
    );

  // Map interviewer ids to actual interviewer data
  return interviewersArr.map((id) => state.interviewers[id]);
}
