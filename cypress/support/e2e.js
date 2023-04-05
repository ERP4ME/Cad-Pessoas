
// Import commands.js using ES2015 syntax:
import './commands'
import './gui-login'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

Cypress.on('uncaught:exception', (err, runnable, promise) => {
  if (promise) {
    return false
  }

})

