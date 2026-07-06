describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(()=> {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal',  'Central de Atendimento ao Cliente TAT')
  })
  it('preencha os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijlmnopqrstuvwxyz', 10)

    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('rafaeldeoliveira87@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('not.be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
     cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('rafaeldeoliveira87@gmail,com')
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })
  it('Exibe uma mensagem de erro quando o campo telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('rafaeldeoliveira87@gmail.com')
    cy.get('#open-text-area').type('test')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error')
  })
  it('Preenche e limpa os campos nome, email e telefone', () => {
    cy.get('#firstName')
      .type('Rafael')
      .should('have.value', 'Rafael')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Oliveira')
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('rafaeldeoliveira87@gmail.com')
      .should('have.value', 'rafaeldeoliveira87@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Rafael',
      lastName: 'Oliveira',
      email: 'rafaeldeoliveira87@gmail.com',
      text: 'Teste.'
    }

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('Selecione um produto (Youtube) por seu texto', () =>{
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Selecione um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Selecione um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')   
  })

  it('Marca o tipo de atendimento " Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(typeOfservice => {
      cy.wrap(typeOfservice)
      .check()
      .should('be.checked')
    })
  })
  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('Selecione um arquivo da pastafixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
       expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('Selecione um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
       expect(input[0].files[0].name).to.equal('example.json')
      })
  })
it('Selecione um arquivo utilizando uma fixture apara qual foi dada um alias', () => {
  cy.fixture('example.json').as('samplefile')
    cy.get('#file-upload')
      .selectFile('@samplefile')
      .should(input => {
       expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifique que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })

  it('Acessa a pagina de politica de privacidade removendo o target e clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})