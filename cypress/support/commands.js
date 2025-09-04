Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (dados = {
    firstName: 'Ivânia',
    lastName: 'Santana',
    email: 'ivania_santana@gmail.com',
    text: 'Olá, mundo!'
}) => {
    cy.get('[name="firstName"]').type(dados.firstName)
    cy.get('[name="lastName"]').type(dados.lastName)
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type(dados.email)
    cy.get('[name="open-text-area"]').type(dados.text)
    cy.contains('button', 'Enviar').click()
})