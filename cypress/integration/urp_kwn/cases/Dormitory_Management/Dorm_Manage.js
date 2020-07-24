import {Dorm_login} from '../../utils/login_method'

describe('dormitory management',function() {

    beforeEach(function(){
        Dorm_login()
     })



    function openDormMenu(){
        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').should('have.text','宿舍管理')
        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.contains('宿舍樓管理').should('have.text','宿舍樓管理')
        cy.contains('宿舍樓管理').click()

    }
   

    it('access dormitory management list page ', function() {

        openDormMenu()
        cy.get('.ant-card-head-title').should('have.text','宿舍管理')
        cy.get('.ant-alert-message').should('have.text','已有房間的宿舍無法刪除, 已分配床位的宿舍無法停用。')
    
    })

    function createDormbutton(){

       cy.get('.ant-row> div.mb-5.text-right > button').should('have.text','新 增')
       cy.get('.mb-5 >.ant-btn-default').click()

    }

    function createOrUpdate(Code,Name,EnglishName){
        cy.get('.ant-modal-body').within(($any)=>{
            cy.get('#Code').clear().type(Code)
            cy.get('#Name').clear().type(Name)
            cy.get('#NameInEnglish').clear().type(EnglishName)
         })
        
        cy.get('.footer > button.ant-btn-primary').click()
    }

    function  SearchByKeyword(Code){

        // cy.get('.search-bar-item  input.ant-input').should('have.text','編號/名稱')
        cy.get('.search-bar-item  input.ant-input').type(Name)
        cy.get(' div.search-bar-item  button').click()

    }

    
    it('create dorm when all required is null ',function(){
        openDormMenu()
        createDormbutton()
        cy.get('div#rcDialogTitle0.ant-modal-title').should('have.text','宿舍管理')
        cy.get('div.ant-modal-footer button.ant-btn.ant-btn-primary').click()
        cy.get('.ant-form-explain').should('have.length',3).and(($tips) => {
            expect($tips[0].textContent,'first one').to.equal('必填')
            expect($tips[1].textContent,'second one').to.equal('必填')
            expect($tips[2].textContent,'third one').to.equal('必填')

         })
        cy.get('.footer > button.ant-btn-default').click()

    })

    let seed = Cypress._.random(1, 1000)
    let Code ='NO.'+ seed
    let Name ='新大楼'+seed
    let EnglishName='New—Build'+seed

    it('create a new dorm sucessfull',function(){
        openDormMenu()
        createDormbutton()
        createOrUpdate(Code,Name,EnglishName)
        cy.wait(500)
        cy.get('.ant-message').should('have.text','保存成功')
   


    })

    it('search the created dorm info',function(){
        openDormMenu()
        SearchByKeyword(Code)

        cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(2)').should('have.text',Code)
        cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(3)').should('have.text',Name)
        cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(4)').should('have.text',EnglishName)
        

    })

    it('update the dorm status to enabled',function(){
        openDormMenu()
        SearchByKeyword(Code)
        cy.wait(1000)

        cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(2)').should('have.text',Code)
        cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(10)').contains('啟用').click()
        cy.get('.ant-modal-content').within(($any)=>{
            cy.get('.ant-modal-confirm-body  .ant-modal-confirm-title').should('have.text','停用')
            cy.get('.ant-modal-confirm-body  .ant-modal-confirm-content').should('have.text','確認停用?')
            cy.get(' div.ant-modal-confirm-btns > button.ant-btn-primary').click()
        })

        cy.get('.ant-message').should('have.text','保存成功')
        
       
    })

    let new_Name ='新大楼'
    let new_EnglishName='New—Build'

   it('update the created dorm info', function(){
    openDormMenu()
    SearchByKeyword(Code)
    cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(11) > button.ant-btn-primary').click()
    createOrUpdate(Code,Name,EnglishName)
    cy.get('.ant-message').should('have.text','保存成功')

   })

   it('delect the updated dorm info', function(){
    openDormMenu()
    SearchByKeyword(Code)
    cy.wait(500)
    cy.get('.ant-table-tbody>.ant-table-row > td:nth-child(11) > button.ant-btn-danger').click()
    cy.get('.ant-modal-confirm-btns > .ant-btn-danger').click()
    // cy.get('.ant-message').should('have.text','删除成功')

    cy.get('.ant-table-placeholder').should('have.text','目前尚無資料')


   })


   



})