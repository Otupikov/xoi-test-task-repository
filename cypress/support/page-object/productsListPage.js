export class ProductsListPage {

    addTheProductToTheCart(productName) {
        cy.get('.productinfo').as('productInfo')
            .find('p')
            .contains(productName)
            .parent('.productinfo')
            .find('.add-to-cart')
            .click()
    }

    verifyAddedProductProceedAndClearSearchInput() {
        cy.get('.modal-content').find('h4').contains('Added!')
        cy.get('button').contains('Continue Shopping').should('be.visible').click()
        cy.get('input[name="search"]').clear()
    }
}

export const productsListPage = new ProductsListPage();