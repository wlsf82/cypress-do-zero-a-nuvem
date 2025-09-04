describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach('', () => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longtext = Cypress._.repeat('São Paulo FC', 20)

    cy.get('[name="firstName"]').type('Anderson')
    cy.get('[name="lastName"]').type('Silva')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('anderson.ramos@epharma.com.br')
    cy.get('[name="open-text-area"]').type(longtext, {delay:0})
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('[name="firstName"]').type('Anderson')
    cy.get('[name="lastName"]').type('Silva')
    cy.get(':nth-child(2) > :nth-child(1) > [name="email"]').type('anderson.ramos@epharma,com.br')
    cy.get('[name="open-text-area"]').type('teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
    cy.get('#phone')
      .type('abcdef')
      .should('have.value', '')
});
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Anderson')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('anderons.ramos@epharma.com.br')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Vai, São Pauloooooo!!!!!')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.contains('Valide os campos obrigatórios!').should('be.visible')
    //cy.get('.error').should('be.visible')
  });
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Anderson')
      .should('have.value', 'Anderson')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')  
    cy.get('#email')
      .type('Anderson.ramos@epharma.com.br')
      .should('have.value', 'Anderson.ramos@epharma.com.br')
      .clear()
      .should('have.value', '') 
    cy.get('#phone')
      .type('11989529084')
      .should('have.value', '11989529084')
      .clear()
      .should('have.value', '')
  });
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.get('.button').click()
    //cy.contains('Valide os campos obrigatórios!')
    cy.get('.error').should('be.visible')
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    const dados = {
      firstName: 'Ander',
      lastName: 'Ramos',
      email: 'anderson.ramos@epharma.com.br',
      text: 'Vamos São Pauloooooo'
    }
    cy.fillMandatoryFieldsAndSubmit(dados)

    cy.get('.success').should('be.visible')
  })
  it('Seleciona um produto (youtube) pelo seu texto', () => {
    cy.get('#product')
      .select('youtube')
      .should('have.value', 'youtube')
  });
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
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfServices => {
        cy.wrap(typeOfServices)
          .check()
          .should('be.checked')
      })
})
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
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
  it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')  
      .should('be.visible')
  })
})
