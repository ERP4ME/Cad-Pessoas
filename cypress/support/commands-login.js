
  Cypress.Commands.add('login', (
    username = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD')
  ) => {
  cy.session([username, password], () => {
    onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_MANUTENCAO_SEFAZ', 'true')
   // onBeforeLoad: window.localStorage.setItem('KOOPON_NOVIDADES_VERSAO_2_21', 'true')
   onBeforeLoad: window.localStorage.setItem('CHAVE_NAOEXIBIR_TOAST_VENCIMENTO_CERTIFICADO', 'true')
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
      console.log(response.headers["set-cookie"][0])
      window.localStorage.setItem('conpass.token', response.headers["set-cookie"][0])
      cy.AcessarSistema()
    })
  })
})


  
  Cypress.Commands.add('AcessarSistema', () => {
    cy.visit('/')
    cy.get(":nth-child(3) > .alt-lista-item-container")
    .should('be.visible')
    .click()
    cy.intercept('GET', '/koopon-core-rest-api/empresa/configuracoes/emissao/nota').as("AguardarPagina")
    cy.wait("@AguardarPagina").its("response.statusCode").should("be.equal", 200);
    cy.get('.alt-titulo-view-container li b')
      .should('be.visible')
  
  })


  Cypress.Commands.add('AcessarPessoas', () => {
    cy.visit('/')
      cy.get('#koopon-cabecalho-navbar-cadastro')
      .should("be.visible")
      .click({ force: true })
  cy.get('a[href="/pessoa/pessoas"]', { timeout: 30000 })
      .should("be.visible")
      .click({ force: true })
  
  })
