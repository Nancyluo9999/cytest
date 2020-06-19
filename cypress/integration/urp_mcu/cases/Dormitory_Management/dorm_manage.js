describe('',function() {
   

    it('open dormitory management', function() {
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title')
        .should('have.text','基礎設置')
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title').click()
        // cy.contains('基礎設置').trigger('mouseover')
        cy.contains('實習機構').trigger('mouseover').click()

    
    
    })
 

    })