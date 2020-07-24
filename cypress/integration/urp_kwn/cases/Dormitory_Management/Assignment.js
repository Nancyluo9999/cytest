import {Dorm_login} from '../../utils/login_method'

describe('StudentForDorm assignment',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openBedAssignment(){

        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').should('have.text','住宿管理')
        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="宿舍報到"]').should('have.text','宿舍報到')
        cy.get('[name="宿舍報到"]').click()

    }
    it('access BedAssignment page for student-check-in-or-out ', function() {

        openBedAssignment()
        cy.url().should('contains','/dormitorymanagement.web/#/student-check-in-or-out')
        cy.get('.ant-card-head-title').should('have.text','宿舍入/退住')
    
    })


    function searchBykeyword(stu_id,status){
       
        cy.get('div.ant-card-body > div:nth-child(1) > div.search-bar-item> div > div.ant-col-19 > input').clear().type(stu_id)
        cy.get('div.ant-card-body > div:nth-child(2) > div:nth-child(4) > div > div.ant-col-20 > div > div').click()
        cy.get('body > div:nth-child(8) ul > li').contains(status).should('have.text',status)
        cy.get('body > div:nth-child(8) ul > li').contains(status).click()
        cy.get(' div.ant-card-body > div:nth-child(1) > div.search-bar-item  div > div > button').should('have.text','查 詢')
        cy.get(' div.ant-card-body > div:nth-child(1) > div.search-bar-item  div > div > button').click()
    }

    let IDcode = 'WG050701'
    let stu_Name = '王大明'
    let status ='尚未報到'
    let stu_id ='BSN-2020-005-9'

    it('searh for the assigned student by using stu_id & status',function(){
        openBedAssignment()
        searchBykeyword(stu_id,status)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(9)').should('contain',stu_id)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(10)').should('contain',IDcode)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(11)').should('contain',stu_Name)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(13)').should('contain',status)

    })

    let assignedstatus ='已報到'
    // 报到操作
    it('confirm student-check-in',function(){
        openBedAssignment()
        searchBykeyword(stu_id,status)


        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(1)').click()
        cy.get('.text-center > .ant-btn-primary > label').should('have.text','(已選:1)')
        cy.get('.text-center > .ant-btn-primary > span').should('have.text','報到')
        cy.get('.text-center > .ant-btn-primary').click()
        cy.get('div.ant-modal-body .ant-modal-confirm-body .ant-modal-confirm-title').should('have.text','報到')
        cy.get('div.ant-modal-body .ant-modal-confirm-body .ant-modal-confirm-content').should('have.text','確定要報到?')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').should('have.text','確 認')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()

        searchBykeyword(stu_id,assignedstatus)


        

    })
   // 退住操作
    it('confirm student-check-out',function(){
        openBedAssignment()
        searchBykeyword(stu_id,assignedstatus)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(1)').click()
        cy.get('.text-center > .ml-10 > label').should('have.text','(已選:1)')
        cy.get('.text-center > .ml-10 > span').should('have.text','退住')
        cy.get('.text-center > .ml-10 ').click()
        cy.get('div.ant-modal-body .ant-modal-confirm-body .ant-modal-confirm-title').should('have.text','退住')
        cy.get('div.ant-modal-body .ant-modal-confirm-body .ant-modal-confirm-content').should('have.text','確定要退住?')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').should('have.text','確 認')
        cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()


        searchBykeyword(stu_id,status)

        cy.get('#div.layout-content.ant-layout-content div.ant-card-body > div.ant-table-wrapper  div.ant-table-placeholder').should('have.text','目前尚無資料')
        
    })





})