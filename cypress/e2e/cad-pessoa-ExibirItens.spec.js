/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Testar função Exibir Mais ', () => {
  beforeEach(() => {
    cy.login()
  })

  it('Quando Clicar em exibir 50, então deve exibir até 50 pessoas cadastradas', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=50&pagina=1',
      { fixture: 'itensPorPagina-50' }).as('ExibirMaisItens')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas button[ng-click*="Pagina(50)"]')
      .click()
    cy.wait('@ExibirMaisItens')
    cy.PessoaNome()
      .should('have.length', '50')

  })

  it('Quando Clicar em exibir 100, então deve exibir até 100 pessoas cadastradas', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1',
      { fixture: 'itensPorPagina-100' }).as('ExibirMaisItens')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas button[ng-click*="Pagina(100)"]')
      .click()
    cy.wait('@ExibirMaisItens')
    cy.PessoaNome()
      .should('have.length', '100')

  })

  it('Quando Clicar em exibir 10, então deve exibir até 10 pessoas cadastradas', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1',
      { fixture: 'itensPorPagina-10' }).as('ExibirMaisItens')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas button[ng-click*="Pagina(10)"]')
      .click()
    cy.wait('@ExibirMaisItens')
    cy.PessoaNome()
      .should('have.length', '10')

  })

})



