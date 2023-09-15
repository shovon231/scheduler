// Describe block for Appointments
describe("Appointments", () => {
  // Before each test case, reset the database, visit the main page, and ensure "Monday" is visible
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"); // Reset the database
    cy.visit("/"); // Visit the main page
    cy.contains("Monday"); // Ensure "Monday" is visible
  });

  // Test case: should book an interview
  it("should book an interview", () => {
    // Click the "Add" button for the first appointment slot
    cy.get("[alt=Add]").first().click();

    // Type the student's name into the input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Select the interviewer (in this case, "Sylvia Palmer")
    cy.get("[alt='Sylvia Palmer']").click();

    // Click the "Save" button to book the interview
    cy.contains("Save").click();

    // Verify that the appointment card displays the student's name ("Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    // Verify that the appointment card displays the interviewer's name ("Sylvia Palmer")
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
