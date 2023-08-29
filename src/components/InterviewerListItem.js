import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// InterviewerListItem component that displays an interviewer item
export default function InterviewerListItem(props) {
  // Determine the class names for the InterviewerListItem based on props
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected, // Apply selected style if selected prop is true
  });

  return (
    <li
      className={interviewerClass} // Apply the calculated class names
      onClick={props.setInterviewer} // Trigger the setInterviewer function on click
    >
      {/* Display the interviewer's avatar */}
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {/* Display the interviewer's name if selected */}
      {props.selected && props.name}
    </li>
  );
}
