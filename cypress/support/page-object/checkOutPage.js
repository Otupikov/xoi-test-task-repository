export class CheckoutPage { 

    

    verifyPersonDataWithSHippingData({firstNameAndLastName, address1, address2, cityPostCodeState, country, phone}) { 
        cy.get('#address_delivery li').eq(1).invoke('text').then(data => {
            expect(data.trim()).to.equal('Mr. ' + firstNameAndLastName)
        })
        cy.get('#address_delivery li').eq(2).invoke('text').then(data => {
            expect(data.trim()).to.equal(address1)
        })

        cy.get('#address_delivery li').eq(3).invoke('text').then(data => {
            expect(data.trim()).to.equal(address2)
        })

        cy.get('#address_delivery li').eq(5).invoke('text').then(data => {
            const cleanText = data.replace(/\s+/g, ' ').trim();
            expect(cleanText).to.equal(cityPostCodeState)
        })

        cy.get('#address_delivery li').eq(6).invoke('text').then(data => {
            expect(data.trim()).to.equal(country)
        })

        cy.get('#address_delivery li').eq(7).invoke('text').then(data => {
            expect(data.trim()).to.equal(phone)
        })
    }
}

export const checkoutPage = new CheckoutPage()