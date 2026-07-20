describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {

    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', () => {

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulario', () => {
    const longText = Cypress._.repeat('teste, teste, teste, teste, teste, teste, teste, teste, teste.', 10)

    cy.get('#firstName').type('Ronald')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('ronaldrodrigues2n@hotmail.com')
    cy.get('#phone').type('11999999999')
    //  cy.get('#open-text-area').type('Gostaria de saber mais sobre o serviço.')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulario', () => {

    cy.get('#firstName').type('Ronald')
    cy.get('#lastName').type('Rodrigues')
    cy.get('#email').type('ronaldrodrigues2n@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.get('[for="email-checkbox"]').click()
    cy.get('.button').click()
    cy.get('.error > strong').should('be.visible')

  })


  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {

    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })


  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Ronald')
      .should('have.value', 'Ronald')
      .clear()
      .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

    cy.get('.button').click()
    cy.get('.error > strong').should('be.visible')
  })


  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit0()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    const data = {
      primeiroNome: 'Lara',
      lastName: 'Antonioli',
      email: 'laraantonioli@hotmail.com',
      phone: '11994444933',
      textArea: 'Lara linda'
    }

    cy.fillMandatoryFieldsAndSubmit1(data)

    cy.get('.success').should('be.visible')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
})






