describe("testa a página da política de privacidade de forma independente", function () {
  it("Verifica título, background e verifica 'Talking About Testing'", function () {
    cy.visit("src/privacy.html");
    cy.title().should(
      "eql",
      "Central de Atendimento ao Cliente TAT - Política de Privacidade"
    );
    cy.get("#white-background").should("be.visible");
    cy.get("#white-background > :nth-child(1)").should(
      "have.text",
      "Não salvamos dados submetidos no formulário da aplicação CAC TAT."
    );
    cy.get("#white-background > :nth-child(2)").should(
      "have.text",
      "Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real."
    );
    cy.get("#white-background > :nth-child(3)").should(
      "have.text",
      "No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino."
    );
    cy.get("#white-background > :nth-child(5)").should(
      "have.text",
      "Talking About Testing"
    );
  });
});
