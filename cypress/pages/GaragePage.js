export default class GaragePage {
  selectors = {
    pageTitle: () => cy.contains("h1", "Garage"),
    addCarButton: () => cy.contains('button[class*="btn-primary"]', "Add car"),
  };

  shouldSeeMainGaragePage() {
    this.selectors.pageTitle().should("be.visible", { timeout: 5000 });
    this.selectors.addCarButton().should("be.visible");
  }
}