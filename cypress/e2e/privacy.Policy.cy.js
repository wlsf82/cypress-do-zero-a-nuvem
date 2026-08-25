Cypress._.times(15, () =>{
it.only('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')        // conform pede o exercicio isolamos este teste em outro arquivo e iniciamos direto pela url a ser testada sem passar pela home da aplicacao
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')  //validamos pelo texto do titulo html que estamos na pagina correta    
    cy.contains('p', 'Talking About Testing').should('be.visible')    // validamos tambem pelo texto de um paragrafo na pagina que realmente é a pagina correta através desta segunda validacao
     })
  })