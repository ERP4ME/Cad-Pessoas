const sampleForm = require('../fixtures/sampleForm.json')

Cypress.Commands.add('btnNovo', () => {
    cy.get('#koopon-pessoa-criar-pessoa-button', { timeout: 1000 }).click()
})

Cypress.Commands.add('btnGravar', () => {
    cy.get('#modal-pessoa-gravar').click()
})


let pessoa = {
    nome: "Automatizado",
    nomeFantasia: "Automatizado",
    pessoaContato: "pedro",
    telefone: "(21)  9544-5365",
    cpfCnpj: "72.889.414/0001-24",
    cpfCnpjInv: "72.889.414/0001",
    cpfCnpjExistende: "127.610.717-00",
    inscricaoEstadual: "24836746734",
    dataNascimento: "2000-01-01",

    endereco: {
        cep: "25976440",
        numero: "4",
        cidade: "Teresópolis",
    },

    ehContribuinteIcms: {
        ContribuinteICMS: "Contribuinte de ICMS",
        ContribuinteIsento: "Contribuinte de isento",
        NãoContribuinte: "Não contribuinte",

    }

}


Cypress.Commands.add('campoCPFCNPJ', () => {
    cy.get('#koopon-pessoa-especifica-input-cpf-cnpj')
})


Cypress.Commands.add('criarPessoas', () => {
    cy.btnNovo()
    cy.get('#koopon-pessoa-especifica-input-cpf-cnpj').type(pessoa.cpfCnpj, { delay: 0 })
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa').type(pessoa.nome, { delay: 0 })
    cy.get('#koopon-pessoa-especifica-select-tipos-pessoa-pessoa').select('Cliente', { force: true })
    cy.get('#koopon-pessoa-especifica-select-tipos-contribuinte-pessoa').select(pessoa.ehContribuinteIcms.NãoContribuinte, { force: true })
    cy.get('#koopon-pessoa-especifica-input-inscricao-estadual').type(pessoa.inscricaoEstadual, { delay: 0 })
    cy.get('#koopon-formulario-comum-endereco-input-cep').type(pessoa.endereco.cep, { delay: 0 })
    cy.get('#koopon-formulario-comum-endereco-input-numero').type(pessoa.endereco.numero), { delay: 0 }
    cy.btnGravar()
    cy.get('[data-alt-titulo="Nome"]')
        .contains('Automatizado')
        .should('be.visible')
        .and('have.text', 'Automatizado')
        .parent()
        .find('[title="Excluir"]')
        .click()
    cy.get('#confirmar-exclusao-modal-generico').click()


})


Cypress.Commands.add('criarPessoaContribuinte', (tipoContribuinte) => {
    cy.btnNovo()
    cy.get('#koopon-pessoa-especifica-input-cpf-cnpj').type(pessoa.cpfCnpj)
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa').type(pessoa.nome)
    cy.get('#koopon-pessoa-especifica-select-tipos-pessoa-pessoa').select('Cliente', { force: true })
    cy.get('#koopon-pessoa-especifica-select-tipos-contribuinte-pessoa').select(tipoContribuinte, { force: true })
    cy.get('#koopon-pessoa-especifica-input-inscricao-estadual').type(pessoa.inscricaoEstadual)
    cy.get('#koopon-formulario-comum-endereco-input-cep').type(pessoa.endereco.cep)
    cy.get('#koopon-formulario-comum-endereco-input-numero').type(pessoa.endereco.numero)
    cy.btnGravar()

})



Cypress.Commands.add('criarPessoaTipoPessoas', (tipoPessoa) => {
    cy.btnNovo()
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa').type(pessoa.nome)
    cy.get('#koopon-pessoa-especifica-select-tipos-pessoa-pessoa').select(tipoPessoa, { force: true })
    cy.btnGravar()

})


Cypress.Commands.add('validarPessoasCriada', (txt) => {
    cy.get('[data-alt-titulo="Nome"]')
        .contains('Automatizado')
        .should('be.visible')
        .and('have.text', txt)
        .parent()
        .find('[title="Excluir"]')
        .click()
    cy.get('#confirmar-exclusao-modal-generico').click()
    cy.get('[data-alt-titulo="Nome"]')
        .contains('Automatizado')
        .should('not.exist')

})



Cypress.Commands.add('criarTipoPessoaContribuinte', (tipoPessoa, tipoContribuinte) => {
    cy.btnNovo()
    cy.contains('Nova Pessoa')
        .should('have.text', 'Nova Pessoa')
    cy.get('#koopon-pessoa-especifica-select-tipos-pessoa-pessoa').select(tipoPessoa, { force: true })
    cy.get('#koopon-pessoa-especifica-input-nome-pessoa').type(pessoa.nome, { delay: 0 })
    cy.get('#koopon-pessoa-especifica-select-tipos-contribuinte-pessoa').select(tipoContribuinte, { force: true })
    cy.get('#koopon-pessoa-especifica-input-inscricao-estadual').type(pessoa.inscricaoEstadual, { delay: 0 })
    cy.get('#koopon-formulario-comum-endereco-input-cep').type(pessoa.endereco.cep, { delay: 0 })
    cy.get('#koopon-formulario-comum-endereco-input-numero').type(pessoa.endereco.numero, { delay: 0 })
    cy.btnGravar()

})



Cypress.Commands.add('PessoaNome', () => {
    cy.get('[data-alt-titulo="Nome"]').as('Nome')
})


Cypress.Commands.add('acessarFiltroAvancado', () => {
    cy.get('#koopon-pessoa-pessoas [data-toggle="dropdown"]')
        .eq('1')
        .click()
    cy.get('[ng-click*="filtroAvancado"]').click()
})



Cypress.Commands.add('btnFiltroAvancado', () => {
    cy.get('#koopon-pessoa-modal-filtro-pessoas-botao-filtrar').click()
})


Cypress.Commands.add('limparLixo', () => {
    cy.AcessarPessoas()
    cy.request({
        method: 'GET',
        url: '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=10&pagina=1'

    }).should(({ status, body }) => {
        body.forEach(body => {
            if (body.nome === sampleForm.nome) {
                cy.request({
                    method: 'DELETE',
                    url: `/koopon-pessoa-rest-api/pessoas/${body.idPessoa}`,


                }).should(({ status }) => {
                    expect(status).to.eq(204)
                })
            }
        })

    })
})




Cypress.Commands.add('exibir100Itens', () => {
    cy.get('#koopon-pessoa-pessoas button[ng-click*="Pagina(100)"]')
        .click()
})



Cypress.Commands.add('nomePessoa', () => {
    cy.get('[data-alt-titulo="Nome"]')
})




