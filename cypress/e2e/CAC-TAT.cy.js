describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
  })
  it('verifica o título da aplicação', () => {    
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })  
  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get('#firstName').type("Mikael")
    cy.get('#lastName').type("Braga")
    
    cy.get('#email').type("mikael205@gmail.com")
    cy.get('#open-text-area').type("Testando meu testemhfdhjskhfkdf fdskfhdjshk fdsfdsdfsdf", {delay:10})
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type("Mikael")
    cy.get('#lastName').type("Braga")
    cy.get('#email').type("mikael205gmail.com")
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error').should('be.visible')
  })
  it('validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('#phone').type('telefone').should('have.value', '')
  })
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',() => {
    cy.get('#firstName').type("Mikael")
    cy.get('#lastName').type("Braga")
    cy.get('#email').type("mikael205gmail.com")
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type("Testando meu teste")
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type("Mikael")
      .should('have.value', 'Mikael')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
        .type("Braga")
        .should('have.value', 'Braga')
        .clear()
        .should('have.value', '')
    cy.get('#email')
        .type("mikael205gmail.com")
        .should('have.value', 'mikael205gmail.com')
        .clear()
        .should('have.value', '')
    cy.get('#phone')
        .type("11967676767")
        .should('have.value', '11967676767')
        .clear()
        .should('have.value', '')    
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('envia o formuário com sucesso seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })  
  it('envia o seleciona um produto (Blog) por seu índice com sucesso', () => {
    cy.get('#product')
      .select([1])
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .each((typeofService) => {
        cy.wrap(typeofService)
          .check()
          .should('be.checked')
    })     
  })
  it.only('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
})


