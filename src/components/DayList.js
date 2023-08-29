import React from "react";
import DayListItem from "./DayListItem";

// DayList component that renders a list of DayListItem components
export default function DayList(props) {
  // Map through the provided days data to create DayListItem components
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id} // Use the day's id as the key
        name={day.name} // Pass the day's name to the DayListItem
        spots={day.spots} // Pass the day's spots to the DayListItem
        selected={day.name === props.value} // Determine if the day is selected
        setDay={props.onChange} // Pass the setDay function to DayListItem
      />
    );
  });

  return <ul>{days}</ul>; // Render the list of DayListItem components
}
