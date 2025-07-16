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

Cypress.Commands.add('loginWithCredentails', (login,password) => { 
    cy.visit('/login')
    cy.get('[data-qa="login-email"]').type(login)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('searchForTheProductAndVerifyItsFound', (productName) => { 
    cy.get('input[name="search"]').type(productName)
    cy.get('#submit_search').click()
    cy.get('.single-products')
        .find('p')
        .contains(productName)
        .should('be.visible')
})

