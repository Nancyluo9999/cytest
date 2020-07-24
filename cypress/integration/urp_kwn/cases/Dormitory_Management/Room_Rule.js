import {Dorm_login} from '../../utils/login_method'

describe('Roommanagement',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openRoomRuleMenu(){

        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').should('have.text','宿舍管理')
        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="宿舍規則"]').should('have.text','宿舍規則')
        cy.get('[name="宿舍規則"]').click()

    }
    it('access room_rule management  page ', function() {

        openRoomRuleMenu()
        cy.url().should('contains','dormitorymanagement.web/#/room-rule')
        cy.get('.ant-card-head-title').should('have.text','宿舍規則')
    
    })


    function searchByRoomCode(dorm,roomcode){
        cy.get('div.ant-card-body > div.mb-10.ant-row > div:nth-child(2) > div > div.ant-col-19').click()
        // cy.get('ul > li:nth-child(8)').should('have.text','瑞园')
        cy.get('ul > li').contains(dorm).should('have.text',dorm)
        cy.get('ul > li').contains(dorm).click()
        cy.get('.select-item.ant-input').should('have.attr', 'placeholder', '房號')
        cy.get('.select-item.ant-input').clear().type(roomcode)
        cy.get('.ant-col-24 >.ant-btn-primary').should('have.text','查 詢')
        cy.get('.ant-col-24 >.ant-btn-primary').click()
        cy.wait(1000)

    
    }

    let dorm = '瑞园'
    it('searh for the room-rule by using room and roomcode(is null)',function(){
        openRoomRuleMenu()
        //传入空格,按照一个条件查询
        searchByRoomCode(dorm,' ')
        cy.get('.ant-table-body').find('tbody').find('tr').should('have.length',2)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(4)').should('contain',dorm)

    })

    function setUpRule(System,Grade){

        cy.get('#Gender > .ant-radio-wrapper:nth-child(1) > span > input ').should('have.value','M')
        cy.get('#Gender > .ant-radio-wrapper:nth-child(2) > span > input ').should('have.value','F')
        cy.get('#Gender > .ant-radio-wrapper:nth-child(2) > span > input ').check()
        cy.get('#System ').click()
        cy.get('body > div:nth-child(11) > div > div >div > ul > li').contains(System).should('have.text',System)
        cy.get('body > div:nth-child(11) > div >div >div > ul > li').contains(System).click()
        // cy.get('body > div:nth-child(11) > div > div  ul>li[title="專科"]').click()

        cy.get('#CollId > .ant-select-selection').click() 
        cy.get('div#rc-tree-select-list_1 > ul >li >ul>li>ul>li>ul>li>.ant-select-tree-node-content-wrapper-normal').contains('護理學學士學位課程').should('have.text','(BSN)護理學學士學位課程')
        cy.get('div#rc-tree-select-list_1 > ul >li >ul>li>ul>li>ul>li>.ant-select-tree-node-content-wrapper-normal').prev().last().click()
        cy.get('.ant-modal-body').click()

        cy.get('#Grade').click()
        cy.get('body > div:nth-child(13) > div > div ul>li').contains(Grade).should('have.text',Grade)
        cy.get('body > div:nth-child(13) > div > div ul>li').contains(Grade).click()

        cy.get('.footer > .ant-btn-primary').click()
        
    }

    let System='專科'
    let Grade='2'
    
    it('single setup the room-rule ',function(){
        const roomcode ='101'
        openRoomRuleMenu()
        //传入空格,按照一个条件查询
        searchByRoomCode(dorm,'101')
        cy.get('.ant-table-body').find('tbody').find('tr').should('have.length',1)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(4)').should('contain',dorm)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(6)').should('contain',roomcode)
        cy.get('[data-row-key="28"] > :nth-child(9) > .mr-10').click()
        cy.get('#rcDialogTitle0').should('have.text','規則設置').and('have.class','ant-modal-title')

        setUpRule(System,Grade)

        cy.get('.ant-table-body').find('tbody').find('td:nth-child(8)').should('contain',System)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(8)').should('contain',Grade)



    })



    function BatchSetUpRule(System,Grade){

        cy.get('div.ant-card-body table > thead > tr > th.ant-table-selection-column').click()
        cy.get('div.ant-card-body  table > tbody > tr:nth-child(1) > td.ant-table-selection-column > span > label > span ').should('have.class','ant-checkbox-checked')
        cy.get('.mt-10 > button.ant-btn-primary').should('contain','批量設置')
        cy.get('.ant-btn > label').should('have.text','(已選:2)')
        cy.get('.mt-10 > button.ant-btn-primary').should('contain','批量設置').click()
        cy.get('#rcDialogTitle0').should('have.text','規則設置').and('have.class','ant-modal-title')

        cy.get('#Gender > .ant-radio-wrapper:nth-child(1) > span > input ').should('have.value','M')
        cy.get('#Gender > .ant-radio-wrapper:nth-child(2) > span > input ').should('have.value','F')
        cy.get('#Gender > .ant-radio-wrapper:nth-child(1) > span > input ').check()
        
        cy.get('#System .ant-select-selection-selected-value').should('have.text','全部')
        cy.get('#System ').click()
        cy.get('body > div:nth-child(10) > div > div >div > ul > li').contains(new_System).should('have.text',new_System)
        cy.get('body > div:nth-child(10) > div >div >div > ul > li').contains(new_System).click()
        
        // cy.get(':nth-child(3) > .ant-col-18 > .ant-form-item-control').click()
        // cy.get('#CollId > .ant-select-selection').click() 
        // cy.get('div#rc-tree-select-list_1 > ul >li >ul>li>ul>li>ul>li>.ant-select-tree-node-content-wrapper-normal').contains('護理學學士學位課程').should('have.text','(BSN)護理學學士學位課程')
        // cy.get('div#rc-tree-select-list_1 > ul >li >ul>li>ul>li>ul>li>.ant-select-tree-node-content-wrapper-normal').prev().last().click()
        // cy.get('.ant-modal-body').click()

        cy.get('#Grade .ant-select-selection-selected-value').should('have.text','全部')
        cy.get('#Grade').click()
        cy.get('body > div:nth-child(11) > div > div ul>li').contains(new_Grade).should('have.text',new_Grade)
        cy.get('body > div:nth-child(11) > div > div ul>li').contains(new_Grade).click()

        cy.get('.footer > .ant-btn-primary').click()

    }
    let new_System='學士'
    let new_Grade='1'
    it('Batch setup the room-rule ',function(){
        openRoomRuleMenu()
        //传入空格,按照一个条件查询
        searchByRoomCode(dorm,' ')
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(4)').should('contain',dorm)
        cy.get('div.ant-card-body  table > tbody > tr ').should('have.length',2)

        BatchSetUpRule(new_System,new_Grade)
        
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(8)').should('contain',new_System)
        cy.get('.ant-table-body').find('tbody').find('td:nth-child(8)').should('contain',new_Grade)
        



    })


})