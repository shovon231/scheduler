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
