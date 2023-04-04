/// <reference types="cypress"/>




describe('Cadastro de Pessoas - Filtro Avançado ', () => {
  beforeEach(function () {
    cy.login()

    Cypress.on('uncaught:exception', (err, runnable, promise) => {
      if (promise) {
        return false
      }

    })

  })

  const inativo = require('../fixtures/inativo.json')

  it('Testar Filtro Inativo', function () {

    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-radio-inativo-filtro-pessoa').check({ force: true })
    cy.btnFiltroAvancado()

    cy.get('[data-alt-titulo="Nome"]')
      .should('have.length', '1')

  })




  it('Testar Filtro Ativo', function () {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=status&valor=1',
      { fixture: 'ativo.json' }

    ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-radio-ativo-filtro-pessoa').check({ force: true })
    cy.btnFiltroAvancado()
    cy.wait('@waitFiltro')
    cy.get('[data-alt-titulo="Nome"]')
      .should('have.length', '27')

  })


  it('Testar Filtro Todos', function () {
   // cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1',
      //{ fixture: 'todos.json' }
   // )//.as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.btnFiltroAvancado()
      .as('waitFiltro')
    cy.nomePessoa()
      .should('have.length', '30')

  })

  it.only('Testar Filtro Cliente', function () {
    cy.intercept('GET', '//koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=cliente',
      { fixture: 'clientes' }

    ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-cliente').check({ force: true })
    cy.btnFiltroAvancado()
    cy.wait('@waitFiltro')
    cy.nomePessoa()
      .should('have.length', '30')

  })

  it('Testar Filtro Funcionário', function () {
    cy.intercept('GET', '//koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=funcionario',)
    { 'funcionario.json' }
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-funcionario').check({ force: true })
    cy.btnFiltroAvancado()
    cy.nomePessoa()
      .should('have.length', '3')

  })

  it('Testar Filtro Fornecedor', function () {
    //cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=fornecedor',
      //{ fixture: 'fornecedor.json' }
    //)//.as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-fornecedor').check({ force: true })
    cy.btnFiltroAvancado()
    //cy.wait('@waitFiltro')
    cy.nomePessoa()
      .should('have.length', '8')

  })

  it('Testar Filtro Sócio', function () {
    //cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=socio',
      //{ fixture: 'socio.json' }
    //).as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-socio').check({ force: true })
    cy.btnFiltroAvancado()
    //cy.wait('@waitFiltro')
    cy.nomePessoa()
      .should('have.length', '2')

  })

  it('Testar Filtro Transportadora', function () {
    // cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=transportadora',
    //   { fixture: 'transportadora.json' }
    // ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.exibir100Itens()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-transportadora').check({ force: true })
    cy.btnFiltroAvancado()
    //cy.wait('@waitFiltro')
    cy.nomePessoa()
      .should('have.length', '3')

  })


  it('Testar Filtro data de Aniversario', function () {
    const aniversario = require('../fixtures/dataAniversario.json')
    // cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1&propriedade=dtNascimentoIni,dtNascimentoFim&valor=01-01,01-01',
    //   { fixture: 'dataAniversario.json' }
    // ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-data-aniversario-inicial').type('01/01', { delay: 0 })
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-data-aniversario-final').type('01/12', { delay: 0 })
    cy.btnFiltroAvancado()
    //cy.wait('@waitFiltro')
    cy.nomePessoa()
      .should('have.length', '2')

  })

  it('Testar Filtro por nome', function () {
    cy.AcessarPessoas()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-info-pessoa').type('Pessoa Automação', { delay: 0 })
    cy.btnFiltroAvancado()
    cy.nomePessoa()
      .contains('Pessoa Automação')
      .should('have.text','Pessoa Automação')

  })

  it('Testar Filtro por CNPJ', function () {
    cy.intercept('GET', '//koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1&propriedade=cpfCnpj&valor=14151066000197',
      { fixture: 'filtroAvancadoCNPJ.json' }
    ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-info-pessoa').type('14151066000197', { delay: 0 })
    cy.btnFiltroAvancado()
    cy.wait('@waitFiltro')
    cy.get('[ng-bind="pessoa.cpfCnpj"]')
      .contains('14.151.066/0001-97')
      .should('have.text','14.151.066/0001-97')

  })

  it('Testar Filtro por Ração Social', function () {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1&propriedade=nome,nomeFantasia&valor=Administradora+Ltda+_,Administradora+Ltda+_',
      { fixture: 'filtroAvancadoRazaoSocial.json' }
    ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-info-pessoa').type('Administradora Ltda _', { delay: 0 })
    cy.btnFiltroAvancado()
    cy.wait('@waitFiltro')
    cy.get('[data-alt-titulo="Nome Fantasia"]')
      .contains('Administradora Ltda _')
      .should('have.text','Administradora Ltda _')

  })

  it('Testar Filtro por CPF', function () {
    cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1&propriedade=cpfCnpj&valor=07379410067',
      { fixture: 'filtroAvancadoCPF.json' }
    ).as('waitFiltro')
    cy.AcessarPessoas()
    cy.acessarFiltroAvancado()
    cy.get('#koopon-pessoa-modal-filtro-pessoas-input-info-pessoa').type('07379410067', { delay: 0 })
    cy.btnFiltroAvancado()
    cy.wait('@waitFiltro')
    cy.get('[ng-bind="pessoa.cpfCnpj"]')
      .contains('073.794.100-67')
      .should('have.text','073.794.100-67')

  })


})









