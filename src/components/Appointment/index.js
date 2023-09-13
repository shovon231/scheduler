import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  // Define different modes for the appointment component
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Use the custom hook useVisualMode to manage component modes
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function to save an interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  // Function to delete an interview
  function onDelete() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      {/* Display the appointment header */}
      <Header time={props.time} />

      {/* Render different components based on the current mode */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => {
            transition(EDIT);
          }}
          onDelete={() => {
            transition(CONFIRM);
          }}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Could not save appointment"} onClose={back} />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={() => {
            back();
          }}
          onConfirm={onDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Could not cancel appointment"} onClose={back} />
      )}
    </article>
  );
}
