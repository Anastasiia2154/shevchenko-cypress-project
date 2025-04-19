export default class GaragePage {
  selectors = {
    pageTitle: () => cy.contains("h1", "Garage"),
    addCarButton: () => cy.contains('button[class*="btn-primary"]', "Add car"),
    brandField: () => cy.get('[id="addCarBrand"]'),
    modelField: () => cy.get('[id="addCarModel"]'),
    mileageField: () => cy.get('[id="addCarMileage"]'),
    addButton: () => cy.get("app-add-car-modal").contains("button", "Add"),
    carRow: () => cy.get('li[class="car-item"]'),
    milesInput: () => cy.get('input[class*="update-mileage-form_input"]'),
    addExpenseButton: () => cy.contains('button', "Add fuel expense"),
  };

  shouldSeeMainGaragePage() {
    this.selectors.pageTitle().should("be.visible", { timeout: 5000 });
    this.selectors.addCarButton().should("be.visible");
  }
  

  addCar(caraData) {
    this.selectors.addCarButton().click();
    this.selectors.brandField().select(caraData.brand);
    this.selectors.modelField().select(caraData.model);
    this.selectors.mileageField().type(caraData.mileage);
    this.selectors.addButton().click();
  }

  shouldSeeCreatedCar(carName, miles) {
    this.selectors.carRow().contains("p", carName).should("be.visible");
    this.selectors.milesInput().should("have.value", miles);
  }

  clickAddExpenseButton(){
    this.selectors.addExpenseButton().click();
  }
}
