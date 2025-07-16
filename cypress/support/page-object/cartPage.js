export class CartPage{ 

    verifyTheProductIsAvailableOnCartPage(productName) {
        cy.get('tbody').find('tr').find('td').contains(productName).as('productOnCartPage')
        cy.get('@productOnCartPage').should('be.visible')
    }
    
    deleteProductFromCartAndVerifyItsDeleted(productName) {
        cy.get('tbody')
            .find('tr')
            .find('td')
            .contains(productName)
            .parents('tr')
            .as('productRow')

        cy.get('@productRow')
            .find('td.cart_delete')
            .find('a')
            .click()

        cy.get('tbody')
            .find('tr')
            .should('not.contain', productName)
      }

}

export const cartPage = new CartPage()