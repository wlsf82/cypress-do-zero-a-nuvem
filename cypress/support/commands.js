Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data) => {
  cy.get("#firstName").should("be.visible").type(data.nome);
  cy.get("#lastName").should("be.visible").type(data.sobrenome);
  cy.get("#email").should("be.visible").type(data.email);
  cy.get("#open-text-area").should("be.visible").type(data.texto);
  cy.get(".button").should("be.visible").click();
});
