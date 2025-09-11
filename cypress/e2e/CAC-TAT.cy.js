describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it("preenche os campos obrigatórios e envia o formulário", ()=>{
   cy.get("#firstName").type("Kelvynn")
   cy.get("#lastName").type("Duarte")
   cy.get("#email").type("Kelvynn@teste.com")
   cy.get("#open-text-area").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",{delay:0})
  //  cy.get("button[type='submit']").click()
  cy.get("input[type='radio'][value='elogio']").check()
  // cy.get("input[type='checkbox'][value='email']").check()
  cy.get("input[type='checkbox'][value='phone']").check()
  cy.get("select#product").select("Cursos")
  cy.get("input[type='file']").selectFile("cypress/fixtures/example.json",{action: "drag-drop"})
  cy.get("input[type='checkbox'][value='phone']").should("be.checked").then(() => {
    cy.get("[id='phone']input[type='number']").type("123456789")
  })

  })
  it("envia o formulário", () => cy.get("button[type=submit][class=button]").click())
  // it("Abre a aba na guia atual ao clicar no link do privacy", () => {
  //   cy.get("#privacy a").should("have.attr","target","_blank")
  //   cy.get("#privacy a").invoke("removeAttr","target").click()
  //   cy.contains("Talking About Testing")
  // })

})
