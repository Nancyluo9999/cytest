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

        cy.get('.mb-5 >.ant-btn-default').click()
        cy.get('#rcDialogTitle0').contains('場地設置').should('be.visible')
    }

    function createOrUpdatePlace(InstitutionId,SectionId,Name,EnglishName){

        cy.get('.ant-modal-body').within(($any) =>{
            cy.get('form').within(($any)=>{
                cy.get('div.ant-form-item:nth-child(1)').click()
                .then('li.ant-select-dropdown-menu-item:nth-child(5)').click()
                cy.get('div.ant-form-item:nth-child(2)')
                cy.get('div.ant-form-item:nth-child(3)').clear().type(Name)
                cy.get('div.ant-form-item:nth-child(4)').clear().type(EnglishName)
                cy.get('div.ant-form-item:nth-child(5)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(6)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(7)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(8)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(9)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(10)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(11)').clear().type(7)
                cy.get('div.ant-form-item:nth-child(12)').clear().type(7)
              
            })   
        })
        cy.get('.footer > .ant-btn-primary').click()
            
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
    let EnglishName='Nancytext—'+Seed

    it.only('create clinical place sucessful',function(){
        openPlaceMenu()
        createbutton()
        createOrUpdatePlace(Name,EnglishName)
        



    })






})