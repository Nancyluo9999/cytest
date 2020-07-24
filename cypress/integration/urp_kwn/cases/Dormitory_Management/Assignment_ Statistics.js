import {Dorm_login} from '../../utils/login_method'

describe('StudentForDorm assignment',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openAssignmentHistory(){

        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').should('have.text','住宿管理')
        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="住宿統計"]').should('have.text','住宿統計')
        cy.get('[name="住宿統計"]').click()

    }
    it('access to assignment page ', function() {

        openAssignmentHistory()
        cy.url().should('contains','/dormitorymanagement.web/#/room-statistics')
        cy.get('.ant-card-head-title').should('have.text','住宿統計')
    
    })


    function searchBykeyword(Dorm,floor,roomNum){
       cy.get('div.ant-card-body > div.mb-10> div:nth-child(2) > div > div.ant-col-19 > div').click()
       cy.get('body > div:nth-child(8) ul >li ').contains(Dorm).click()
       cy.get('div.ant-card-body > div.mb-10> div:nth-child(3) > div > div.ant-col-19 > div').click()
       cy.get('body > div:nth-child(9) ul >li ').contains(floor).click()
       cy.get('.ant-col-18 > .select-item').clear().type(roomNum)
       cy.get('.ant-col-24 > .ant-btn').click()
       
       
    }

    let Dorm='瑞园'
    let floor='1'
    let roomNum='101'

    it('searh assignment history by using stu_id',function(){
        openAssignmentHistory()
        searchBykeyword(Dorm,floor,roomNum)
        cy.get('.ant-table-body-inner > .ant-table-fixed > .ant-table-tbody > .ant-table-row > [rowspan="1"]').should('contain',Dorm)
        cy.get('.ant-table-body-inner > .ant-table-fixed > .ant-table-tbody > .ant-table-row > :nth-child(3)').should('contain',floor)
        cy.get('.ant-table-body-inner > .ant-table-fixed > .ant-table-tbody > .ant-table-row > :nth-child(4)').should('contain',roomNum)
        cy.get('.ant-table-footer > div > div > div:nth-child(1)').should('have.text','合計')
        cy.get('.ant-table-footer > div > div > div:nth-child(2)').contains('可用床位: 4 剩餘床位: 2')
    })

})