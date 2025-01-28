describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => { 
    cy.visit('./src/index.html')
  })

  it('verifying the app title', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('fill the Core/Mandatory infos', () => {
    const longText = Cypress._.repeat('adcdfghijkabcabc' ,10)

    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail.com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('.button').click()


    cy.get('.success').should('be.visible')
  })
  
  it('displays an error message when submitting the form with an email with invalid formatting', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail,com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('phone camps stays empty when the inserted data is a not-number value', () =>{ 
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')

  })

  it('displays an error when the phone camps turn into core/mandatory and do not filled', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('johndoe@gmail,com')
    cy.get('#support-type > :nth-child(3)')
    cy.get('#open-text-area').type('Obrigado')
    cy.get('#phone-checkbox').check()
    cy.get('.button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('fill and clear the name, last name, email and phone', () => {
    cy.get('#firstName')
      .type('John')
        .should('have.value', 'John') 
        .clear()
        .should('have.value', '')
     cy.get('#lastName')
      .type('Doe Silva')
        .should('have.value', 'Doe Silva') 
        .clear()
        .should('have.value', '')
      cy.get('#email')
        .type('johndoe@gmail.com')
          .should('have.value', 'johndoe@gmail.com') 
          .clear()
          .should('have.value', '')
      cy.get('#phone')
          .type('123456789')
            .should('have.value', '123456789') 
            .clear()
            .should('have.value', '')
  })
  it('display error message when submitting the form without filling in the required fields', () => {
    cy.get('.button[type="submit"]').click()
  })
  
  it('try successfully submits the form using a custom command', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
it('select a product by its text', () => {
  cy.get('#product')
    .select('youtube')
    .should('have.value', 'youtube')
})

it('select a product by its value (value)', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
})

it('select a product by its index', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
})

it('mark the type of service "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
})

it('mark each type of service', () => {
  cy.get('input[type="radio"]')

})

it('check both checkboxes, then uncheck the last one', () => {

  cy.get('#email-checkbox').check()
  cy.get('#phone-checkbox').check()
  .should('be.checked')
  .last()
  .uncheck()
  .should('not.checked')
})

it('select a file from the fixture folders', () => {
  cy.get('#file-upload') 
    .selectFile('cypress/fixtures/example.json')
    .should( input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
})
it('select a file by simulating drag-and-drop', () => {
  cy.get('#file-upload') 
  .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
  .should( input => {
    expect(input[0].files[0].name).to.equal('example.json')
  })

})
it('selects a file using a fixture that has been given an alias', () => { 
  cy.fixture('example.json').as('sampleFile')
   cy.get('#file-upload') 
  .selectFile('@sampleFile')
  .should( input => {
    expect(input[0].files[0].name).to.equal('example.json')
  })

})

it('Verifies that the privacy policy opens in another tab without the need for a click', () => { 
  cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
}) 

it('access the privacy policy page by removing the target and then clicking the link', () => {
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})
})
