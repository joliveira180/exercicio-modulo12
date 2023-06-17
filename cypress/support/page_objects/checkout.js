class Checkout{

    fazerCheckout(){
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        cy.get('#payment_method_cod').check()
        cy.get('#terms').check()
        cy.get('#place_order').click()
    }
}

export default new Checkout()