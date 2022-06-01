/// <reference types="cypress"/> 




describe('Cadastro de Pessoas - Filtro Avançado ', () => {
    beforeEach(function () {
        cy.login()
        
        Cypress.on('uncaught:exception', (err, runnable, promise) => {
            if (promise) {
                return false
            }

        })

    });

    const inativo = require('../fixtures/inativo.json')

    it('Testar Filtro Inativo', function () {
      
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.get('#koopon-pessoa-radio-inativo-filtro-pessoa').check({ force: true })
        cy.btnFiltroAvancado()
      
        cy.get('[data-alt-titulo="Nome"]')
            .should('have.length', '1')
           
    });


    

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
            .should('have.length', '30')

    });


    it('Testar Filtro Todos', function () {
        cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1',
            { fixture: 'todos.json' }
        ).as('waitFiltro')
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.btnFiltroAvancado()
        .as('waitFiltro')
        cy.nomePessoa()
            .should('have.length', '31')

    });

    it('Testar Filtro Cliente', function () {
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
            .should('have.length', '21')

    })

    it('Testar Filtro Funcionário', function () {
        cy.intercept('GET', '//koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=funcionario',)
            { fixture: 'funcionario.json' }
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-funcionario').check({ force: true })
        cy.btnFiltroAvancado()
        cy.nomePessoa()
            .should('have.length', '5')

    })

    it('Testar Filtro Fornecedor', function () {
        cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=fornecedor',
            { fixture: 'fornecedor.json' }
        ).as('waitFiltro')
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-fornecedor').check({ force: true })
        cy.btnFiltroAvancado()
        cy.wait('@waitFiltro')
        cy.nomePessoa()
            .should('have.length', '8')

    })

    it('Testar Filtro Sócio', function () {
        cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=socio',
            { fixture: 'socio.json' }
        ).as('waitFiltro')
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-socio').check({ force: true })
        cy.btnFiltroAvancado()
        cy.wait('@waitFiltro')
        cy.nomePessoa()
            .should('have.length', '4')

    })

    it('Testar Filtro Transportadora', function () {
        cy.intercept('GET', '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1&propriedade=tppessoa&valor=transportadora',
            { fixture: 'transportadora.json' }
        ).as('waitFiltro')
        cy.AcessarPessoas()
        cy.exibir100Itens()
        cy.acessarFiltroAvancado()
        cy.get('#koopon-pessoa-modal-filtro-pessoas-checkbox-tipo-pessoa-transportadora').check({ force: true })
        cy.btnFiltroAvancado()
        cy.wait('@waitFiltro')
        cy.nomePessoa()
            .should('have.length', '2')

    })

  

})





