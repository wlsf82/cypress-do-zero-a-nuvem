describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => { 
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('adcdfghijkabcabc' ,10)

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('.button').click()


    cy.get('.success').should('be.visible')
  })
})
