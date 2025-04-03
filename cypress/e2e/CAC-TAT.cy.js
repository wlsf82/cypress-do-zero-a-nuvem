describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    // root-level hook
    // runs before every test block
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT")
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy.get('#firstName').type('Rodrigo') //pega um campo textfield chamado fistName e digita o que estiver o texto dento de type
    cy.get('#lastName').type('Akamine')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Descrição teste que estou enviando para saber se está certo.', {delay: 0}) //adicionar delay 0 faz com que o texto escrito seja escrito imediatamente
    cy.contains('button', 'Enviar').click() //substitui linha abaixo
    //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica

    cy.get('.success').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
    //.should('have.value', 'Mensagem enviada com sucesso.')
    })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Rodrigo') //pega um campo textfield chamado fistName e digita o que estiver o texto dento de type
    cy.get('#lastName').type('Akamine')
    cy.get('#email').type('email@email,com')
    cy.get('#open-text-area').type('Descrição teste que estou enviando para saber se está certo.', {delay: 0}) //adicionar delay 0 faz com que o texto escrito seja escrito imediatamente
    cy.contains('button', 'Enviar').click() //substitui linha abaixo
    //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica

    cy.get('.error').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
    //.should('have.value', 'Mensagem enviada com sucesso.')
    })

    it('verifica se apenas digitos serão adicionados no campo telefone', () => {
      cy.get('#phone').type('caracteres').should('have.value', '') //pega um campo textfield chamado fistName e digita o que estiver o texto dento de type
      cy.contains('button', 'Enviar').click() //substitui linha abaixo
      //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica
  
      cy.get('.error').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
      //.should('have.value', 'Mensagem enviada com sucesso.')
      })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Rodrigo') //pega um campo textfield chamado fistName e digita o que estiver o texto dento de type
      cy.get('#lastName').type('Akamine')
      cy.get('#email').type('email@email.com')
      cy.get('#open-text-area').type('Descrição teste que estou enviando para saber se está certo.', {delay: 0}) //adicionar delay 0 faz com que o texto escrito seja escrito imediatamente
      cy.get('#phone-checkbox').check() //click() substituido por check()
      cy.contains('button', 'Enviar').click() //substitui linha abaixo
      //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica
    
      cy.get('.error').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
      //.should('have.value', 'Mensagem enviada com sucesso.')
      })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName').type('Rodrigo')
      .clear('#firstName').should('have.value', '')
      cy.get('#lastName').type('Akamine')
      .clear('#lastName').should('have.value', '')
      cy.get('#email').type('email@email.com')
      .clear('#email').should('have.value', '')
      cy.get('#phone').type('1234678') //adicionar delay 0 faz com que o texto escrito seja escrito imediatamente
      .clear('#open-text-area').should('have.value', '')
      cy.contains('button', 'Enviar').click() //substitui linha abaixo
      //cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica
      
      cy.get('.error').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
      //.should('have.value', 'Mensagem enviada com sucesso.')
      })

     it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click() //pega um button do tipo submit e clica
      cy.get('.error').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
      //.should('have.value', 'Mensagem enviada com sucesso.'
      })

      it('envia o formuário com sucesso usando um comando customizado', () => {
        const data = {
          firstName: 'Rodrigo',
          lastName: 'Eiji Akamine',
          email: 'teste@teste.com',
          text: 'texto de exemplo.'
        }
        cy.fillMandatoryFieldsAndSubmit(data) //não informando data ele vai utilizar os valores padroes definidos na funcao em commands. 
        cy.get('.success').should('be.visible') //pega elemento da classe sucess e verifica se ela aparece
      })
  
      //EXEMPLOS para campos de seleção suspensa
      it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube') //atencao verificar o value do campo
      })

      it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria') //atencao verificar o value do campo
      })

      it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog') //atencao verificar o value do campo
      })

      //EXEMPLOS para campos do tipo radio ou checkboxes
      it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback').should('be.checked')
      })

      //faz a interação de todos os elementos da array(radio) e checa cada um no wrap
      it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .each(typeOfService => {
            cy.wrap(typeOfService)
              .check()
              .should('be.checked')
          })
      })

      //OBS: Use check() para checkboxes por além de semanticamente mais correto, deixa o teste mais acertivo um campo check() que já está marcado continuará marcado
      //já em um click() ele descamaria o campo caso ele estivesse previamente marcado por exemplo.
 
      it.only('marca ambos checkboxes, depois desmarca o último"', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
      })

})