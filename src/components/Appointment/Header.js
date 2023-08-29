import React from "react";

// Header component that displays the appointment time and a separator line
export default function Header(props) {
  return (
    <header className="appointment__time">
      {/* Display the appointment time */}
      <h4 className="text--semi-bold">{props.time}</h4>
      {/* Separator line */}
      <hr className="appointment__separator" />
    </header>
  );
}
