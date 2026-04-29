// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
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
Cypress.Commands.add('preenche', (nome, sobrenome, email, ajuda) => {
  cy.get('#firstName').as('nome');
  cy.get('#lastName').as('sobrenome');
  cy.get('#email').as('email');
  cy.get('#open-text-area').as('comoAjudar');
  cy.get('#phone').as('telefone');
  cy.get('@nome').should('be.visible').type(nome);
  cy.get('@sobrenome').should('be.visible').type(sobrenome);
  cy.get('@email').should('be.visible').type(email);
  cy.get('@comoAjudar').should('be.visible').type(ajuda);
});
