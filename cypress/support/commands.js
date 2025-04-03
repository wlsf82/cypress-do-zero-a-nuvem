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
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'João',
    lastName: 'das Neves',
    email: 'joaoneves@teste.com',
    text: 'texto de exemplo default.'
}) => { 
    cy.get('#firstName').type(data.firstName) //pega um campo textfield chamado fistName e digita o que estiver o texto dento de type
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text, {delay: 0}) //adicionar delay 0 faz com que o texto escrito seja escrito imediatamente
    cy.contains('button', 'Enviar').click() //substitui linha abaixo
    //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica

 })
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