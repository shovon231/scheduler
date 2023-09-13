import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

// After each test, cleanup to ensure a clean state for the next test
afterEach(cleanup);

// Describe block for testing the Application component
describe("Application", () => {
  // Test case: Check if the schedule defaults to Monday and changes when a new day is selected
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Render the Application component
    const { getByText } = render(<Application />);

    // Wait for the "Monday" text to appear on the screen
    await waitForElement(() => getByText("Monday"));

    // Simulate a click on the "Tuesday" button
    fireEvent.click(getByText("Tuesday"));

    // Check if the text "Leopold Silvers" is in the document (should be in the schedule)
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application component
    const { container } = render(<Application />);

    // Wait for the data to load and for "Archie Cohen" to appear on the screen
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointment elements
    const appointments = getAllByTestId(container, "appointment");

    // Get the first appointment
    const appointment = appointments[0];

    // Simulate clicking the "Add" button in the appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Change the student name in the appointment
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // Select an interviewer (in this case, "Sylvia Palmer")
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Simulate clicking the "Save" button
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });
});
