describe ('Central de Atendimento ao Cliente TAT', () =>{
  it('Verifica o título da aplicação', () =>{
    cy.visit('index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  })
})
