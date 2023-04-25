
Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.intercept('GET', '/core/app/views/core_selecao_empresas_view.html').as("AguardarPagina")
    cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarEmpresa")    
    onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
    onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '09/02/2023')
    onBeforeLoad: window.localStorage.setItem('VERSAO_SISTEMA', 2.26)
    onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["401241",["900000"]')
    cy.visit('/')
    cy.get('#email-login')
      .clear()
      .type(username, { delay: 0 })
    cy.get('.panel-body input[type="password"]').type(password, { log: false })
    cy.get('#login-passaporte').click()
    cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
    cy.get(":nth-child(1) > .alt-lista-item-container").click();
    cy.AcessarSistema()

  }
  const options = {
    cacheAcrossSpecs: true,
  }
  if (cacheSession) {
    cy.session(username, login, options)
  } else {
    login()
  }
})
Cypress.Commands.add('AcessarSistema', () => {
  cy.wait("@AguardarEmpresa").its("response.statusCode").should("be.equal", 200);
  cy.get('.active > b', { timeout: 10000 })
    .should('be.visible', { timeout: 10000 })

})

Cypress.Commands.add('AcessarPessoas', () => {
  cy.visit('/')
  cy.get('#koopon-cabecalho-navbar-cadastro',{ timeout: 50000 })
    .should('be.visible')
    .click({ force: true })
    cy.get('#koopon-cabecalho-navbar-cadastro-pessoa-adicionar',{ timeout: 50000 })
    .should('be.visible')
    .click({ force: true })

})

