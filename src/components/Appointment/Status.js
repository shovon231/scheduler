import React from "react";

// Status component that displays a loading indicator and a status message
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      {/* Display the loading indicator image */}
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      {/* Display the status message */}
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}
