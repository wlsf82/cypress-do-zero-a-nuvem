Cypress.Commands.add('filMandatoryFieldsAndSubmit', (data = {
    firstName: 'Jhon',
    lastName: 'Vondering',
    email: 'jhon123@gmail.com',
    text: 'Text.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()

})
