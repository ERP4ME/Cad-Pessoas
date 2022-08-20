/// <reference types="cypress"/>



describe('Cadastro de Pessoas - Cadastros', () => {
  beforeEach(function () {
    cy.login()
    Cypress.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false
      }

    })


  })

  const pessoa = require('../fixtures/pessoa.json')

  it('Quando clicar em Novo, então deve validar se a tela é aberta', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.contains('Nova Pessoa')
      .should('have.text', 'Nova Pessoa')

  })

  it('Quando Gravar um cadastro de pessoa sem dados, então não deve permitir e deve ocorrer validação', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.btnGravar()
    cy.contains('Informe o Nome.')
      .should('have.text', 'Informe o Nome.')
    cy.contains('Informe o Tipo de Pessoa.')
      .should('have.text', 'Informe o Tipo de Pessoa.')

  })

  it('Quando Gravar um cadastro de pessoa com CPF/CPNJ invalido, então não deve permitir e deve ocorrer validação', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.campoCPFCNPJ().type(pessoa.cpfCnpjInv)
    cy.btnGravar()
    cy.contains('Informe um CPF ou CNPJ válido.')
      .should('have.text', 'Informe um CPF ou CNPJ válido.')

  })

  it('Quando Gravar um cadastro de pessoa com CPF/CPNJ já cadastrado, então não deve permitir e deve ocorrer validação', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.campoCPFCNPJ().type(pessoa.cpfCnpjExistente)

  })


  it('Quando Gravar um cadastro de pessoas completo e com dados validos, então deve ser feito o cadastro corretamente', () => {
    cy.AcessarPessoas()
    cy.criarPessoas()

  })


  it('Testar o limite máximo de caracteres do campo Nome', () => {
    cy.AcessarPessoas()
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa')
      .should('have.attr', 'maxlength', '99')

  })

  it('Testar o limite minimo de caracteres', () => {
    cy.AcessarPessoas()
    cy.btnNovo()
    cy.wait(1000)
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa').type('a')
    cy.btnGravar()
    cy.contains('O Nome deve ter mais de 1 caracter.')
      .should('have.text', 'O Nome deve ter mais de 1 caracter.')


  })

  it('Excluir Pessoa com Movimentação', () => {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1',
      { fixture: 'Cad-Pessoa-Movimentacao' }).as('PessoaMovimentada')

    cy.AcessarPessoas()
    cy.wait('@PessoaMovimentada')
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









