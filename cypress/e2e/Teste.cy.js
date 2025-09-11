describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })


it("envia o formulário", () => {
  cy.contains('Nome')
   const dados = {
     firstName: "Kelvynn",
     lastName: "Duarte",
     email: "Kelvynn@teste.com",
     openTextArea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
     radio: "elogio",
     checkbox: "phone",
     product: "Cursos"}
  cy.fillMandatoryFieldsAndSubmit(dados)
})
})
