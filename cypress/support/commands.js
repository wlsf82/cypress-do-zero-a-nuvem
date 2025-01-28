Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe Silva')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#phone').type('123456789')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('.button[type="submit"]').click()
})