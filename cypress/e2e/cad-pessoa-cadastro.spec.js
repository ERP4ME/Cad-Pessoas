/// <reference types="cypress"/>

describe('Cadastro de Pessoas - Cadastros', () => {
  beforeEach(function () {
    cy.login()
  })
  const pessoa = require('../fixtures/pessoa.json')
  it('Quando clicar em Novo, então deve validar se a tela é aberta', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.contains('Nova Pessoa')
      .should('have.text', 'Nova Pessoa')
  })
  it('Quando Gravar um cadastro de pessoa sem dados, então não deve permitir e deve ocorrer validação', () => {
    cy.intercept('GET', '/koopon-financeiro-rest-api/centros_de_custos').as("Aguardar_centros_de_custos")
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.wait("@Aguardar_centros_de_custos").its("response.statusCode").should("be.equal", 200);
    cy.btnGravar()
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .contains('Informe o Nome.')
      .should('have.text', 'Informe o Nome.')
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .contains('Informe o Tipo de Pessoa.')
      .should('have.text', 'Informe o Tipo de Pessoa.')

  })
  it('Quando Gravar um cadastro de pessoa com CPF/CPNJ invalido, então não deve permitir e deve ocorrer validação', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.campoCPFCNPJ().type(pessoa.cpfCnpjInv)
    cy.btnGravar()
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .contains('Informe um CPF ou CNPJ válido.')
      .should('have.text', 'Informe um CPF ou CNPJ válido.')
  })
  it('Quando Gravar um cadastro de pessoa com CPF/CPNJ já cadastrado, então não deve permitir e deve ocorrer validação', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.campoCPFCNPJ().type(pessoa.cpfCnpjExistente)

  })
  it.only('Quando Gravar um cadastro de pessoas completo e com dados validos, então deve ser feito o cadastro corretamente', () => {
    cy.AcessarPessoas()
    cy.criarPessoas()

  })
  it('Testar o limite máximo de caracteres do campo Nome', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#mf-pessoa-erpforme-especifica-input-nome-pessoa')
      .should('have.attr', 'maxlength', '99')

  })
  it('Testar o limite minimo de caracteres', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.wait(1000)
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#mf-pessoa-erpforme-especifica-input-nome-pessoa').type('W')
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .find('#mf-pessoa-erpforme-especifica-select-tipos-pessoa-pessoa')
      .click({ force: true })
    cy.get('mf-erpforme-pessoa').shadow()
      .contains('Cliente', { force: true })
      .click()
    cy.btnGravar()
    cy.get('mf-erpforme-pessoa')
      .shadow()
      .contains('O Nome deve ter mais de 1 caracter.')
      .should('have.text', 'O Nome deve ter mais de 1 caracter.')




  })
  it('Excluir Pessoa com Movimentação', () => {
    cy.AcessarPessoas()
    cy.PessoaNome()
      .contains('Administradora Ltda')
      .should('be.visible')
      .and('have.text', 'Administradora Ltda')
      .parent()
      .find('[title="Excluir"]')
      .click()
    cy.get('#confirmar-exclusao-modal-generico').click()
    const validacaoExcluirPessoaMovimentada = 'Não foi possível excluir, pois esta Pessoa possui movimentos em outras partes do sistema.'
    cy.contains(validacaoExcluirPessoaMovimentada)
          .should('have.text', validacaoExcluirPessoaMovimentada)

  })

})









