import React from "react";

// Show component that displays appointment details and action buttons
export default function Show(props) {
  return (
    <main className="appointment__card appointment__card--show">
      {/* Left section: Display student name and interviewer details */}
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>

      {/* Right section: Display action buttons */}
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Edit button */}
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit} // Trigger onEdit function when clicked
          />

          {/* Delete button */}
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete} // Trigger onDelete function when clicked
          />
        </section>
      </section>
    </main>
  );
}
