export class PaymentPage { 

    fillCardData(firstLastName,cardNumber,cvcCode,expirationMonth,expirationYear) { 
        cy.get('[data-qa="name-on-card"]').type(firstLastName)
        cy.get('[data-qa="card-number"]').type(cardNumber)
        cy.get('[data-qa="cvc"]').type(cvcCode)
        cy.get('[data-qa="expiry-month"]').type(expirationMonth)
        cy.get('[data-qa="expiry-year"]').type(expirationYear)
    }
    

}

export const paymmentPage = new PaymentPage()