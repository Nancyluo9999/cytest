import { login, login_out } from "../../utils/login_method"

describe('',function() {
    beforeEach(function(){
        login()
    })
    afterEach(function () {
        login_out
   })
    it('open dormitory management', function() {
        cy.get('#mainMenu  li:nth-child(19) > a').should('have.text','宿舍管理').click()
        cy.wait(2000)
    
    })
 

    })