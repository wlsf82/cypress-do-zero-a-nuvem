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
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail,com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () =>{ 
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail,com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('[for="phone-checkbox"]').click()
    cy.get('.button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('John')
        .should('have.value', 'John') 
        .clear()
        .should('have.value', '')
     cy.get('#lastName')
      .type('Doe Silva')
        .should('have.value', 'Doe Silva') 
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('johndoe@gmail.com')
          .should('have.value', 'johndoe@gmail.com') 
          .clear()
          .should('have.value', '')
      cy.get('#phone')
          .type('123456789')
            .should('have.value', '123456789') 
            .clear()
            .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button[type="submit"]').click()
  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('youtube')
    .should('have.value', 'youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
})

})

