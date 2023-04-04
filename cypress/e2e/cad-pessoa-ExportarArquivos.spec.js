/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Exportação de PDF e CSV pelo tipo pessoas ', () => {
  beforeEach(function () {
    cy.login()
    cy.ExcluirXML()
  })

  it('Exportar PDF para o tipo pessoa Transportadora, sem Transportadora cadastradada ', () => {
    cy.AcessarPessoas()
    cy.get('#pessoa-btn-exportar-xls-pdf').click()
    cy.contains('Em formato PDF').click()
    cy.get('#exportacao-pessoas-tipo-pessoa').select('Transportadora', { force: true })
    cy.get('[ng-click*="exportacaoPessoas"]').click({ force: true })

    cy.window().document().then(function (doc) {
      doc.addEventListener('click', () => {
        setTimeout(function () { doc.location.reload() }, 5000)
      })
      cy.get('#toast-download-button > .btn').click()
    })
    cy.LocalizarXMLAlterarNome()



    // cy.get('#toast-download-button > .btn')
    // .should('be.visible')
    // .click()


  })

  const pessoaExportacao = require('../fixtures/cad-Pessoas-ExportacaoArquivos.json')

  pessoaExportacao.forEach((item, index) => {
    it.only(`Exportar PDF para o tipo pessoa ${item.tipoPessoa}`, () => {
      cy.AcessarPessoas()
      cy.get('#pessoa-btn-exportar-xls-pdf').click()
      cy.contains('Em formato PDF').click()
      cy.get('#exportacao-pessoas-tipo-pessoa').select(item.tipoPessoa, { force: true })
        .should('have.value', item.TipoPessoaValue)
      cy.get('[ng-click*="exportacaoPessoas"]').click({ force: true })
      cy.contains('Baixar arquivo')
      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get('#toast-download-button > .btn').click()
      })
      cy.LocalizarXMLAlterarNome()
    
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













