import React from "react";
import classNames from "classnames";

import "components/Button.scss";

// Button component that renders a button with customizable styles
export default function Button(props) {
  // Determine the class names for the button based on props
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm, // Apply confirm style if confirm prop is truthy
    "button--danger": props.danger, // Apply danger style if danger prop is truthy
  });

  return (
    <button
      onClick={props.onClick} // Attach the provided onClick function
      disabled={props.disabled} // Set the disabled attribute based on props
      className={buttonClass} // Apply the calculated class names
    >
      {props.children}
    </button>
  );
}
