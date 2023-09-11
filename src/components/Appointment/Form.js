import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // State variables for student name, error message, and selected interviewer
  const [student, setStudent] = useState(props.student || "");
  const [error, setError] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // Function to validate form input and trigger onSave if valid
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError(""); // Clear any previous error messages
    props.onSave(student, interviewer); // Call onSave with valid input
  }
  // Reset the form inputs
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };
  // Cancel button handler
  const cancel = () => {
    reset();
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => {
              setStudent(e.target.value); // Update student state on input change
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer} // Update interviewer state on selection change
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Cancel button */}
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/* Save button */}
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
