Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Bryan',
    lastName:'Oconner',
    email:'bryanoconner@exemple.com',
    text:'Test.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('#phone').click()
    cy.contains('button', 'Enviar').click()
})