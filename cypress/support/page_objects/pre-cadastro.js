class CadastroPage {

    preCadastro(firstName, lastName) {
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').clear().type(firstName)
        cy.get('#account_last_name').clear().type(lastName)
        cy.get('.woocommerce-Button').click()
    }

}

export default new CadastroPage()