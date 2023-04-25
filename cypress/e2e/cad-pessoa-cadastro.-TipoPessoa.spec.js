/// <reference types="cypress"/>
const sampleForm = require('../fixtures/sampleForm.json')

describe('Cadastro de Pessoas - Cadastros', () => {
  beforeEach(function () {
    cy.login()
    cy.limparLixo()
    cy.intercept('POST', '/koopon-pessoa-rest-api/pessoas').as('AguardarCadastro')
    Cypress.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false
      }

    })

  })

  it.skip('Deletar lixo antes de rodar o teste', () => {

  })

  const tipo = require('../fixtures/cad-Pessoas-TipoPessoas.json')
  tipo.forEach((item, index) => {
    it(`Cadastar pessoa do tipo  ${item.tipoPessoa} e ${item.TipoPessoacontribuinte} `, () => {
      cy.AcessarPessoas()
      cy.criarTipoPessoaContribuinte(item.tipoPessoa, item.TipoPessoacontribuinte)
      cy.wait('@AguardarCadastro').its('response.statusCode').should('be.equal', 200)
      cy.validarPessoasCriada('Automatizado')

    })

  })

})








