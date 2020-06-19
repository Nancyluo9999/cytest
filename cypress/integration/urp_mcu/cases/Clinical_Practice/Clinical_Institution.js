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

    function openInstitutionMenu(){
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title').should('have.text','基礎設置')
        cy.get('[name="基礎設置"]').trigger('mouseenter')
        cy.get('.ant-menu-item').contains('實習機構').should('be.visible')
        cy.get('.ant-menu-item').contains('實習機構').click()
    }

    function createbutton(){

        cy.get('.mb-5.text-right >[type=button]').click()
        cy.get('#rcDialogTitle0').contains('機構設置').should('be.visible')
    }

    function createOrUpdateInstitution(Name,ShortName,EnglishName){

        cy.get('.ant-modal-body').within(($any) =>{
            cy.get('form').within(($any)=>{
                cy.get('#Name').type(Name)
                cy.get('#ShortName').clear().type(ShortName)
                cy.get('#EnglishName').clear().type(EnglishName)
            })
            
        })
        cy.get('.footer > .ant-btn-primary').click()
            
    }

    it('Acesses to clinical institution list page', function() {
        openInstitutionMenu()
        cy.get('.ant-card-head-title').should('have.text','機構管理')
        cy.url().should('contain', '/clinicalpractice.web/#/institution')
    })
   
    it('add clinical institution when all required is null', function() {
        openInstitutionMenu()
        createbutton()
        cy.get('.ant-modal-content').within(($any) =>{ 
            cy.get('.footer > .ant-btn-primary').click()
            cy.get('.ant-form-explain').should('have.length',3)
               .and (($tips) =>{
                expect($tips[0].textContent, 'first item').to.equal('必填')
                expect($tips[1].textContent, 'first item').to.equal('必填')
                expect($tips[2].textContent, 'first item').to.equal('必填')
               })
            cy.get('.footer >.ant-btn-primary').click()

        })
    })

    let Seed = Cypress._.random(1, 1000)
    let Name ='nancy测试'+ Seed
    let ShortName='机构_'+Name
    let EnglishName='institution_' +Name
    
    it('add clinical institution successful', function() {
        openInstitutionMenu()
        createbutton()
        createOrUpdateInstitution(Name,ShortName,EnglishName)
        cy.get('.ant-message > span').should('have.text','保存成功')
    })

    it('change institution to unabled ',function(){
        openInstitutionMenu()
        // 查找新增的机构数据
        cy.get('.ant-table-tbody tr:nth-child(1)').should('contain','nancy测试')
        cy.get('.ant-table-tbody tr:nth-child(1) .mr-20').contains('啟用').click()
        cy.get(' div.ant-modal-content  div.ant-modal-confirm-body > span').should('have.text','停用機構')
        cy.get('.ant-modal-confirm-btns > button.ant-btn-primary').click()
        cy.get('body > div.ant-message').should('have.text','保存成功')
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(10)').contains('停用').click()
    })
    let newname ='new_'+ Name
    it('update clinical institution info', function(){
        openInstitutionMenu()
        cy.get('.ant-table-tbody').should('contain',Name)
        cy.get('table > tbody > tr:nth-child(1)  button.ant-btn-primary').click()
        cy.get('#rcDialogTitle0').contains('機構設置').should('be.visible')
        cy.get('.ant-modal-body').within(($any) =>{
                cy.get('#Name').clear().type(newname)
                cy.get('#ShortName').clear().type('new_'+ ShortName)
                cy.get('#EnglishName').clear().type('new_'+ EnglishName)
            }) 
        cy.get('.footer > .ant-btn-primary').click()
        cy.wait(500)
        cy.get('body > div.ant-message').should('have.text','保存成功')
        cy.get('.ant-table-tbody').should('contain',newname)

    })

    it('delete clinical institution', function(){
        openInstitutionMenu()
        cy.get('table > tbody > tr:nth-child(1)  .ant-btn.ant-btn-danger.ant-btn-sm').click()
        cy.get('.ant-modal-confirm-content').should('have.text','確認要刪除機構？')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
        cy.get('.ant-message').should('have.text','刪除成功')
        cy.wait(3000)

      })

})
