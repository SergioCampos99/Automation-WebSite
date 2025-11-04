// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('/login')
    cy.get('[data-qa="login-email"]').type(Cypress.env("email"), {force:true, delay:100});
    cy.get('[data-qa="login-password"]').type(Cypress.env("password"), {force:true, delay:100});
    cy.get('[data-qa="login-button"]').click();
    
    //Este metodo lo llamaremos las veces que necesitemos hacer un log in, ya que seran bastantes pero no en todos los test. Por eso lo escribimos aqui, y no hacemos un beforeEach
})

Cypress.Commands.add('cardInfo', () =>{
  cy.visit('/payment')
  cy.get('[data-qa="name-on-card"]').type(Cypress.env('name'), {force:true, delay:100})
  cy.get('[data-qa="card-number"]').type("ES299876546376532435", {force:true, delay:100})
  cy.get('[data-qa="cvc"]').type("369")
  cy.get('[data-qa="expiry-month"]').type("01")
  cy.get('[data-qa="expiry-year"]').type("2029")
  cy.get('[data-qa="pay-button"]').click()
  cy.get('.col-sm-9 > p').contains("Congratulations! Your order has been confirmed!").should('be.visible')
})