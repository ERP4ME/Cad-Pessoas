/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Exportação de PDF e CSV pelo tipo pessoas ', () => {
  beforeEach(function () {
    cy.login()
    cy.ExcluirXML()
  })

  const pessoaExportacao = require('../fixtures/cad-Pessoas-ExportacaoArquivos.json')

  pessoaExportacao.forEach((item, index) => {
    it(`Exportar PDF para o tipo pessoa ${item.tipoPessoa}`, () => {
      cy.AcessarPessoas()
      cy.ExportarAquivos('Em formato PDF').click({force:true})
      cy.get('#exportacao-pessoas-tipo-pessoa').select(item.tipoPessoa, { force: true })
        .should('have.value', item.TipoPessoaValue)
      cy.BaixarArquivo()
      //Responsável para resolver o problema onde o cypress fica aguardando uma nova página
      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get('#toast-download-button > .btn').click()
      })
      cy.LocalizarXMLAlterarNome()

    }) 

  })

  const pessoaExportacaoCSV = require('../fixtures/cad-Pessoas-ExportacaoArquivosCSV.json')
  pessoaExportacaoCSV.forEach((item, index) => {
    it(`Exportar CSV para o tipo pessoa ${item.tipoPessoa}`, () => {
      cy.AcessarPessoas()
      cy.ExportarAquivos('Em formato CSV').click({force:true})
      cy.get('#exportacao-pessoas-tipo-pessoa').select(item.tipoPessoa, { force: true })
        .should('have.value', item.TipoPessoaValue)
      cy.BaixarArquivo()
      //Responsável para resolver o problema onde o cypress fica aguardando uma nova página
      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get('#toast-download-button > .btn').click()
      })
      cy.LocalizarXMLAlterarNome()

    }) 

  })

})
















