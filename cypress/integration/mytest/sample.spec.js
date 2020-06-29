describe('network request', function() {
  it('test',function(){

  cy.visit('http://urp-dev-kwn.tronclass.com.cn/clinicalpractice.web/#/login')
  cy.get('#UserId').type('wgtest')
  cy.get('#UserPassword').type('wisd@mgarden')
  cy.get('.ant-btn').click()
  cy.wait(1000)
  cy.getCookie('.AspNet.ApplicationCookie').should('exist')
  cy.url().should('include', '/clinicalpractice.web/#/home')
  cy.get('div.layout-content.ant-layout-content  div > h2').should('have.text','歡迎使用 臨床實習管理系統') 

  let Seed = Cypress._.random(1, 1000)
  let Name='南希场地—'+Seed
  let EnglishName='Nancytest—'+Seed
  const limitnum =7


  cy.get('[name="基礎設置"] > .ant-menu-submenu-title').should('have.text','基礎設置')
  cy.get('[name="基礎設置"]').trigger('mouseenter')
  cy.get('.ant-menu-item').contains('實習場地').should('be.visible')
  cy.get('.ant-menu-item').contains('實習場地').click()

  cy.get('.mb-5 >.ant-btn-default').click()
  cy.get('#rcDialogTitle0').contains('場地設置').should('be.visible')
  cy.get('div.ant-modal-body > form > div:nth-child(1) .select-item > div > div').click()
  cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li ').last().click()
  cy.get('div.ant-modal-body > form > div:nth-child(2) .select-item > div > div').click()
  cy.get('li.ant-select-dropdown-menu-item:nth-child(5)').click({force: true} )
  // cy.get('.ant-select-dropdown--single:nth-of-type(1) ul > li').last().click()

  
           
  cy.get('div.ant-form-item:nth-child(3)').type(Name)
  cy.get('div.ant-form-item:nth-child(4)').type(EnglishName)
  cy.get('div.ant-row:nth-child(6)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(7)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(8)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(9)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(10)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(11)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(12)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
  cy.get('div.ant-row:nth-child(13)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)

 
  

  cy.get('.footer > .ant-btn-primary').click()
  cy.get('.ant-message').should('have.text','保存成功')
})

})  