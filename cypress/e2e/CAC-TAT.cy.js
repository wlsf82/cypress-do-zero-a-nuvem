describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("Verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("Preenche os campos obrigatórios e envia o formulário.", function () {
    cy.get("#firstName").should("be.visible").type("Marcos Vinícius");
    cy.get("#lastName").should("be.visible").type("Amaral Marques");
    cy.get("#email").should("be.visible").type("marques.am.gold@gmail.com");
    cy.get("#open-text-area").should("be.visible").type("feedback");
    cy.contains("Enviar").should("be.visible").click();
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").should("be.visible").type("Marcos Vinícius");
    cy.get("#lastName").should("be.visible").type("Amaral Marques");
    cy.get("#email").should("be.visible").type("marques.am.goldAgmail.com");
    cy.get("#open-text-area").should("be.visible").type("feedback");
    cy.contains("Enviar").should("be.visible").click();
    cy.get(".error > strong").should("be.visible");
  });

  it("Se um valor não-numérico for digitado, seu valor continuará vazio.", function () {
    cy.get("#phone").should("be.visible").type("abcde").should("be.empty");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#phone-checkbox").check();
    cy.get("#firstName").should("be.visible").type("Marcos Vinícius");
    cy.get("#lastName").should("be.visible").type("Amaral Marques");
    cy.get("#email").should("be.visible").type("marques.am.gold@gmail.com");
    cy.get("#open-text-area").should("be.visible").type("feedback");
    cy.contains("Enviar").should("be.visible").click();
    cy.get(".error > strong").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#phone-checkbox").click();
    cy.get("#firstName")
      .should("be.visible")
      .type("Marcos Vinícius")
      .clear()
      .should("be.empty");
    cy.get("#lastName")
      .should("be.visible")
      .type("Amaral Marques")
      .clear()
      .should("be.empty");
    cy.get("#email")
      .should("be.visible")
      .type("marques.am.gold@gmail.com")
      .clear()
      .should("be.empty");
    cy.get("#open-text-area")
      .should("be.visible")
      .type("feedback")
      .clear()
      .should("be.empty");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", function () {
    cy.contains("Enviar").should("be.visible").click();
    cy.get(".error > strong").should("be.visible");
  });

  it("Envia o formuário com sucesso usando um comando customizado", function () {
    const data = {
      nome: "Marcos Vinícius",
      sobrenome: "Amaral Marques",
      email: "marques.am.gold@gmail.com",
      texto: "teste",
    };
    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get(".success > strong").should("be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("Seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("Seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("Marca o tipo de atendimento 'Feedback'", function () {
    cy.get(":nth-child(4) > input").check().should("be.checked");
  });

  it("Marca cada tipo de atendimento", function () {
    cy.get("#support-type input[type='radio']").each(($radio) => {
      cy.wrap($radio).check().should("be.checked");
    });
  });

  it("Marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('#check input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox)
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should("not.be.checked");
    });
  });
  it("Seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json");
    cy.get("#file-upload")
      .should("have.prop", "files")
      .then((files) => {
        expect(files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" });
    cy.get("#file-upload")
      .should("have.prop", "files")
      .then((files) => {
        expect(files[0].name).to.equal("example.json");
      });
  });

  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("exemploTXT");
    cy.get("#file-upload").should("not.have.value").selectFile("@exemploTXT");
    cy.get("#file-upload")
      .should("have.prop", "files")
      .then((files) => {
        expect(files[0].name).to.equal("example.json");
      });
  });

  it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("a").should("be.visible").should("have.attr", "target", "_blank");
  });

  it("Acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("a").should("be.visible").invoke("removeAttr", "target");
  });
});
