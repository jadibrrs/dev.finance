Cypress.Commands.add('acessarPaginaInicial', () => {
    cy.visit('https://devfinance-agilizei.netlify.app/'); 
})

Cypress.Commands.add('clicarNovaTransacao', () => {
    cy.get('[onclick*=open]').click();
})

Cypress.Commands.add('inserirDescricao', (descricao) => {
    cy.get('#description').type(descricao);
})

Cypress.Commands.add('inserirValor', (valor) => {
    cy.get('#amount').type(valor);
})

Cypress.Commands.add('inserirData', (data) => {
    cy.get('#date').type(data);
})

Cypress.Commands.add('criarTransacao', (descricao, valor, data) => {
    cy.clicarNovaTransacao();

    cy.inserirDescricao(descricao);
    cy.inserirValor(valor);
    cy.inserirData(data);

    cy.contains("Salvar").click();
})