Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Walmyr')
  cy.get('#lastName').type('Lima e Silva Filho')
  cy.get('#email').type('walmyr@talkingabouttesting.com')
  cy.get('#open-text-area').type('Teste.')
  cy.get('button[type="submit"]').click()
})
