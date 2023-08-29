import React from "react";

// Empty component that displays an "Add" button when no appointment is scheduled
export default function Empty(props) {
  return (
    <main className="appointment__add">
      {/* "Add" button that triggers the onAdd function when clicked */}
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
