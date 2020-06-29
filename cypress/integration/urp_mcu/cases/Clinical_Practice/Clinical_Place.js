import {Clinical_login} from '../../utils/login_method'
import {logout} from  '../../utils/login_method'
import {getCurrentTime} from  '../../utils/common'

describe('ClinicalInstitution',function() {

    beforeEach(function(){
       Clinical_login()
    })

    afterEach(function () {
       logout()
    
    })

    function openPlaceMenu(){
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title').should('have.text','基礎設置')
        cy.get('[name="基礎設置"]').trigger('mouseenter')
        cy.get('.ant-menu-item').contains('實習場地').should('be.visible')
        cy.get('.ant-menu-item').contains('實習場地').click()
    }

    function createbutton(){
        cy.get('.ant-card-body .mb-5 >.ant-btn-default').should('contain.text','新增')
        cy.get('.mb-5 >.ant-btn-default').click()
        cy.get('#rcDialogTitle0').contains('場地設置').should('be.visible')
    }

    function createOrUpdatePlace(Name,EnglishName,limitnum){

        cy.get('div.ant-modal-body > form > div:nth-child(1) .select-item > div > div').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li').last().should('have.text','澳門鏡湖醫院')
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li').last().click()
        cy.get('div.ant-modal-body > form > div:nth-child(2) .select-item > div > div').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1) ul > li').last().should('have.text','社區')
        cy.get('.ant-select-dropdown--single:nth-of-type(1) ul > li').last().click()

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
            
    }


    it('Acesses to clinical place list page', function() {
        openPlaceMenu()
        cy.get('.ant-card-head-title').should('have.text','實習場地管理')
        cy.url().should('contain', '/clinicalpractice.web/#/placeManagement')

    })

    it('create clinical place when all required is null ', function() {
        openPlaceMenu()
        createbutton()
        cy.get('.ant-modal-content').within(($any) =>{
            cy.get('.footer > .ant-btn-primary').click()
            cy.get('.ant-form-explain').should('have.length',10).and(($tips)=>{
                expect($tips[0].textContent, 'first item').to.equal('必填')
                expect($tips[1].textContent, 'first item').to.equal('必填')
                expect($tips[2].textContent, 'first item').to.equal('必填')
                expect($tips[3].textContent, 'first item').to.equal('必填')
                expect($tips[4].textContent, 'first item').to.equal('必填')
                expect($tips[5].textContent, 'first item').to.equal('必填')
                expect($tips[6].textContent, 'first item').to.equal('必填')
                expect($tips[7].textContent, 'first item').to.equal('必填')
                expect($tips[8].textContent, 'first item').to.equal('必填')
                expect($tips[9].textContent, 'first item').to.equal('必填')

                })
        
        })
        cy.get('.footer > .ant-btn-default').click()

    })
    let Seed = Cypress._.random(1, 1000)
    let Name='南希场地—'+Seed
    let EnglishName='Nancytest—'+Seed
    

    it('create clinical place sucessful',function(){
        openPlaceMenu()
        createbutton()
        const limitnum =9
        createOrUpdatePlace(Name,EnglishName,limitnum)


    })

    function searchByName(name){
        cy.get('div.search-bar-item:nth-child(3) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)').clear().type(name)
        cy.get('div.search-bar-item:nth-child(4)').should('contain.text','查 詢')
        cy.get('div.search-bar-item:nth-child(4)').click()

    }

    it('search place by name',function(){
        openPlaceMenu()
        searchByName(Name)
        cy.get('.ant-table-row > td:nth-child(4)').should('have.text',Name)


    })

    // 修改场地状态为停用
   it('update instructor status to enbaled',function() {
    openPlaceMenu()
    searchByName(Name)
    cy.get('.ant-table-row > td:nth-child(4)').should('have.text',Name)
    cy.get('.mr-20').contains('啟用').click()
    
    cy.get('div.ant-modal-content  .ant-modal-confirm-body .ant-modal-confirm-title').should('have.text','停用場地')
    cy.get('div.ant-modal-content  .ant-modal-confirm-body  .ant-modal-confirm-content').should('have.text','確認停用場地？')

    cy.get('.ant-modal-confirm-btns >.ant-btn-primary').click()
    cy.get('.mr-20').contains('停用')

    
})

let new_Name='new_南希场地—'+Seed
let new_EnglishName='new_Nancytest—'+Seed

it('update the created place', function(){
    const limitnum = 8
    openPlaceMenu()
    searchByName(Name)
    cy.wait(1000)
    cy.get('td:nth-child(15) > .mr-10.ant-btn-primary').click()
    // cy.get('.ant-table-row .td:nth-child(15) > .mr-10.ant-btn-primary').click()
    cy.get('#rcDialogTitle0').contains('場地設置').should('be.visible')

    cy.get('.ant-modal-body').within(($any) =>{
          
        cy.get('div.ant-form-item:nth-child(3) input:nth-child(1)').clear().type(new_Name)
        cy.get('div.ant-form-item:nth-child(4) input:nth-child(1)').clear().type(new_EnglishName)
        cy.get('div.ant-row:nth-child(6)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(7)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(8)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(9)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(10)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(11)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(12)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
        cy.get('div.ant-row:nth-child(13)  div:nth-child(2) > input:nth-child(1)').clear().type(limitnum)
      
        })


    cy.get('.footer > .ant-btn-primary').click()
    cy.get('.ant-message').should('have.text','保存成功')

    cy.get('.ant-table-row > td:nth-child(4)').should('have.text',new_Name)


})


it('delete the created place', function(){
    openPlaceMenu()
    searchByName(new_Name)
    cy.wait(1000)
    cy.get('.ant-btn-danger').click()
    cy.get('.ant-modal-body   .ant-modal-confirm-body  .ant-modal-confirm-title').should('have.text','刪除場地')
    cy.get('.ant-modal-body   .ant-modal-confirm-body  .ant-modal-confirm-content').should('have.text','確認要刪除場地？')
    cy.get('.ant-modal-body  .ant-modal-confirm-btns > .ant-btn-primary').click()
    cy.get('.ant-message').should('have.text','刪除成功')

    cy.get('.ant-table-placeholder').should('have.text','目前尚無資料')

})

})