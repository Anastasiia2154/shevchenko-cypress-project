import GaragePage from "../pages/GaragePage";

const garagePage = new GaragePage();

describe("Log in tests", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("Should successfully log in", () => {
    cy.login("bradjonas2121@gmail.com", "testPass1");
    garagePage.shouldSeeMainGaragePage();
  });
});
