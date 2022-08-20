/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Exportação de PDF e CSV pelo tipo pessoas ', () => {
  beforeEach(function () {
    cy.login()
    Cypress.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false
      }

    })



  })

  it.skip('Exportar PDF para o tipo pessoa Transportadora, sem Transportadora cadastradada', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1',
      { fixture: 'Sem-Transportadora' }

    ).as('FiltroAvancado')
    cy.AcessarPessoas()
    cy.wait('@FiltroAvancado')
    cy.get('#pessoa-btn-exportar-xls-pdf').click()
    cy.contains('Em formato PDF').click()
    cy.get('#exportacao-pessoas-tipo-pessoa').select('Transportadoras', { force: true })
    cy.get('[ng-click*="exportacaoPessoas"]').click()


  })




  const pessoaExportacao = require('../fixtures/cad-Pessoas-ExportacaoArquivos.json')

  pessoaExportacao.forEach((item, index) => {
    it.skip(`Exportar PDF para o tipo pessoa ${item.tipoPessoa}`, () => {
      cy.AcessarPessoas()
      cy.get('#pessoa-btn-exportar-xls-pdf').click()
      cy.contains('Em formato PDF').click()
      cy.get('#exportacao-pessoas-tipo-pessoa').select(item.tipoPessoa, { force: true })
        .should('have.value', item.TipoPessoaValue)
      cy.get('[ng-click*="exportacaoPessoas"]').click({ force: true })


    })


    it.skip(`Exportar CSV para o tipo pessoa ${item.tipoPessoa}`, () => {
      cy.AcessarPessoas()
      cy.get('#pessoa-btn-exportar-xls-pdf').click()
      cy.contains('Em formato CSV').click()
      cy.get('#exportacao-pessoas-tipo-pessoa').select(item.tipoPessoa, { force: true })
        .should('have.value', item.TipoPessoaValue)
      cy.get('[ng-click*="exportacaoPessoas"]').click()


    })

  })

})













