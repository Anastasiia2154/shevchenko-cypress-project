// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add("login", {}, (email, password) => {
  cy.contains("button", "Sign In").click();
  cy.get('form input[name="email"]').type(email);
  cy.get('form input[name="password"]').type(password, { sensitive: true });
  cy.contains("button", "Login").click();
});

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});

Cypress.Commands.add("loginWithAuth", (email, password) => {
  const baseUrl = Cypress.config("baseUrl");
  cy.request("POST", `${baseUrl}/api/auth/signin`, {
    email,
    password,
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.data.token;

    Cypress.env("authToken", token);

    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
      onBeforeLoad(win) {
        win.localStorage.setItem("token", token);
      },
    });
  });
});

Cypress.Commands.add("createExpense", (token, expenseData) => {
  const baseUrl = Cypress.config("baseUrl");
  return cy.request({
    method: "POST",
    url: `${baseUrl}/api/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: expenseData,
  });
});

//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
