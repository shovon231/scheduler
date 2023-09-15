// Describe block for the "Navigation" test suite
describe("Navigation", () => {
  // Test case to visit the root URL ("/")
  it("should visit root", () => {
    // Use Cypress to visit the root URL
    cy.visit("/");
  });

  // Test case to navigate to the "Tuesday" day
  it("should navigate to Tuesday", () => {
    // Use Cypress to visit the root URL ("/")
    cy.visit("/");

    // Use Cypress to locate an element with data-testid="day" containing "Tuesday",
    // click it, and then assert that it has the class "day-list__item--selected"
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
