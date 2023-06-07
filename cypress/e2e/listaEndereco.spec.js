/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Testar lista de Endereço', () => {
  beforeEach(function () {
    cy.login()
  })
  const pessoa = require('../fixtures/pessoa.json')

  it.skip('Quando Criar uma nov pessoa deve validar se a opção de Lista de Endereço esta visível', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#erp4me-mf-pessoa-botao-novo-endereco')
      .should('be.visible')

    cy.get('[data-alt-titulo="Nome"]')
      .contains('Administradora Ltda')
      .should('be.visible')
      .and('have.text', 'Administradora Ltda')
      .parent()
      .find('[title="Editar"]')
      .click()
      cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#erp4me-mf-pessoa-botao-novo-endereco')
      .should('not.be.visible')
  })
  it.skip('Quando Editar uma nova pessoa com toda lista de email já preenchida deve validar se a opção Lista de Endereço não esta visibel', () => {
    cy.AcessarPessoas()
    cy.get('[data-alt-titulo="Nome"]')
      .contains('Administradora Ltda')
      .should('be.visible')
      .and('have.text', 'Administradora Ltda')
      .parent()
      .find('[title="Editar"]')
      .click()
      cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#erp4me-mf-pessoa-botao-novo-endereco')
      .should('not.be.visible')
  })
  it.skip('Deve validar se todas as 3 opções de lista de endereço é exibida', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#erp4me-mf-pessoa-botao-novo-endereco')
    .click()
    cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-erpforme-pessoa-formulario-endereco-container > div.mt-3 > div:nth-child(1) > div > div:nth-child(1) > div > div > div.multiselect__tags').click()

    
  })

})











