export class NavigationPage { 

    navigateToCartPage() { 
        cy.get('.navbar-nav li').find('a').contains(' Cart').click()
    }

    navigateToProductsPage() {
        cy.get('.navbar-nav li').find('a').contains(' Products').click()
    }
}

export const navigationPage = new NavigationPage();