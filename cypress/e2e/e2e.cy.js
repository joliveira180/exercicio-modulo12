/// <reference types="cypress" />


import checkout from '../support/page_objects/checkout';
import enderecos from '../support/page_objects/enderecos';
import preCadastro from '../support/page_objects/pre-cadastro';
import produtos from '../support/page_objects/produtos';

const Faker = require('faker/lib');
var faker = require('faker');
const dadosLogin = require('../fixtures/perfil.json')
const dadosEndereco = require('../fixtures/endereco.json')
const dadosProduto = require('../fixtures/produtos.json')



context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta/')
    });

    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4
        let nome = faker.name.firstName()
        let sobrenome = faker.name.lastName()


        cy.login(dadosLogin.usuario, dadosLogin.senha)
        cy.get('.page-title').should('contain', 'Minha conta')

        preCadastro.preCadastro(nome, sobrenome)
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

        enderecos.editarEnderecoEntrega(
            dadosEndereco[0].nome,
            dadosEndereco[0].sobrenome,
            dadosEndereco[0].empresa,
            dadosEndereco[0].pais,
            dadosEndereco[0].endereco,
            dadosEndereco[0].numero,
            dadosEndereco[0].cidade,
            dadosEndereco[0].estado,
            dadosEndereco[0].cep
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        enderecos.editarEnderecoFaturmento(
            dadosEndereco[0].nome,
            dadosEndereco[0].sobrenome,
            dadosEndereco[0].empresa,
            dadosEndereco[0].pais,
            dadosEndereco[0].endereco,
            dadosEndereco[0].numero,
            dadosEndereco[0].cidade,
            dadosEndereco[0].estado,
            dadosEndereco[0].cep,
            dadosEndereco[0].telefone,
            dadosEndereco[0].email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')


        produtos.adicionarProduto(
            dadosProduto.nome,
            dadosProduto.tamanho,
            dadosProduto.cor,
            quantidade
        )
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “' + dadosProduto.nome + '” foram adicionados no seu carrinho.')

        checkout.fazerCheckout()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', 0)
    });


})