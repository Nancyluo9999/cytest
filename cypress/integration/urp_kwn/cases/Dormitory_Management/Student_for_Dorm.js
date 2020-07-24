import {Dorm_login} from '../../utils/login_method'

describe('StudentForDorm assignment',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openStudentForDorm(){

        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').should('have.text','住宿管理')
        cy.get('[name="住宿管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="住宿分配"]').should('have.text','住宿分配')
        cy.get('[name="住宿分配"]').click()

    }
    it('access StudentForDorm assignment page ', function() {

        openStudentForDorm()
        cy.url().should('contains','/dormitorymanagement.web/#/assignment')
        cy.get('.ant-card-head-title').should('have.text','住宿分配')
    
    })


    function searchByRoomCode(IDcode,status){
       
        cy.get('div.ant-card-body > div:nth-child(1) > div.search-bar-item > div > div.ant-col-22 > span > span > ul').click()
        cy.get('#rc-tree-select-list_1 > ul > li > ul > li > span.ant-select-tree-checkbox').click()
        cy.wait(100)
        // cy.get('#rc-tree-select-list_1 > ul > li > ul > li > ul > li:nth-child(1) > span.ant-select-tree-node-content-wrapper-normal').contains('護理學學士學位課程').should('have.text','(BSN)護理學學士學位課程')
        // cy.get('#rc-tree-select-list_1 > ul > li > ul > li > ul > li:nth-child(1) > span.ant-select-tree-checkbox').click()
        // cy.get('#rc-tree-select-list_1 > ul > li > ul > li > ul > li:nth-child(6) > span.ant-select-tree-node-content-wrapper-normal').contains('(PDAN)護理學專科深造課程').should('have.text','(PDAN)護理學專科深造課程')
        // cy.get('#rc-tree-select-list_1 > ul > li > ul > li > ul > li:nth-child(6) > span.ant-select-tree-checkbox').click()
        
        cy.get('div.ant-card-body > div:nth-child(1) > div:nth-child(3) > div > div.ant-col-20 > div > div').click()
        cy.get('body > div:nth-child(9) > div > div ul>li').contains(status).click()
        cy.get('.select-item.ant-input').should('have.attr', 'placeholder', '學號/證件編號/姓名/房號')
        cy.get('.select-item.ant-input').clear().type(IDcode)
        cy.get('.ant-col-24 >.ant-btn-primary').should('have.text','查 詢')
        cy.get('.ant-col-24 >.ant-btn-primary').click()
        cy.wait(1000)

    
    }

    let IDcode = '7654321'
    let status ='尚未分配'
    let stu_id ='PDAN-2020-013-7'
    it('searh for the assigned student by using idcode & status',function(){
        openStudentForDorm()
        //传入空格,按照一个条件查询
        searchByRoomCode(IDcode,status)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(5)').should('contain',IDcode)
        cy.get('.ant-table-row > :nth-child(14)').should('have.text',status)

    })

    it('assign the room bed to selected student ',function(){
        openStudentForDorm()
        //传入空格,按照一个条件查询
        searchByRoomCode(IDcode,status)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(5)').should('contain',IDcode)
        cy.get('.ant-table-row > :nth-child(14)').should('have.text',status)
        cy.get('.ant-table-row > :nth-child(4)').should('have.text',stu_id)
        cy.get('.ant-table-row > :nth-child(15) > button.mr-10').click()

        cy.get(' #rcDialogTitle0').should('have.text','住宿分配')
        cy.get('#StudId').should('have.value',stu_id).and('have.attr','disabled',"disabled")
        cy.get('#Floor > .ant-select-selection > .ant-select-selection__rendered').click()
        cy.get('body > div:nth-child(12) ul > li:nth-child(2)').click()
        cy.get('.footer > .ant-btn-primary').click()

        cy.get('div.ant-modal-body .ant-modal-confirm-title').should('have.text','確認加入')
        cy.get('div.ant-modal-body div.ant-modal-confirm-btns > button.ant-btn.ant-btn-primary').click()

        cy.get('.ant-message').should('have.text','分配成功')



    })

    let assigned_status ='已分配'
    it('clear the assigned room bed to selected student ',function(){
        openStudentForDorm()
        //传入空格,按照一个条件查询
        searchByRoomCode(IDcode,assigned_status)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(5)').should('contain',IDcode)
        cy.get('.ant-table-row > :nth-child(14)').should('have.text',assigned_status)
        cy.get('.ant-table-row > :nth-child(4)').should('have.text',stu_id)
        cy.get('.ant-table-row > :nth-child(15) > button.ant-btn-danger').click()

        cy.get('div.ant-modal-body .ant-modal-confirm-title').should('have.text','確認清空')
        cy.get('div.ant-modal-body div.ant-modal-confirm-btns > button.ant-btn.ant-btn-primary').click()

        cy.get('.ant-message').should('have.text','清空成功')
        

    })






})