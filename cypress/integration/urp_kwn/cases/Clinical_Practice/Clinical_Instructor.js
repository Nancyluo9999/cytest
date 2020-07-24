import {Clinical_login} from '../../utils/login_method'
import {Clinical_logout} from  '../../utils/login_method'
import {getCurrentTime} from  '../../utils/common'


describe('ClinicalInstructor meun', function() {

    before(function(){
        Clinical_login()
     })
    beforeEach(function(){
    // 如果登陆放在befor里面,每一个test之前会自动清理cookies,preserveOnce用于保持登陆的cookies,
        Cypress.Cookies.preserveOnce('.AspNet.ApplicationCookie')
    
    })
 
    after(function () {
        logout()
     })

    function openMeunPage(){
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title')
        .should('have.text','基礎設置')
        cy.get('[name="基礎設置"] > .ant-menu-submenu-title').click()
        cy.contains('校外人員管理').trigger('mouseover').click()
        cy.get('.ant-card-head-title').should('have.text','校外人員帳戶管理')

    }


    it('Access to ClinicalInstructor list page ',function() {
        cy.getCookie('.AspNet.ApplicationCookie').should('exist')
        //初始化进入校外管人管理页面页面,检查页面正常
        openMeunPage()
        cy.get('.ant-card-head-title').should('have.text','校外人員帳戶管理')

     })


    //按照关键字查询方法
    function  searchByKeywors(keyword){
        cy.get('.ant-input').clear().type(keyword)
        cy.get('.ant-col-24 > .ant-btn').click()
       
    }
    
    // 点击新增按钮,打开新增页面
    function clickCreatebutton(){
        cy.get('.mb-5 > [type=button]').click()
        cy.get('#rcDialogTitle0').should('have.text','人員設置')
    }

    it('create ClinicalInstructor when required is null', function(){

        //初始化进入校外管人管理页面页面,检查页面正常
        openMeunPage()
        // 点击新增按钮,打开新增页面
        clickCreatebutton()
        cy.get('#rcDialogTitle0').should('have.text','人員設置')
        // 直接点击保存按钮,验证必填项.
        cy.get('.ant-modal-content').within(($any)=>{
            //直接点击保存按钮
            cy.get('.footer > .ant-btn-primary').click()
            //检查必填项提示
            cy.get('.ant-form-explain').should('have.length',3)
            .and(($tips)=>{
                expect($tips[0].textContent, 'first item').to.equal('必填')
                expect($tips[1].textContent, 'first item').to.equal('必填')
                expect($tips[2].textContent, 'first item').to.equal('必填')
            })
            //关闭对话框
            cy.get('.footer > .ant-btn-default').click()
        })
    })

    function createOrUpdateClinicalInstructor(Email,Name,EnglishName){

        // Form表单信息填写
        cy.get('.ant-modal-body > form').within(($any) => {
            cy.get('#Email').type(Email)
            cy.get('#Name').type(Name)
            cy.get('#EnglishName').type(EnglishName)
        
            
        })
        cy.get('#InstitutionId > .ant-select-selection > .ant-select-selection__rendered').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li ').first().click()
        cy.get('#SectionId > .ant-select-selection > .ant-select-selection__rendered').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li ').last().click()
        // 点击保存按钮创建成功
       cy.get('.footer > .ant-btn-primary').click()
       cy.get('.ant-message-notice-content').should('have.text','保存成功')

    }
    
    let Seed = Cypress._.random(1, 1000)
    let Email ='nancytest'+Seed+'@163.com'
    let Name= '中文姓名' + Seed
    let EnglishName = 'Name-en'+Seed

    it('create ClinicalInstructor successfully', function(){
       //初始化进入校外管人管理页面页面,检查页面正常
        openMeunPage()
        // 点击新增按钮,打开新增页面
        clickCreatebutton()
        createOrUpdateClinicalInstructor(
            Email,
            Name,
            EnglishName

        )

    })

    // 按照关键字查询人员信息
    it('search by keywords',function(){
        searchByKeywors(Name)
        cy.get('.ant-table-row > :nth-child(4)').should('contain',Name)

     })



   // 修改人员状态为停用
   it('update instructor status',function() {
       openMeunPage()
       searchByKeywors(Name)
       cy.get('.ant-table-row > :nth-child(4)').should('contain',Name)
       cy.get('div.ant-card-body tbody > tr:nth-child(1) > td:nth-child(9) > button > span').contains('啟用').click()
       cy.get('div.ant-modal-content   div.ant-modal-confirm-body > span').should('have.text','停用帶教老師')
       cy.get('.ant-modal-confirm-btns >.ant-btn-primary').click()
       cy.get('div.ant-card-body tbody > tr:nth-child(1) > td:nth-child(9) > button > span').contains('停用')

       
   })
    // 编辑人员信息
   it('update Instructor info',function() {
        openMeunPage()
        searchByKeywors(Name)
        cy.get('.ant-table-row > :nth-child(4)').should('contain',Name)
        cy.get('div.ant-card-body tbody > tr:nth-child(1) > td:nth-child(10) > button ').click()
        cy.get('#rcDialogTitle0').should('have.text','人員設置')
        cy.get('.ant-modal-body > form').within(($any) => {
            cy.get('#Email').should('have.value',Email)
            cy.get('#Name').should('have.value',Name)
            cy.get('#Name').clear().type('new_'+ Name)
            cy.get('#EnglishName').should('have.value',EnglishName)
            cy.get('#EnglishName').clear().type('new_'+ EnglishName)
        
            
        })
        cy.get('#InstitutionId > .ant-select-selection > .ant-select-selection__rendered').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li ').last().click()
        cy.get('#SectionId > .ant-select-selection > .ant-select-selection__rendered').click()
        cy.get('.ant-select-dropdown--single:nth-of-type(1)  ul > li ').last().click()
        // 点击保存按钮创建成功
        cy.get('.footer > .ant-btn-primary').click()
        cy.get('.ant-message-notice-content').should('have.text','保存成功')

        
   })



})