import React from "react";
import classNames from "classnames/bind";
import "components/DayListItem.scss";

// DayListItem component that displays a day of the week and its available spots
export default function DayListItem(props) {
  // Determine the class names for the DayListItem based on props
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected, // Apply selected style if selected prop is true
    "day-list__item--full": props.spots === 0, // Apply full style if spots prop is 0
  });

  // Function to format the available spots text
  const formatSpots = (spots) => {
    let formattedSpots;

    if (spots === 0) {
      formattedSpots = "no spots remaining";
    }
    if (spots === 1) {
      formattedSpots = "1 spot remaining";
    }
    if (spots > 1) {
      formattedSpots = `${spots} spots remaining`;
    }

    return formattedSpots;
  };

  return (
    <li
      className={dayListClass} // Apply the calculated class names
      onClick={() => {
        props.setDay(props.name); // Trigger the setDay function on click
      }}
      data-testid="day"
    >
      {/* Display the day of the week */}
      <h2 className="text--regular">{props.name}</h2>
      {/* Display the formatted available spots text */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
