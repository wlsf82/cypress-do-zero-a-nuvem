describe('Central de Atendimento ao Cliente TAT', () => {


  beforeEach(() => {
  cy.visit('./src/index.html')
})
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

 it('preenche os campos obrigatórios e envia o formulário Exercício extra 1', () => {
  const longText = Cypress._.repeat('abcdefjhijlmnopqrstuvwyz', 10)
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leão')
    cy.get('#email').type('phfleao@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 100 })
    cy.get('.button[type="submit"]').click()
    cy.get('.success').as('success')
    cy.get('.success').should('be.visible')
    cy.wait(1000)
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida Exercício extra 2', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leão')
    cy.get('#email').type('phfleaogmail.com')
    cy.get('#open-text-area').type('Algum elogio ou feedback para nós?', { delay: 100 })
    cy.get('.button').click()
    cy.get('.error').as('.error')
    cy.get('.error').should('be.visible')
    cy.wait(1000)
  })

  it('validar que, se um valor não-numérico for digitado, seu valor continuará Exercício extra 3', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leão')
    cy.get('#email').type('phfleao@gmail.com')
    cy.get('#phone').type('abcdfg').should('have.value', '')
    cy.get('#open-text-area').type('Algum elogio ou feedback para nós?', { delay: 100 })
    cy.get('.button').click()
    cy.get('.success').as('success')
    cy.get('.success').should('be.visible')
    cy.wait(1000)
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário Exercício extra 4', () => {
    cy.get('#firstName').type('Pedro')
    cy.get('#lastName').type('Leão')
    cy.get('#email').type('phfleao@gmail.com')
    cy.get('#phone-checkbox').click()
    // cy.get('#phone').type('1234')
    // cy.get('#phone').should('have.value', '1234')
    cy.get('#open-text-area').type('Algum elogio ou feedback para nós?', { delay: 100 })
    cy.get('.button').click()
    cy.get('.error').as('.error')
    cy.get('.error').should('be.visible')
    cy.wait(1000)
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone Exercício extra 5', () => {
    cy.get('#firstName').type('Pedro').should('have.value', 'Pedro').clear().should('have.value', '')
    cy.get('#lastName').type('Leão').should('have.value', 'Leão').clear().should('have.value', '')
    cy.get('#email').type('phfleao@gmail.com').should('have.value', 'phfleao@gmail.com').clear().should('have.value', '')
    cy.get('#phone-checkbox').click()
    // cy.get('#phone').type('1234').should('have.value', '1234').clear().should('have.value', '')
    // cy.get('#phone').should('have.value', '1234')
    cy.get('#open-text-area').type('Algum elogio ou feedback para nós?', { delay: 100 }).should('have.value', 'Algum elogio ou feedback para nós?').clear().should('have.value', '')
    cy.get('.button').click()
    cy.get('.error').as('.error')
    cy.get('.error').should('be.visible')
    cy.wait(1000)
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios Exercício extra 6', () => {
    cy.get('#firstName').type('Pedro').should('have.value', 'Pedro').clear().should('have.value', '')
    cy.get('#lastName').type('Leão').should('have.value', 'Leão').clear().should('have.value', '')
    cy.get('#email').type('phfleao@gmail.com').should('have.value', 'phfleao@gmail.com').clear().should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Algum elogio ou feedback para nós?', { delay: 100 }).should('have.value', 'Algum elogio ou feedback para nós?').clear().should('have.value', '')
    cy.get('.button').click()
    cy.get('.error').as('.error')
    cy.get('.error').should('be.visible')
    cy.wait(1000)
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios Exercício extra 8', () => {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })


  it('envia o formuário com sucesso usando um comando customizado', () =>{

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', () =>{
    const data = {
      firstName: 'Pedro',
      lastName: 'Leão',
      email: 'phfleao@gmail.com',
      text: 'teste'

    }

  
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')

  })

  it.only('envia o formuário com sucesso usando um comando customizado', () =>{
    const data = {
      firstName: 'Pedro',
      lastName: 'Leão',
      email: 'phfleao@gmail.com',
      text: 'teste'

    }

  
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')

  })
})

