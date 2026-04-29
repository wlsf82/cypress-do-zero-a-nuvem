it('testa a página da política de privacidade de forma independente', () => {
  cy.visit('src/privacy.html');
  cy.get('#title').should(
    'have.text',
    'CAC TAT - Política de Privacidade'
  );
});
