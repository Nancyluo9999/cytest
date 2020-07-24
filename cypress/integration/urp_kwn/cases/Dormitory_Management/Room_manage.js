import {Dorm_login} from '../../utils/login_method'

describe('Roommanagement',function(){

    beforeEach(function(){

        Dorm_login()

    })



    function openRoomMenu(){

        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').should('have.text','宿舍管理')
        cy.get('[name="宿舍管理"] > .ant-menu-submenu-title').trigger('mouseenter')
        cy.get('[name="房間管理"]').should('have.text','房間管理')
        cy.get('[name="房間管理"]').click()

    }

    function searchByKeyword(keyword){

        cy.get('.select-item.ant-input').should('have.attr', 'placeholder', '房號')
        cy.get('.select-item.ant-input').clear().type(keyword)
        cy.get('.ant-col-24 >.ant-btn-primary').should('have.text','查 詢')
        cy.get('.ant-col-24 >.ant-btn-primary').click()
        cy.wait(1000)

    }

    function createButton(){
        cy.get('.ant-card-body>.mb-10.ant-row>.mb-5.text-right>.ant-btn-default').should('have.text','新 增')
        cy.get('.ant-card-body>.mb-10.ant-row>.mb-5.text-right>.ant-btn-default').should('have.attr','type')
        cy.get('.ant-card-body>.mb-10.ant-row>.mb-5.text-right>.ant-btn-default').click()
        cy.get('#rcDialogTitle0').should('have.text','房間管理').and('have.class', 'ant-modal-title')


    }

    function createOrUpdate(Floor,Code,Price,BedCount){

        cy.get('form').within(($any)=>{
            cy.get('#Floor').clear().type(Floor)
            cy.get('#Code').clear().type(Code)
            cy.get('#Price .ant-input-number-input').clear().type(Price)
            cy.get('#BedCount .ant-input-number-input').clear().type(BedCount)
            cy.get('#BedCount > div.ant-input-number-handler-wrap > span.ant-input-number-handler.ant-input-number-handler-up').click()
            cy.get('#BedCount .ant-input-number-input').should('have.value','5').then(($beds)=>{
                
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(1) div>span>input').should('have.value','A')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
                .should('contain','啟用')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(2)>.ant-col-12:nth-child(1) div>span>input').should('have.value','B')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(2)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
                .should('contain','啟用')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(3)>.ant-col-12:nth-child(1) div>span>input').should('have.value','C')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(3)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
                .should('contain','啟用')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(4)>.ant-col-12:nth-child(1) div>span>input').should('have.value','D')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(4)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
                .should('contain','啟用')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(5)>.ant-col-12:nth-child(1) div>span>input').should('have.value','E')
                cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(5)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
                .should('contain','啟用')
                
            })
        
            cy.get('#Memo').clear().type('Nancy test data')

        })
        cy.get('.ant-modal-content .footer>.ant-btn-primary').click()

    }


    it('access to the room management page',function(){

        openRoomMenu()
        cy.url().should('contains','/dormitorymanagement.web/#/room')
        cy.get('.ant-card-head-title').should('have.text','房間管理')
        cy.get('.ant-alert-info').should('have.text','已使用的房間無法刪除只可停用，正在使用的房間無法停用。')

    })

    it('create the  room info failure when all required is null ',function(){
        openRoomMenu()
        createButton()
        cy.get('#rcDialogTitle0').should('have.text','房間管理').and('have.class', 'ant-modal-title')
        cy.get('.ant-modal-content .footer>.ant-btn-primary').should('have.text','保 存')
        cy.get('.ant-modal-content .footer>.ant-btn-primary').click()
        cy.get('.ant-modal-body .has-error').within(($any)=>{
            cy.get('.ant-form-explain').should('have.length',4).and(($tips)=>{
                expect($tips[0].textContent,'first tip').to.equal('必填')
                expect($tips[1].textContent,'second tip').to.equal('必填')
                expect($tips[2].textContent,'third tip').to.equal('必填')
                expect($tips[3].textContent,'last tip').to.equal('必填，最大輸入12')
            })
        })
        cy.get('.footer>.ant-btn-default').click()
        cy.get('#rcDialogTitle0').should('not.exist')


    })


    let seed = Cypress._.random(1, 20)
    let floornum =Cypress._.random(1, 5)
    let Floor= floornum+'层'
    let RoomCode =floornum+'_NO.'+seed
    let Price=1200.00
    let BedCount = 4
    
    it('create the  room info successfully when all required is correcttly filled ',function(){
        openRoomMenu()
        createButton()
        createOrUpdate(Floor,RoomCode,Price,BedCount)
        cy.get('.ant-message').should('have.text','保存成功')

    })



    it('search the created room',function(){
        openRoomMenu()
        searchByKeyword(RoomCode)
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(3)').should('have.text',Floor)
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(4)').should('have.text',RoomCode)
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(6)').should('have.text','5')
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(7)').should('contain','A,B,C,D,E')


    })


    let seed = Cypress._.random(1, 20)
    let new_Floor= '一层'
    let new_RoomCode ='1_NO.'+seed

    it('edit the created room ',function(){
        openRoomMenu()
        searchByKeyword(RoomCode)
        cy.get('.ant-table-row > :nth-child(11)> button.ant-btn-primary').children().should('have.class','anticon anticon-edit')
        cy.get('.ant-table-row > :nth-child(11)> button.ant-btn-primary').click()
        cy.get('#rcDialogTitle0').should('have.text','房間管理').and('have.class', 'ant-modal-title')
        createOrUpdate(new_Floor,new_RoomCode,Price,BedCount)
        cy.get('.ant-message').should('have.text','保存成功')
        
    })

    it('update the bed status to enabled',function(){

        openRoomMenu()
        searchByKeyword(new_RoomCode)
        //重新打开页面编辑第一个床位的状态为enable
        // cy.get('.ant-table-row > :nth-child(11)> button.ant-btn-primary').children().should('have.class','anticon anticon-edit')
        cy.get('.ant-table-row > :nth-child(11)> button.ant-btn-primary').click()
        cy.get('#rcDialogTitle0').should('have.text','房間管理').and('have.class', 'ant-modal-title')
        
        cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(1) div>span>input').should('have.value','A')
        cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(1) div>span>input').clear().type('AA')
        cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div')
        .should('contain','啟用')
        cy.get('div:nth-child(8) .ant-form-item-control>.ant-form-item-children >.ant-row-flex:nth-child(1)>.ant-col-12:nth-child(2)>.ant-row>div>div>span>div').click()
        cy.get('.ant-select-dropdown-menu > :nth-child(2)').click()

        cy.get('.footer > .ant-btn-primary').click()
        cy.get('#rcDialogTitle0').should('not.exist')

        searchByKeyword(new_RoomCode)
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(4)').should('have.text',new_RoomCode)
        cy.get('.ant-table-body').find('tbody tr:first').should('have.class','ant-table-row')
        .find('td:nth-child(7)').should('have.text','AA(停用),B,C,D,E')
    
        

    })

    it('update the created room status to enabled',function(){
        openRoomMenu()
        searchByKeyword(new_RoomCode)
        cy.get('.ant-table-row > :nth-child(10)').should('have.text','啟用')
        cy.get('.ant-table-row > :nth-child(10)').click()
        cy.get('.ant-modal-confirm-body>.ant-modal-confirm-title').should('have.text','停用')
        cy.get('.ant-modal-confirm-body>.ant-modal-confirm-content').should('have.text','確認停用?')
        cy.get('.ant-modal-confirm-btns>.ant-btn-primary').should('have.text','確 認')
        cy.get('.ant-modal-confirm-btns>.ant-btn-primary').click()
        cy.get('.ant-message').should('have.text','保存成功')
        
    })



    it('delete the created room ',function(){
        openRoomMenu()
        searchByKeyword(new_RoomCode)
        cy.get('.ant-table-body tbody > tr:first >td:nth-child(11)>.ant-btn-danger').click()
        cy.get('.ant-modal-confirm-body>.ant-modal-confirm-title').should('have.text','確定刪除?')
        cy.get('.ant-modal-confirm-btns>.ant-btn-danger').click()
        //cy.get('.ant-message').should('have.text','删除成功')
        cy.get('.ant-table-placeholder').should('have.text','目前尚無資料')

        
    })


        
    })

