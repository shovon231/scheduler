import PropTypes from "prop-types";
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

// InterviewerList component that displays a list of InterviewerListItem components
export default function InterviewerList(props) {
  // Map through the provided interviewers data to create InterviewerListItem components
  let interviewersProps = props.interviewers;
  const interviewers = interviewersProps.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id} // Use the interviewer's id as the key
        name={interviewer.name} // Pass the interviewer's name to the InterviewerListItem
        avatar={interviewer.avatar} // Pass the interviewer's avatar to the InterviewerListItem
        selected={interviewer.id === props.value} // Determine if the interviewer is selected
        setInterviewer={() => {
          props.onChange(interviewer.id); // Pass the setInterviewer function to InterviewerListItem
        }}
      />
    );
  });

  return (
    <section className="interviewers">
      {/* Display the InterviewerList header */}
      <h4 className="interviewers__header text--light">Interviewer</h4>
      {/* Display the list of InterviewerListItem components */}
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
