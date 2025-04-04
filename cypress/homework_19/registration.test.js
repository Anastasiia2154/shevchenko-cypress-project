import { RegistrationPopUpPage, GaragePage } from "../pages";

const registrationPopUpPage = new RegistrationPopUpPage();
const garagePage = new GaragePage();

describe("Registration form tests", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
    registrationPopUpPage.shouldSeeTitle();
  });

  it("Should successfully register a new user with valid data", () => {
    registrationPopUpPage.fillRegistrationForm({
      name: "John",
      lastName: "Smith",
      email: `test${Date.now()}@gmail.com`,
      password: "Valid1Password",
      repeatPassword: "Valid1Password",
    });
    registrationPopUpPage.registerButtonIsDisabled(false);
    registrationPopUpPage.clickRegisterButton();
    garagePage.shouldSeeMainGaragePage();
  });

  describe("Name Field", () => {
    it("Should see error when the Name field is empty", () => {
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Name is invalid");
    });

    it("Should see error when invalid Name data", () => {
      registrationPopUpPage.fillRegistrationForm({ name: "1" });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Name is invalid");
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.nameField
      );
    });

    it("Should see error when Name length less than 2 or more than 20 characters", () => {
      registrationPopUpPage.fillRegistrationForm({ name: "X" });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError(
        "Name has to be from 2 to 20 characters long"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.nameField
      );
      registrationPopUpPage.fillRegistrationForm({ name: "X".repeat(21) });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.shouldSeeError(
        "Name has to be from 2 to 20 characters long"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.nameField
      );
    });
  });

  describe("Last Name Field", () => {
    it("Should see error when the Last name field is empty", () => {
      registrationPopUpPage.fillRegistrationForm({ name: "John" });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Last Name is invalid");
    });

    it("Should see error when invalid Last name data", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "1",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Last name is invalid");
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.lastNameField
      );
    });

    it("Should see error when Last Name length less than 2 or more than 20 characters", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "y",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError(
        "Last name has to be from 2 to 20 characters long"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.lastNameField
      );
      registrationPopUpPage.fillRegistrationForm({
        lastName: "y".repeat(21),
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.shouldSeeError(
        "Last name has to be from 2 to 20 characters long"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.lastNameField
      );
    });
  });

  describe("Email Field", () => {
    it("Should see error when the Email field is empty", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Email is incorrect");
    });

    it("Should see error when invalid Email name data", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        email: "test",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Email is incorrect");
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.emailField
      );
    });
  });

  describe("Password Field", () => {
    it("Should see error when the Password field is empty", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        email: "test@gmail.com",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Password is incorrect");
    });

    it("Should see error when the Password  too short", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        password: "test@gmail.com",
        password: "pass",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.passwordField
      );
    });

    it("Should see error when Password without capital letter, small letter or number", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        password: "test@gmail.com",
        password: "password",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
      registrationPopUpPage.shouldHaveBorderColorRed(
        registrationPopUpPage.passwordField
      );
    });
  });

  describe("Re-enter Password Field", () => {
    it("Should see error when the Re-enter password field is empty", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        email: "test@gmail.com",
        password: "Test$999",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Passwords do not match");
    });

    it("Should see error when passwords do not match", () => {
      registrationPopUpPage.fillRegistrationForm({
        name: "John",
        lastName: "Smith",
        email: "test@gmail.com",
        password: "Valid1Password",
        repeatPassword: "InvalidPassword",
      });
      registrationPopUpPage.registerButtonIsDisabled(true);
      registrationPopUpPage.clickRegisterButton();
      registrationPopUpPage.shouldSeeError("Passwords do not match");
    });
  });
});
