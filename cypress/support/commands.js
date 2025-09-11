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
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (dados={
    firstName: "dededdededdd",
    lastName: "lilillil",
    email: "ededn@teste.com",
    openTextArea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    radio: "elogio",
    checkbox: "phone",
    product: "Cursos"
}) => {
  cy.get("#email").type(dados.email)
  cy.get("#lastName").type(dados.lastName)
    cy.get("#firstName").type(dados.firstName)
    cy.get("#open-text-area").type(dados.openTextArea,{delay:0})
    cy.get(`input[type='radio'][value='${dados.radio}']`).check()
    cy.get(`input[type='checkbox'][value='${dados.checkbox}']`).check()
    cy.get("select#product").select(dados.product)
    
  cy.get("button[type=submit][class=button]").click()
})