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

  // Test case: should edit an interview
  it("should edit an interview", () => {
    // Click the "Edit" button for the first appointment slot (using 'force' because it might not be initially visible)
    cy.get("[alt=Edit]").first().click({ force: true });

    // Clear the student's name and type a new name ("Lydia Miller-Jones")
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    // Select a different interviewer (in this case, "Tori Malcolm")
    cy.get("[alt='Tori Malcolm']").click();

    // Click the "Save" button to save the edited interview
    cy.contains("Save").click();

    // Verify that the appointment card displays the edited student's name ("Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    // Verify that the appointment card displays the new interviewer's name ("Tori Malcolm")
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // Test case: should cancel an interview
  it("should cancel an interview", () => {
    // Click the "Delete" button for the first appointment slot (using 'force' because it might not be initially visible)
    cy.get("[alt=Delete]").click({ force: true });

    // Click the "Confirm" button to confirm the deletion
    cy.contains("Confirm").click();

    // Check for the "Deleting" text to exist and then disappear
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    // Verify that the appointment card for "Archie Cohen" does not exist (indicating cancellation)
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
