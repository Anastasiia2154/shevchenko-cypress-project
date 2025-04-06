import { GaragePage, FuelExpensesPage } from "../pages";

const garagePage = new GaragePage();
const fuelExpensesPage = new FuelExpensesPage();

describe("Cars tests", () => {
  beforeEach(() => {
    cy.visit("", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    cy.login(
      Cypress.env("defaultUserEmail"),
      Cypress.env("defaultUserPassword")
    );
  });

  it("Adding car test", () => {
    garagePage.shouldSeeMainGaragePage();
    garagePage.addCar({
      brand: "BMW",
      model: "5",
      mileage: "500",
    });
    garagePage.shouldSeeCreatedCar("BMW 5", "500");
  });

  it("Adding fuel expenses test", () => {
    garagePage.shouldSeeMainGaragePage();
    garagePage.addCar({
      brand: "Ford",
      model: "Focus",
      mileage: "500",
    });
    fuelExpensesPage.openAddExpensesPopUp();
    fuelExpensesPage.addExpenses({
      car: "Ford Focus",
      mileage: "600",
      liters: "200",
      cost: "1000",
    });
    fuelExpensesPage.shouldSeeFluelExpenses({
      mileage: "600",
      liters: "200L",
      cost: "1000 USD",
    });
  });
});
