describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit("./src?index.html")
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT")
  })

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const longText = Cypress._.repeat("Helena papai te ama, ", 10)
    cy.get('#firstName').type("Tibério")
    cy.get('#lastName').type("Neto")
    cy.get('#email').type("athanetto@gmail.com")
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains("button", "Enviar").click()

    cy.get(".success").should("be.visible")
  })

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get('#firstName').type("Tibério")
    cy.get('#lastName').type("Neto")
    cy.get('#email').type("athanetto@gmail,com")
    cy.get('#open-text-area').type("teste")
    cy.contains("button", "Enviar").click()

    cy.get(".error").should("be.visible")
  })
  it("Campo telefone continua vazio quando preenchido com um valor não-numérico", () => {
    cy.get('#phone')
      .type("abcde")
      .should("have.value", "")
  })
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('#firstName').type("Tibério")
    cy.get('#lastName').type("Neto")
    cy.get('#email').type("athanetto@gmail.com")
    cy.get('#open-text-area').type("teste")
    cy.get('#phone-checkbox').click()
    cy.contains("button", "Enviar").click()

    cy.get(".error").should("be.visible")
  })
  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Tibério")
      .should("have.value", "Tibério")
      .clear()
      .should("have.value", "")
    cy.get("#lastName")
      .type("Neto")
      .should("have.value", "Neto")
      .clear()
      .should("have.value", "")
    cy.get("#email")
      .type("athanetto@gmail.com")
      .should("have.value", "athanetto@gmail.com")
      .clear()
      .should("have.value", "")
    cy.get("#phone")
      .type("83999999999")
      .should("have.value", "83999999999")
      .clear()
      .should("have.value", "")
  })
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('button[type="submit"]').click()
    cy.get(".error").should("be.visible")
  })
  it("envia o formuário com sucesso usando um comando customizado", () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get('#product')
      .select("YouTube")
      .should("have.value", "youtube")
  })
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get('#product')
      .select("mentoria")
      .should('have.value', 'mentoria')
  })
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

})