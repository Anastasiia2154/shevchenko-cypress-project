export default class RegistrationPopUpPage {
  get signUpButton() {
    return cy.contains("button", "Sign up");
  }

  get popUpTitle() {
    return cy.contains("h4", "Registration");
  }

  get nameField() {
    return cy.get('[id="signupName"]');
  }

  get lastNameField() {
    return cy.get('[id="signupLastName"]');
  }

  get emailField() {
    return cy.get('[id="signupEmail"]');
  }

  get passwordField() {
    return cy.get('[id="signupPassword"]');
  }

  get repeatPasswordField() {
    return cy.get('[id="signupRepeatPassword"]');
  }

  get registerButton() {
    return cy.contains("button", "Register");
  }

  get errorMessage() {
    return cy.get('[class="invalid-feedback"],[class*="alert"]');
  }

  shouldSeeTitle() {
    this.signUpButton.click();
    this.popUpTitle.should("be.visible");
  }

  enterName(name) {
    this.nameField.type(name);
  }

  enterLastName(lastName) {
    this.lastNameField.type(lastName);
  }

  enterEmail(email) {
    this.emailField.type(email);
  }

  enterPassword(password) {
    this.passwordField.type(password);
  }

  enterReEnterPassword(reEnterPassword) {
    this.repeatPasswordField.type(reEnterPassword);
  }

  clickRegisterButton() {
    this.registerButton.click({ force: true });
  }

  shouldSeeError(message) {
    this.errorMessage.should("be.visible").should("include.text", message);
  }

  shouldHaveBorderColorRed(field) {
    field.should("have.css", "border-color", "rgb(220, 53, 69)");
  }

  registerButtonIsDisabled(isDisabled) {
    if (isDisabled) {
      this.registerButton.should("be.disabled");
    } else {
      this.registerButton.should("not.be.disabled");
    }
  }

  fillRegistrationForm({ name, lastName, email, password, repeatPassword }) {
    if (name) this.enterName(name);
    if (lastName) this.enterLastName(lastName);
    if (email) this.enterEmail(email);
    if (password) this.enterPassword(password);
    if (repeatPassword) this.enterReEnterPassword(repeatPassword);
  }
}
