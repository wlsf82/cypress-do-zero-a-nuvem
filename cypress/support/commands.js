Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName:'Donizete',
    lastName:'Silva',
    email: 'blabla@hotmail.com',
    text:'Teste...'

}) => {                                                     //colocando a arrow function aqui se tiver o data na arquivo teste pega daqui pra baixo, se nao tiver pega a parte de cima
    
    
    
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)                                           
    cy.contains('button', 'Enviar').click()
})
