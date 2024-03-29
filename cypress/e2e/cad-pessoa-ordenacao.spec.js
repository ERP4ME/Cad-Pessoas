/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Ordenação ', () => {
  beforeEach(() => {
    cy.login()

  })
  it('Quando realizar a ordenação DECRESCENTE pelo NOME, então a ordenação deve ocorrer corretamente', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?campoOrdenacao=nome&itensPorPagina=10&pagina=1&tipoOrdenacao=DESC', { fixture: 'Cad-Pessoas-Nome-DESC' }).as('ordenacao')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas .th-ordenacao')
      .eq('0')
      .click()
    cy.wait('@ordenacao')
    cy.PessoaNome()
      .first()
      .should('have.text', 'TRINCA MOTOS E ACESSORIOS LTDA')

  })
  it('Quando realizar a ordenação CRESCENTE pelo NOME, então a ordenação deve ocorrer corretamente', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?campoOrdenacao=nome&itensPorPagina=10&pagina=1&tipoOrdenacao=ASC',
      { fixture: 'Cad-Pessoas-Nome-ASC' }).as('ordenacaoASC')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas .th-ordenacao')
      .eq('0')
      .click()
      .click()
    cy.wait('@ordenacaoASC')
    cy.PessoaNome()
      .first()
      .should('have.text', 'Administradora Ltda')

  })
  it('Quando realizar a ordenação DECRESCENTE pelo CPF/CPNJ, então a ordenação deve ocorrer corretamente', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?campoOrdenacao=cpfCnpj&itensPorPagina=10&pagina=1&tipoOrdenacao=DESC',
      { fixture: 'Cad-Pessoas-CPF-CNPJ-DESC' }).as('ordenacao')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas .th-ordenacao')
      .eq('1')
      .click()
      .click()
    cy.wait('@ordenacao')
    cy.get('[data-alt-titulo="CPF / CNPJ"]')
      .eq('1')
      .should('have.text', '971.525.751-85')

  })
  it('Quando realizar a ordenação CRESCENTE pelo CPF/CPNJ, então a ordenação deve ocorrer corretamente', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?campoOrdenacao=cpfCnpj&itensPorPagina=10&pagina=1&tipoOrdenacao=ASC',
      { fixture: 'Cad-Pessoas-CPF-CNPJ-ASC' }).as('ordenacao')
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-pessoas .th-ordenacao')
      .eq('1')
      .click()
    cy.wait('@ordenacao')
    cy.get('[data-alt-titulo="CPF / CNPJ"]')
      .first()
      .should('have.text', '02.895.152/0001-25')

  })

})
