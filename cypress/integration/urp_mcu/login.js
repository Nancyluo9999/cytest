describe('login successfully', function()  {
    it('login success', function() {
        const username = "wgtest"
        const password= "wisd@mgarden"
        cy.visit('/')
        cy.get('#logUser_UserName').type(username).should('have.value',username)
        cy.get('#logUser_Password').type(password)
        cy.get('#logUser_LoginImageButton').click()
        cy.url().should('include','/soffice/MainFrameset.aspx')
        cy.getCookie('.ASPXAUTH').should('exist')
        cy.get('#ibuLogout').click()


    })
    it('login failed when  username and password is null', function() {

        cy.visit('/')
        cy.get('#logUser_LoginImageButton').click()
        cy.get('#logUser_PasswordRequired').should('have.text','*')
        
    })
    it('login login failed when username or password not match', function() {
        const username = "admin"
        const password= "1@123"
        cy.visit('/')
        cy.get('#logUser_UserName').type(username).should('have.value',username)
        cy.get('#logUser_Password').type(password)
        cy.get('#logUser_LoginImageButton').click()
        cy.get('#logUser > tbody > tr > td > table > tbody > tr:nth-child(3) > td').
        contains('帐号或密码错误，请再试试').should('be.visible')
        
        
    })
})
