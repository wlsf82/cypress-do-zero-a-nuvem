describe('Central de Atendimento ao Cliente TAT', () => {
  it('Verifica o título da aplicação', () => {
    cy.visit("./src/index.html")

    cy.title().should("be.equal","Central de Atendimento ao Cliente TAT")
  })
})