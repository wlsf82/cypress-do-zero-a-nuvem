describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
      cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    
  })
      it('preenche os campos obrigatorios e envia o formulario', () => {                                           //começando o teste
        cy.clock()

        const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz, 10')                                //criei uma variavel que repeto o texto x vezes usando a biblioteca do cypress com repeat

        cy.get('#firstName').type('Marcel')
        cy.get('#lastName').type('Munin')
        cy.get('#email').type('marcel.munin@hotmail.com')
        cy.get('#phone').type('11994067252')
        cy.get('#open-text-area').type('longText', {delay: 0})                                           // chamei a variavel para ser digitada e tirei o delay pra ficar na velocidade de um copiar colar
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        
        cy.tick(3000)

        cy.get('.success').should('not.be.visible')

      })
      it('exibe mensagem de erro ao submeter o formulario com um email de formatacao invalida', () => {
        cy.clock()

        cy.get('#firstName').type('Marcel')
        cy.get('#lastName').type('Munin')
        cy.get('#email').type('marcel.munin@hotmail**com')
        cy.get('#phone').type('11994067252')
        cy.get('#open-text-area').type('Teste')                                           
        cy.contains('button', 'Enviar').click()
      
        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
      }) 

      it('campo telefone continua vazio quando preenchido com um valor nao numerico', () =>{            // valida um campo numerico, tentando digitar letras e dps fazendo uma verificaçao para ver se ficou vazio como deveria
        cy.get('#phone')
        .type('abcde')
        .should('have.value', '')

      })  

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {          //clica na check box para ver deixar o campo telefone obrigatorio e nao preenche ele, depois verific se deu a mensagem de aviso
        cy.clock()

        cy.get('#firstName').type('Marcel')
        cy.get('#lastName').type('Munin')
        cy.get('#email').type('marcel.munin@hotmail.com')
        cy.get('#open-text-area').type('Teste4') 
        cy.get('#phone-checkbox').click()                                          
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')

      })

      it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
          .type('Marcel')
          .should('have.value','Marcel')
          .clear()
          .should('have.value','')
        cy.get('#lastName')
          .type('Munin')
          .should('have.value','Munin')
          .clear()
          .should('have.value','')
        cy.get('#email')
          .type('marcel.munin@hotmail.com')
          .should('have.value','marcel.munin@hotmail.com')
          .clear()
          .should('have.value','')
        cy.get('#phone')
          .type('11994067252')
          .should('have.value', '11994067252')
          .clear()
          .should('have.value','')

      })

      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.clock()

         cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')

      })

      it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()

      const data = {
          firstName: 'Marcel',
          lastName: 'Munin',
          email: 'marcel.munin@hotmail.com',
          text: 'Teste..'
      
      }    
        
        cy.fillMandatoryFieldsAndSubmit()

          cy.get('.success').should('be.visible')

          cy.tick(3000)

        cy.get('.success').should('not.be.visible')

      })
      it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')                                                    //select field
        .select('YouTube')                                                   // aqui seleciona a opcao na tela atraves do text q está com maiuscula
        .should('have.value', 'youtube' )                                    //aqui está validando que o valor(nao texto) no html está descrito como minusculo

      })
      it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select('mentoria')                                                 //neste caso selecionamos a opcao a ser escolhida pelo valor
        .should('have.value', 'mentoria' )                                  //e aqui validamos pelo valor também

      })
        it('seleciona um produto (Blog) por seu índice', () => {
          cy.get('#product')
          .select(1)                                                            // a opcao blog é a segunda da lista ou seja ela é indice 1 e aqui estamos selecionando a opcao desejada pelo indice
          .should('have.value', 'blog' )                                            // aqui estamos validando pelo valor tbm

        })
        it('marca o tipo de atendimento "Feedback"', () => {                //inputs do tipo radio(só pode selecionar uma opcao)
          cy.get('input[type="radio"][value="feedback"]')                        //seleciona input tipo radio com valor escolhido
            .check()                                                             //checa a selecao
            .should('be.checked')
        })
        it('marca cada tipo de atendimento', () => {
          cy.get('input[type="radio"]')
            .each(typeOfService => {
              cy.wrap(typeOfService)
                .check()
                .should('be.checked')
            })
               })
               it('marca ambos checkboxes, depois desmarca o último', () => {
                  cy.get('input[type="checkbox"]')       //chama todos os checkbox apartir do type
                    .check()                             // marca todos eles
                    .should('be.checked')                //checa a marcaçao
                    .last()                              // seleciona o ultimo
                    .uncheck()                           // desmarca
                    .should('not.be.checked')            //verifica que nao esta mais marcado
                  
               })
            it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
              cy.get('#firstName').type('Marcel')
              cy.get('#lastName').type('Munin')
              cy.get('#email').type('marcel.munin@hotmail**com')
              cy.get('#open-text-area').type('Teste')
              cy.get('#phone-checkbox').check()  
              cy.contains('button', 'Enviar').click()

              cy.get('.error').should('be.visible')

            })
            
            it('seleciona um arquivo da pasta fixtures', () => {
              cy.get('#file-upload')                          //seleciona o botao de upload de arquivos
              .selectFile('cypress/fixtures/example.json')   //seleciona o arquivo apartir do seu caminho(diretorio)
              .should(input => {                                 //should com arrow function
                expect(input[0].files[0].name).to.equal('example.json')    //expect verifica o input de indice zero e se o nome do arquivo é igual ao que subimos para validar o teste
              })
            })
          

          it('seleciona um arquivo simulando um drag-and-drop', () => {
             cy.get('#file-upload')                          
              .selectFile('cypress/fixtures/example.json', { action:'drag-drop' })   // fazendo assim é como se arrastasse o arquivo para fazer o upload
              .should(input => {                                 
                expect(input[0].files[0].name).to.equal('example.json')
               })
          })
          it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
              cy.fixture('example.json').as('sampleFile')                                   //neste caso nao precisa dar o caminho pq o cypress ja sabe o diretorio das fixtures
               cy.get('#file-upload')                         
                 .selectFile('@sampleFile')  
                .should(input => {                                 
                expect(input[0].files[0].name).to.equal('example.json')    
              })
            })
            it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
              cy.contains('a', 'Política de Privacidade')   //neste caso utilizando o contains faço com que uma tag simples seja mais especifica procurando pelo testo que passei depois da tag
                .should('have.attr', 'href', 'privacy.html')  //utilizamos para verificar se tem o atributo e se vai abrir o href na pagina privacy html
                  .and('have.attr', 'target', '_blank')   //utilizamos pra ver se tem o atributo target com o valor _blank
            })
            it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
              cy.contains('a', 'Política de Privacidade')    //pegamos a politica de privacidade
                .invoke('removeAttr', 'target')           //removemos o atributo target para trocar de link(pagina) na mesma aba do navegador, ou seja sem abrir outra
                .click()

                cy.contains('h1', 'CAC TAT - Política de Privacidade')   // aqui procuramos pelo titulo da html para validar se foi para o link certo
                  .should('be.visible')                   // aqui verificamos se ele esta visivel na tela

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
                .invoke('val', 'Um texto qualquer')
                .should('have.value', 'Um texto qualquer')
            })
            it('faz uma requisição HTTP', () => {
              cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
                .as('getRequest')                                                                   //alias é um @apelido pra poder chamar novamente
                .its('status')                                                                      //its é quando queremos chamar uma propriedade especifica de um objeto
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
                  .invoke('text', 'MUNIN APP')  
                cy.get('#subtitle')
                  .invoke('text', 'I LOVE MY FAMILY')   
                
              })

 })

     
          
