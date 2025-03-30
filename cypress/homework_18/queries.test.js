describe("Cypress queries homework tests", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });
  });

  it("Header elements checking test", () => {
    cy.get('button[class*="hero-descriptor_btn"]').should("have.text","Sign up");
    cy.get('div[class*="header_right"] button').as("rightButtons");
    cy.get("@rightButtons").eq(0).should("have.text", "Guest log in");
    cy.get("@rightButtons").eq(1).should("have.text", "Sign In");
    cy.get('a[class*="header-link"]')
      .should("have.attr", "routerlinkactive", "-active")
      .should("have.text", "Home");
    cy.get('nav[class*="header_nav"] button').as("leftButtons");
    cy.get("@leftButtons").first().should("have.text", "About");
    cy.get("@leftButtons").last().should("have.text", "Contacts");
  });

  it("Footer elements checking test", () => {
    const texts = [
      "facebook",
      "ithillel_kyiv",
      "youtube",
      "instagram",
      "linkedin",
    ];

    cy.get("div.contacts_socials.socials a")
      .should("have.length", texts.length)
      .each(($el, index) => {
        cy.get($el).should("have.attr", "href").and("include", texts[index]);
      });

    cy.contains("a", "ithillel.ua").should("be.visible");
    cy.contains("a", "@ithillel.ua")
      .should("have.attr", "href")
      .and("include", "@ithillel.ua");
  });
});