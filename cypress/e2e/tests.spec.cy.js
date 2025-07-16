import { productsListPage } from '../support/page-object/productsListPage.js'
import { navigationPage } from '../support/page-object/navigationPage.js'
import { cartPage } from '../support/page-object/cartPage.js'
import { checkoutPage } from '../support/page-object/checkOutPage.js'
import { paymmentPage } from '../support/page-object/paymentPage.js'



describe('First test suite', () => {

    beforeEach(() => {
        cy.loginWithCredentails(Cypress.env('email'), Cypress.env('password'))
    })


    it('1 - Login Flow', () => {
        cy.contains('Logged in as ' + Cypress.env('userName')).should('be.visible')
        cy.contains('Logout').should('be.visible').as('logoutButton')
        cy.get('@logoutButton').click()
        cy.url().should('contain', '/login')
        // cy.wait(3000)
        cy.contains('Login to your account').should('be.visible')
    })

    it('2 - Add to Cart & Delete an item', () => {
        const firstProduct = 'Winter Top'
        const secondProduct = 'Blue Top'
        navigationPage.navigateToProductsPage()

        cy.searchForTheProductAndVerifyItsFound(firstProduct)
        productsListPage.addTheProductToTheCart(firstProduct)
        productsListPage.verifyAddedProductProceedAndClearSearchInput()

        cy.searchForTheProductAndVerifyItsFound(secondProduct)
        productsListPage.addTheProductToTheCart(secondProduct)
        productsListPage.verifyAddedProductProceedAndClearSearchInput()

        navigationPage.navigateToCartPage()

        cartPage.verifyTheProductIsAvailableOnCartPage(firstProduct)
        cartPage.deleteProductFromCartAndVerifyItsDeleted(firstProduct)
    })
})

describe('3 - Negative Login Case', () => {
    it('Negative Login', () => {
        cy.visit('/')
        cy.loginWithCredentails('wrong@mail.com', 'wrong123')
        cy.get('form').find('p').contains('Your email or password is incorrect!').should('be.visible')
    })
})


describe('4 - API Data Retrieval and UI Validation Using Public API', () => {
    it('Do request and retrieve data', () => {
        cy.request('GET', 'https://automationexercise.com/api/productsList')
            .then((response) => {
                const body = typeof response.body === 'string'
                    ? JSON.parse(response.body)
                    : response.body

                const productName = body.products[0].name
                const productPrice = body.products[0].price

                cy.loginWithCredentails(Cypress.env('email'), Cypress.env('password'))
                cy.contains('Products').click()
                cy.searchForTheProductAndVerifyItsFound(productName)
                productsListPage.addTheProductToTheCart(productName)
                productsListPage.verifyAddedProductProceedAndClearSearchInput()
                cy.get('.productinfo').then(foundProduct => { 
                    cy.wrap(foundProduct).find('p').invoke('text').then(productText => { 
                        expect(productText).to.equal(productName)
                    })
                    cy.wrap(foundProduct).find('h2').invoke('text').then(productText => {
                        expect(productText).to.equal(productPrice)
                    })
                })
            })
    })
})


describe('5 - End-to-End Checkout with Dynamic Data Validation', () => { 

    it('Flow with data from fixture', () => { 
        cy.loginWithCredentails(Cypress.env('email'), Cypress.env('password'))
        cy.fixture('productData.json').then(productData => {
            const productName = productData.productName
            navigationPage.navigateToProductsPage()
            cy.searchForTheProductAndVerifyItsFound(productName)
            productsListPage.addTheProductToTheCart(productName)
            productsListPage.verifyAddedProductProceedAndClearSearchInput()
            navigationPage.navigateToCartPage()
            cy.contains('Proceed To Checkout').click()

            checkoutPage.verifyPersonDataWithSHippingData({
                firstNameAndLastName: "Peter Parker",
                address1: "Oscorp",
                address2: "Best str",
                cityPostCodeState: "Seattle Washington 03995",
                country: "United States",
                phone:"12134234213"
            })
            cy.contains('Place Order').click()
            paymmentPage.fillCardData("Peter Parker", "9889483234", "373", "05", "2030")
            cy.get('[data-qa ="pay-button"]').click()
            cy.contains('Order Placed!').should('be.visible')
            cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
            
        })
    })

})

