Cypress.Commands.add('fillMandatoryFieldsAndSubmit0', () => {
    cy.get('#firstName').type('Ronald')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('ronald.rodrigues@example.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('.button').click()

})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', (data = {
    primeiroNome: 'Jonh',
    lastName: 'Doe',
    email: 'jonhdoe@exemplo.com',
    textArea: 'Teste.',
}) => {
    cy.get('#firstName').type(data.primeiroNome)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.textArea)
    cy.get('.button').click()

})