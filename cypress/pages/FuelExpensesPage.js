import GaragePage from "./GaragePage";
export default class FuelExpensesPage {
  garagePage = new GaragePage();

  openAddExpensesPopUp() {
    this.garagePage.clickAddExpenseButton();
  }

  openAddFuelExpensesPage() {
    this.garagePage.openFuelExpensesTab();
  }

  selectors = {
    addExpenseField: () => cy.get('[id="addExpenseCar"]'),
    expenseDateField: () => cy.get('[id="addExpenseDate"]'),
    mileageField: () => cy.get('[id="addExpenseMileage"]'),
    litersField: () => cy.get('[id="addExpenseLiters"]'),
    totalCostField: () => cy.get('[id="addExpenseTotalCost"]'),
    addButton: () => cy.get("app-add-expense-modal").contains("button", "Add"),
    expensesRow: () => cy.get("tbody tr"),
  };

  addExpenses(expensesData) {
    this.selectors.addExpenseField().select(expensesData.car);
    this.selectors.expenseDateField().clear().type(this.getCurrentDate());
    this.selectors.mileageField().clear().type(expensesData.mileage);
    this.selectors.litersField().clear().type(expensesData.liters);
    this.selectors.totalCostField().clear().type(expensesData.cost);
    this.selectors.addButton().click();
  }

  getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

  shouldSeeFluelExpenses(expensesData) {
    this.selectors
      .expensesRow()
      .contains("td", this.getCurrentDate())
      .should("be.visible");
    this.selectors
      .expensesRow()
      .contains("td", expensesData.mileage)
      .should("be.visible");
    this.selectors
      .expensesRow()
      .contains("td", expensesData.liters)
      .should("be.visible");
    this.selectors
      .expensesRow()
      .contains("td", expensesData.cost)
      .should("be.visible");
  }
}
