const sampleForm = require('../fixtures/sampleForm.json')

Cypress.Commands.add('btnNovo', () => {
  cy.get('#koopon-pessoa-criar-pessoa-button', { timeout: 1000 }).click()
})
Cypress.Commands.add('btnGravar', () => {
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-botao-gravar')
    .click({ force: true })
})
let pessoa = {
  nome: 'Automatizado',
  nomeFantasia: 'Automatizado',
  pessoaContato: 'pedro',
  telefone: '(21)  9544-5365',
  cpfCnpj: '72.889.414/0001-24',
  cpfCnpjInv: '72.889.414/0001',
  cpfCnpjExistende: '127.610.717-00',
  inscricaoEstadual: '24836746734',
  dataNascimento: '2000-01-01',

  endereco: {
    cep: '25976440',
    numero: '4',
    cidade: 'Teresópolis',
  },

  ehContribuinteIcms: {
    ContribuinteICMS: 'Contribuinte de ICMS',
    ContribuinteIsento: 'Contribuinte de isento',
    NãoContribuinte: 'Não contribuinte',

  }

}
Cypress.Commands.add('campoCPFCNPJ', () => {
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-cpf-cnpj')
})
Cypress.Commands.add('criarPessoas', () => {
  cy.intercept('GET', '/koopon-financeiro-rest-api/centros_de_custos').as("Aguardar_centros_de_custos")
  cy.btnNovo()
  cy.wait("@Aguardar_centros_de_custos").its("response.statusCode").should("be.equal", 200);
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-cpf-cnpj').type(pessoa.cpfCnpj, { force: true }, { delay: 4 })
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-nome-pessoa').type(pessoa.nome, { force: true }, { delay: 0 })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-pessoa-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa').shadow()
    .contains('Fornecedor')
    .click()
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-contribuinte-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .contains(pessoa.ehContribuinteIcms.NãoContribuinte, { force: true })
    .click()
  cy.AdiconarListaEndereco()
  cy.btnGravar()
  cy.excluirPessoa('Automatizado','Automatizado')
})
Cypress.Commands.add('criarPessoaContribuinte', (tipoContribuinte) => {
  cy.btnNovo()
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-cpf-cnpj').type(pessoa.cpfCnpj, { force: true }, { delay: 4 })
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-nome-pessoa').type(pessoa.nome, { force: true }, { delay: 0 })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-pessoa-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa').shadow()
    .contains('Fornecedor')
    .click()
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-contribuinte-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .contains(tipoContribuinte, { force: true })
    .click()
  cy.AdiconarListaEndereco()
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
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-cpf-cnpj').type(pessoa.cpfCnpj, { delay: 0 }, { force: true })
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-nome-pessoa').type(pessoa.nome, { force: true }, { delay: 0 })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-pessoa-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa').shadow()
    .contains(tipoPessoa, { force: true })
    .click()
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .find('#mf-pessoa-erpforme-especifica-select-tipos-contribuinte-pessoa')
    .click({ force: true })
  cy.get('mf-erpforme-pessoa')
    .shadow()
    .contains(tipoContribuinte, { force: true })
    .click()
  cy.AdiconarListaEndereco()
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
    url: '/koopon-pessoa-rest-api/pessoas/filtro?itensPorPagina=100&pagina=1'

  }).should(({ status, body }) => {
    body.conteudo.forEach(body => {
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
Cypress.Commands.add('LocalizarXMLAlterarNome', () => {
  cy.task('lerArquivo', 'cypress/Downloads', { timeout: 30000 })

})
Cypress.Commands.add('ExcluirXML', () => {
  cy.task('excluirArquivo',)

})
Cypress.Commands.add('excluirPessoa',(nome,pessoa)=>{
  cy.get('[data-alt-titulo="Nome"]')
    .contains(nome)
    .should('be.visible')
    .and('have.text', pessoa)
    .parent()
    .find('[title="Excluir"]')
    .click()
  cy.get('#confirmar-exclusao-modal-generico').click()
})
Cypress.Commands.add('ExportarAquivos',(arquivo)=>{
  cy.get('#pessoa-btn-exportar-xls-pdf').click()
      cy.contains(arquivo).click()
})
Cypress.Commands.add('BaixarArquivo',()=>{
  cy.get('[ng-click*="exportacaoPessoas"]')
  .should('be.visible')
  .click({ force: true })
  cy.contains('Baixar arquivo')
})
Cypress.Commands.add('AdiconarListaEndereco',()=>{
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-input-inscricao-estadual').type(pessoa.inscricaoEstadual, { delay: 0 }, { force: true })
  cy.get('mf-erpforme-pessoa').shadow().find('#erp4me-mf-pessoa-botao-novo-endereco').click()
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-aba-endereco-input-cep').type(pessoa.endereco.cep, { force: true })
  cy.get('mf-erpforme-pessoa').shadow().find('#mf-pessoa-erpforme-especifica-aba-endereco-input-numero').type(pessoa.endereco.numero, { force: true })
  cy.get('mf-erpforme-pessoa').shadow().find('#erp4me-mf-pessoa-botao-adicionar-endereco').click()
  
})