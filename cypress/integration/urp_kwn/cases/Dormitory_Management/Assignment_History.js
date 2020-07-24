import {Dorm_login} from '../../utils/login_method'

describe('StudentForDorm assignment',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openAssignmentHistory(){

        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').should('have.text','住宿管理')
        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="歷史住宿記錄"]').should('have.text','歷史住宿記錄')
        cy.get('[name="歷史住宿記錄"]').click()

    }
    it('access to assignment page ', function() {

        openAssignmentHistory()
        cy.url().should('contains','dormitorymanagement.web/#/assignment-history')
        cy.get('.ant-card-head-title').should('have.text','歷史住宿記錄')
    
    })


    function searchBykeyword(stu_id){
       
        cy.get('.ant-col-md-5 > .ant-row-flex > .ant-col-18 > .select-item').clear().type(stu_id)
        cy.get('div.ant-card-body > div:nth-child(2) > div:nth-child(4) > div > div > button').should('have.text','查 詢')
        cy.get('.ant-btn').click()
    }

    let IDcode = 'WG050701'
    let stu_Name = '王大明'
    let stu_id ='BSN-2020-005-9'

    it('searh assignment history by using stu_id',function(){
        openAssignmentHistory()
        searchBykeyword(stu_id)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(4)').should('contain',stu_id)
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td:nth-child(5)').should('contain',stu_Name)

    })


})