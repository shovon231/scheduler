import React from "react";
import classNames from "classnames/bind";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayListClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
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
      className={dayListClass}
      onClick={() => {
        props.setDay(props.name);
      }}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
