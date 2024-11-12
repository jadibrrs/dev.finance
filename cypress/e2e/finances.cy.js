describe('Transações', () => {

  it('Acessar página inicial', () => {
      cy.acessarPaginaInicial();
  });
  it('Criar nova transação de entrada', () => {
      cy.acessarPaginaInicial();

      cy.clicarNovaTransacao();

      cy.inserirDescricao("Mesada");
      cy.inserirValor(100);
      cy.inserirData("2023-02-01");

      cy.contains("Salvar").click();

      cy.get("tbody tr").should("have.length", 1);
  });

  it('Criar nova transação de saída', () => {
      cy.acessarPaginaInicial();

      cy.clicarNovaTransacao();

      cy.inserirDescricao("Mesada");
      cy.inserirValor(-100);
      cy.inserirData("2023-02-01");

      cy.contains("Salvar").click();

      cy.get("tbody tr").should("have.length", 1);
  });

  it('Visualizar transação de entrada', () => {
      cy.acessarPaginaInicial();
      
      cy.criarTransacao("Mesada 1", 100, "2023-02-01");

      cy.get("tbody tr").should("have.length", 1);
      cy.get("tbody tr td.description").contains("Mesada 1");
      cy.get("tbody tr td.income").contains('R$ 100,00');
      cy.get("tbody tr td.date").contains('01/02/2023');
  });

  it('Visualizar transação de saída', () => {
      cy.acessarPaginaInicial();
      
      cy.criarTransacao("Mesada 1", -100, "2023-02-01");

      cy.get("tbody tr").should("have.length", 1);
      cy.get("tbody tr td.description").contains("Mesada 1");
      cy.get("tbody tr td.expense").contains('R$ 100,00');
      cy.get("tbody tr td.date").contains('01/02/2023');
  });

  it('Visualizar valor do total de entradas', () => {
      cy.acessarPaginaInicial();
      
      cy.criarTransacao("Mesada 1", 100, "2023-02-01");
      cy.criarTransacao("Mesada 2", 50, "2023-02-15");

      cy.get("#incomeDisplay").contains("R$ 150,00");
  });

  it('Visualizar valor do total de saídas', () => {
      cy.acessarPaginaInicial();
      
      cy.criarTransacao("Mesada 1", -100, "2023-02-01");
      cy.criarTransacao("Mesada 2", -50, "2023-02-15");

      cy.get("#expenseDisplay").contains("R$ 150,00");
  });

  it('Visualizar valor do total', () => {
      cy.acessarPaginaInicial();
      
      cy.criarTransacao("Mesada 1", 100, "2023-02-01");
      cy.criarTransacao("Mesada 2", -60, "2023-02-15");
      
      cy.get("#totalDisplay").contains("R$ 40,00");
  });

  it('Excluir transação de entrada', () => {
      cy.acessarPaginaInicial();

      cy.criarTransacao("Mesada 1", 100, "2023-02-01");

      cy.get('[onclick*=remove]').click();
  });

  it('Excluir transação de saída', () => {
      cy.acessarPaginaInicial();

      cy.criarTransacao("Mesada 1", -100, "2023-02-01");

      cy.get('[onclick*=remove]').click();
  });

  it('Verificar atualização do total de entradas após exclusão', () => {
      cy.acessarPaginaInicial();

      cy.criarTransacao("Mesada 1", 100, "2023-02-01");
      cy.get('[onclick*=remove]').click();

      cy.get("#incomeDisplay").contains("R$ 0,00");
  });

  it('Verificar atualização do total de saídas após exclusão', () => {
      cy.acessarPaginaInicial();

      cy.criarTransacao("Mesada 1", -100, "2023-02-01");
      cy.get('[onclick*=remove]').click();

      cy.get("#expenseDisplay").contains("R$ 0,00");
  });

  it('Verificar atualização do total após exclusão', () => {
      cy.acessarPaginaInicial();

      cy.criarTransacao("Mesada 1", 100, "2023-02-01");
      cy.criarTransacao("Mesada 2", -60, "2023-02-15");

      cy.get('[onclick*=remove]').first().click();
      cy.get('[onclick*=remove]').click();
      cy.get("#totalDisplay").contains("R$ 0,00");
  });
});