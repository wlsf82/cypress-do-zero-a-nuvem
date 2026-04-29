describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
    cy.get('#firstName').as('nome');
    cy.get('#lastName').as('sobrenome');
    cy.get('#email').as('email');
    cy.get('#open-text-area').as('comoAjudar');
    cy.get('#phone').as('telefone');
    cy.get('button[type="submit"]').as('enviar');
    cy.get('#product').as('produto');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('@nome').should('be.visible').type('Nome', { delay: 0 });
    cy.get('@sobrenome').should('be.visible').type('Sobrenome');
    cy.get('@email').should('be.visible').type('teste@teste.com');
    cy.get('@comoAjudar').should('be.visible').type('Ajuda teste');
    cy.get('@enviar').should('be.visible').click();
    //**************Assertion***********************
    cy.get('.success')
      .should('be.visible')
      .and('contain.text', 'Mensagem enviada com sucesso');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('@nome').should('be.visible').type('Nome');
    cy.get('@sobrenome').should('be.visible').type('Sobrenome');
    cy.get('@email').should('be.visible').type('emailInvalido');
    cy.get('@comoAjudar').should('be.visible').type('Ajuda teste');
    cy.get('@enviar').should('be.visible').click();
    //**************Assertion***********************
    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!');
  });

  it('campo telefone permanece vazio ao digitar valor não numérico', () => {
    cy.get('@nome').should('be.visible').type('Nome');
    cy.get('@sobrenome').should('be.visible').type('Sobrenome');
    cy.get('@email').should('be.visible').type('emailInvalido');
    cy.get('@comoAjudar').should('be.visible').type('Ajuda teste');
    cy.get('@telefone').type('meuTelefone');
    cy.get('@telefone').should('be.empty');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('@nome').should('be.visible').type('Nome');
    cy.get('@sobrenome').should('be.visible').type('Sobrenome');
    cy.get('@email').should('be.visible').type('emailInvalido');
    cy.get('@comoAjudar').should('be.visible').type('Ajuda teste');
    cy.get('#phone-checkbox').check();
    cy.get('@telefone').type('meuTelefone');
    cy.get('@telefone').should('be.empty');
    cy.get('@enviar').should('be.visible').click();
    //**************Assertion***********************
    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Valide os campos obrigatórios!');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('@nome').should('be.visible').type('Nome');
    cy.get('@nome').should('have.value', 'Nome');
    cy.get('@nome').clear();
    cy.get('@nome').should('be.empty');
    cy.get('@sobrenome').should('be.visible').type('Sobrenome');
    cy.get('@sobrenome').should('have.value', 'Sobrenome');
    cy.get('@sobrenome').clear();
    cy.get('@sobrenome').should('be.empty');
    cy.get('@email').should('be.visible').type('email@teste.com');
    cy.get('@email').should('have.value', 'email@teste.com');
    cy.get('@email').clear();
    cy.get('@email').should('be.empty');
    cy.get('@comoAjudar').should('be.visible').type('Ajuda teste');
    cy.get('@telefone').type('meuTelefone');
    cy.get('@telefone').should('be.empty');
  });

  it('usando comando customizado', () => {
    cy.preenche(
      'NomeTeste',
      'SobrenomeTeste',
      'email@teste2.com',
      'Ajuda2'
    );
    cy.get('@nome').should('have.value', 'NomeTeste');
    cy.get('@sobrenome').should('have.value', 'SobrenomeTeste');
    cy.get('@email').should('have.value', 'email@teste2.com');
    cy.get('@comoAjudar').should('have.value', 'Ajuda2');
  });

  it('seleciona um produto (Youtube) por seu texto (text)', () => {
    cy.get('@produto')
      .select('YouTube')
      .should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('@produto')
      .select('mentoria')
      .should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('@produto').select(1).should('have.value', 'blog');
  });

  it('marca cada tipo de atendimento - Ajuda', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('be.checked');
  });
  it('marca cada tipo de atendimento - Elogio', () => {
    cy.get('input[type="radio"][value="elogio"]')
      .check()
      .should('be.checked');
  });
  it('marca cada tipo de atendimento - Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked');
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked');

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {
        action: 'drag-drop'
      })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('exemplo');
    cy.get('#file-upload')
      .selectFile('@exemplo')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a[href="privacy.html"]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html');
  });
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click();

    cy.get('#title').should(
      'have.text',
      'CAC TAT - Política de Privacidade'
    );
  });
});
