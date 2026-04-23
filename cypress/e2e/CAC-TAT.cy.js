
  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
      cy.visit('./src/index.html')
    })
    const longText = Cypress._.repeat('Testando com cypress', 10)

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  Cypress._.times(1, () => {
    it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.get('#firstName').type('Vinícius')
    cy.get('#lastName').type('Pimentel Oliveira')
    cy.get('#email').type('vini@example.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })
  })
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()

    cy.get('#firstName').type('Vinícius')
    cy.get('#lastName').type('Pimentel Oliveira')
    cy.get('#email').type('vinipo@gmail,com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)
    
    cy.get('.error').should('not.be.visible')
  })
it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
  cy.get('#phone')
    .type('abcde')
    .should('have.value','')
   
  })

it('exibe mensagem de erro quando telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.clock()

  cy.get('#firstName').type('Vinícius')
  cy.get('#lastName').type('Pimentel Oliveira')
  cy.get('#email').type('vini@example.com')
  cy.get('#open-text-area').type(longText, {delay: 0})
  cy.get('#phone-checkbox').check()
  cy.contains('button', 'Enviar').click()  
  cy.get('.error').should('be.visible')

  cy.tick(3000)

  cy.get('.error').should('not.be.visible')

  })
it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  cy.get('#firstName').type('Vinícius')
    .should('have.value', 'Vinícius')
    .clear()
    .should('have.value', '')
  cy.get('#lastName').type('Pimentel Oliveira')
    .should('have.value', 'Pimentel Oliveira')
    .clear()
    .should('have.value', '')
  cy.get('#email').type('vini@example.com')
    .should('have.value', 'vini@example.com')
    .clear()
    .should('have.value', '')
  cy.get('#phone').type('62948930202')
    .should('have.value', '62948930202')
    .clear()
    .should('have.value', '')
  
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })
 it('envia o formulário com sucesso usando um comando customizado', () => {
  cy.clock()
  const data  = {
    firstName: 'Vinícius',
    lastName: 'Pimentel Oliveira',
    email: 'vinicius2@gmail.com',
    text: 'Teste.'
  }
   cy.filMandatoryFieldsAndSubmit(data)

   cy.get('.success').should('be.visible')

   cy.tick(3000)

   cy.get('.success').should('not.be.visible')

     
  })
  it('seleciona um produto (Youtube) por seu texto', () => {
   cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })
it('seleciona um produto (Mentoria) por seu valor (value) ', () => {
   cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })
it('Seleciona um produto (Blog) por seu índice', () => {
   cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  }) 
it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('be.checked')
  }) 
it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
    }
    )
  }) 
it('marca ambos checkbox depois desmarca o último', () => {
   cy.get('#check input[type="checkbox"]')
     .as('checkboxes')
     .check()
     .should('be.checked')
     .last()
     .uncheck()
     .should('not.be.checked')
 })
 it('selciona um arquivo da pasta fixtures', () => {
   cy.get('input[type ="file"]')
   .selectFile('cypress/fixtures/example.json')
   .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
   })
 })
 it('seleciona um arquivo simulando um drag and-and-drop', () => {
   cy.get('input[type ="file"]')
   .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
   .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
   })
 })
 it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type ="file"]')
   .selectFile('@sampleFile')
   .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
   })
 })
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  cy.contains('a', 'Política de Privacidade')
   .should('have.attr', 'href', 'privacy.html')
   .and('have.attr', 'target', '_blank')   
 })
 it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
   .invoke('removeAttr', 'target')
   .click()
  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
 })
 it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})
  it('preenche o campo da área de texto usando o comando invoke', () => {
  cy.get('#open-text-area')
  .invoke('val', 'um texto qualquer')
  .should('have.value', 'um texto qualquer')
})
it('faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)
  cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
})
it('encontra o gato escondido', () => {
  cy.get('#cat')
    .invoke('show')
    .should('be.visible')
  cy.get('#title')
    .invoke('text', 'CAT TAT')
  cy.get('#subtitle')
    .invoke('text', 'Eu amo gatos')
})

})

