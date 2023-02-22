
/*
Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.session([username, password], () => {
    onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '14/10/2022')
    onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["355672"]')
    window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_MANUTENCAO_SEFAZ', 'true')
    // onBeforeLoad: window.localStorage.setItem('KOOPON_NOVIDADES_VERSAO_2_21', 'true')
    window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
   
    cy.request({
      method: 'POST',
      url: '/passaporte-rest-api/rest/login',
      body: {
        senha: (Cypress.env('USER_PASSWORD')),
        usuario:(Cypress.env('USER_EMAIL'))

      },
    }).then((response) => {
      console.log(response)
      expect(response.status).to.eq(200)
      console.log(response.headers['set-cookie'][0])
      window.localStorage.setItem('conpass.token', response.headers['set-cookie'][0])
      cy.AcessarSistema()
    })
  })
})

*/

Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.session([username, password], () => {
    cy.intercept('GET', '/core/app/views/core_selecao_empresas_view.html').as("AguardarPagina")
    cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarEmpresa")



    onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
    onBeforeLoad: window.localStorage.setItem('ULTIMA_EXIBICAO_NOVIDADES', '09/02/2023')
    onBeforeLoad: window.localStorage.setItem('VERSAO_SISTEMA', 2.26)
    onBeforeLoad: window.localStorage.setItem('ARRAY_CRMS_NAO_EXIBIR_NOVIDADES', '["401241"]')
    cy.visit('/')
    // cy.pause()
    cy.get('#email-login')
      .clear()
      .type(username, { delay: 0 })
    cy.get('.panel-body input[type="password"]').type(password,{ log: false }, { delay: 0 }, )
    cy.get('#login-passaporte').click()
    cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
    cy.get(":nth-child(3) > .alt-lista-item-container").click();
    cy.AcessarSistema()

  })
})


Cypress.Commands.add('AcessarSistema', () => {
  cy.wait("@AguardarEmpresa").its("response.statusCode").should("be.equal", 200);
  cy.get('.active > b', { timeout: 10000 })
    .should('be.visible', { timeout: 10000 })

})

/*

Cypress.Commands.add('AcessarSistema', () => {
  cy.visit('/')
  cy.get(':nth-child(3) > .alt-lista-item-container')
    .should('be.visible')
    .click()
  cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as('AguardarPagina')
  cy.wait('@AguardarPagina').its('response.statusCode').should('be.equal', 200)
  cy.get('.alt-titulo-view-container li b')
    .should('be.visible')

})

*/
Cypress.Commands.add('AcessarPessoas', () => {
  cy.visit('/')
  cy.get('#koopon-cabecalho-navbar-cadastro')
    .should('be.visible')
    .click({ force: true })
    cy.get('#koopon-cabecalho-navbar-cadastro-pessoa-adicionar')
    .should('be.visible')
    .click({ force: true })

})
