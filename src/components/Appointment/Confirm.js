import React from "react";
import Button from "components/Button";

// Confirm component that displays a confirmation message and buttons for canceling or confirming an action
export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      {/* Display the confirmation message */}
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        {/* Cancel button */}
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        {/* Confirm button */}
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
