export function Clinical_login() {
    cy.visit('http://urp-dev-kwn.tronclass.com.cn/clinicalpractice.web/#/login')
    cy.get('#UserId').type('wgtest')
    cy.get('#UserPassword').type('wisd@mgarden')
    cy.get('.ant-btn').click()
    cy.wait(1000)
    cy.getCookie('.AspNet.ApplicationCookie').should('exist')
    cy.url().should('include', '/clinicalpractice.web/#/home')
    cy.get('div.layout-content.ant-layout-content  div > h2').should('have.text','歡迎使用 臨床實習管理系統')   
}

// 调用此方法有登出找不到元素
export function Clinical_logout() {

    cy.get('.pull-right > li:nth-child(4) > div:nth-child(1)').should('have.text','wgtest')
    cy.get('.pull-right > li:nth-child(4) > div:nth-child(1)').trigger('mouseenter')
    cy.get('.ant-menu-submenu .ant-menu-vertical .ant-menu-item:nth-child(2)').contains('登出').should('be.visible')
    cy.get('.ant-menu-submenu .ant-menu-vertical .ant-menu-item:nth-child(2)').click()
    cy.get('.login-content > .text-left').should('have.text','臨床實習登入')
    cy.url().should('include', '/clinicalpractice.web/#/login')
}

export function logout(){
    cy.request('DELETE', 'http://urp-dev-kwn.tronclass.com.cn/clinicalpractice.web/api/Login')
    .then((Response)=>{
        expect(Response.status).to.eq(204)
    })

}