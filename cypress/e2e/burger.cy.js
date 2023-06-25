import {INGREDIENTS_URL, LOGIN_URL, ORDER_URL} from "./test-constants";

describe('service is available', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-testid=ingredients-list').children('div').as('ingredientList')
    })

    it('should be available', () => {
        cy.get('@ingredientList').should('exist')
    })

    it('should has ingredients', () => {
        cy.get('@ingredientList').should('have.length.at.least', 2)
    })
})

describe('ingredient modal works', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-testid=ingredients-list').children('div').as('ingredientList')

        cy.get('@ingredientList').eq(0).as('testIngredient')

        cy.get('@testIngredient').click()
    })

    it('should be', () => {
        cy.get('[data-testid=modal]').should('be.visible')
    })

    it('has elements', () => {
        cy.get('[data-testid=ingredientHeader]').should('exist')
        cy.get('[data-testid=ingredientImage]').should('exist')
        cy.get('[data-testid=ingredientName]').should('exist')
    })

    it('close button should work', () => {
        cy.get('[data-testid=close-modal]').should('exist').click()
        cy.get('[data-testid=modal]').should('not.exist')
    })
})

describe('drag works', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-testid=ingredients-list').children('div').as('ingredientList')
    })

    it('should move ingredients from ingredient list to basket', () => {
        const dataTransfer = new DataTransfer()

        cy.get('@ingredientList').eq(0).trigger('dragstart', {dataTransfer})
        cy.get('[data-testid=burgerConstructor]').trigger('drop', {dataTransfer})

        cy.get('[data-testid=constructorElement]').should('exist')
    })
})

describe('order works', () => {
    beforeEach(() => {
        cy.intercept('GET', INGREDIENTS_URL, {fixture: 'ingredients.json'})

        cy.intercept('POST', LOGIN_URL, {
            fixture: 'user.json'
        }).as('postLogin')


        cy.visit('/login')

        cy.get('[type=email]').type(`test@test.com`)
        cy.get('[type=password]').type(`testtesttest`)

        cy.get('[type=submit]').click()

        cy.wait("@postLogin")

        cy.get('[data-testid=ingredients-list').children('div').as('ingredientList')

        const dataTransfer = new DataTransfer()
        cy.get('@ingredientList').eq(0).trigger('dragstart', {dataTransfer})
        cy.get('[data-testid=burgerConstructor]').trigger('drop', {dataTransfer})

        cy.intercept('POST', ORDER_URL, {fixture: 'order.json'})
        cy.get('[data-testid=orderButton]').click()
    })

    it('should show order modal', () => {
        cy.get('[data-testid=modal]').should('be.visible');
    })

    it('should have order number', () => {
        cy.get('[data-testid=orderNumber').should('have.text', '42')
    })

    it('should close', () => {
        cy.get('[data-testid=close-modal]').should('exist').click()
        cy.get('[data-testid=modal]').should('not.exist')
    })
})