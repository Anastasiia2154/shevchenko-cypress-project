import { GaragePage, FuelExpensesPage } from "../pages";

const garagePage = new GaragePage();
const fuelExpensesPage = new FuelExpensesPage();

describe("Cars tests", () => {
  beforeEach(() => {
    cy.loginWithAuth(
      Cypress.env("defaultUserEmail"),
      Cypress.env("defaultUserPassword")
    );
  });

  it("Adding car test", () => {
    garagePage.shouldSeeMainGaragePage();
    cy.intercept("POST", "**/api/cars").as("createCar");

    garagePage.addCar({
      brand: "BMW",
      model: "5",
      mileage: "500",
    });
    garagePage.shouldSeeCreatedCar("BMW 5", "500");

    cy.wait("@createCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const createdCarId = interception.response.body.data.id;
      cy.writeFile("cypress/fixtures/carId.json", { id: createdCarId });
    });
  });

  it("Validate created car with API", () => {
    cy.readFile("cypress/fixtures/carId.json").then(({ id }) => {
      const token = Cypress.env("authToken");

      cy.request({
        method: "GET",
        url: "https://qauto.forstudy.space/api/cars",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const cars = response.body.data;
        const createdCar = cars.find((car) => car.id === id);

        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq("BMW");
        expect(createdCar.model).to.eq("5");
        expect(createdCar.mileage).to.eq(500);
      });
    });
  });

  it("Add fuel expense with API and validate response", () => {
    cy.readFile("cypress/fixtures/carId.json").then(({ id }) => {
      const token = Cypress.env("authToken");

      const expenseData = {
        carId: id,
        reportedAt: "2025-04-19",
        mileage: 501,
        liters: 600,
        totalCost: 600,
      };

      cy.createExpense(token, expenseData).then((response) => {
        expect(response.status).to.eq(200);

        const resBody = response.body.data;
        expect(resBody).to.have.property("id");
        expect(resBody.carId).to.eq(expenseData.carId);
        expect(resBody.reportedAt).to.eq(expenseData.reportedAt);
        expect(resBody.mileage).to.eq(expenseData.mileage);
        expect(resBody.liters).to.eq(expenseData.liters);
        expect(resBody.totalCost).to.eq(expenseData.totalCost);
      });
    });
  });

    it("Should see created car with expenses", () => {
      garagePage.shouldSeeMainGaragePage();
      garagePage.shouldSeeCreatedCar("BMW 5", "501");
      fuelExpensesPage.openAddFuelExpensesPage();
      fuelExpensesPage.shouldSeeFluelExpenses({
        mileage: "501",
        liters: "600L",
        cost: "600.00 USD",
      });
    });
  });

//   it("Adding fuel expenses test", () => {
//     garagePage.shouldSeeMainGaragePage();
//     garagePage.addCar({
//       brand: "Ford",
//       model: "Focus",
//       mileage: "500",
//     });
// fuelExpensesPage.openAddExpensesPopUp();
// fuelExpensesPage.addExpenses({
//   car: "Ford Focus",
//   mileage: "600",
//   liters: "200",
//   cost: "1000",
// });
//     fuelExpensesPage.shouldSeeFluelExpenses({
//       mileage: "600",
//       liters: "200L",
//       cost: "1000 USD",
//     });
// });