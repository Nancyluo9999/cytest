context('type', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    // it('To type into a DOM element,', () => {

    //     cy.get('.action-email')
    //     .type('abc@123.com').should('have.value','abc@123.com')
    //     .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    //     cy.get('.action-disabled').type('123',{force:true}).should('have.value','123')
    //     cy.get('.action-focus').focus().should('have.class','focus').prev()
    //     .should('have.attr','style','color: orange;')
    //     cy.get('.action-blur').type('about to blur').blur()
    //     .should('have.class','error')
    //     .prev().should('have.attr','style','color: red;')

    //     cy.get('#description').type('delete this text')
    //     .should('have.value','delete this text').clear()
    //     .should('have.value','')

    //     cy.get('.action-form').find('[type="text"]').type('123')
    //     cy.get('.action-form').submit().next()
    //     .should('contain','Your form has been submitted!')

    //     cy.get('.action-btn').click()
    //     cy.get('#action-canvas').click()

    //     cy.get('#action-canvas').click('topLeft')
    //     cy.get('#action-canvas').click('top')
    //     cy.get('#action-canvas').click('topRight')
    //     cy.get('#action-canvas').click('left')
    //     cy.get('#action-canvas')
    //     .click(80, 75)
    //     .click(170, 75)
    //     .click(80, 165)
    //     .click(100, 185)
    //     .click(125, 190)
    //     .click(150, 185)
    //     .click(170, 165)

    //     cy.get('.action-labels>.label').click({ multiple: true })
    //     cy.get('.action-div').dblclick().should('not.be.visible')
    //     cy.get('.action-input-hidden').should('be.visible')


    //     cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    //     .check().should('be.checked')

    //     cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]')
    //     .check().should('be.checked')
    //     cy.get('.action-radios [type="radio"]').not('[disabled]')
    //     .check().should('be.checked')
    //     cy.get('.action-radios [type="radio"]')
    //     .check('radio1').should('be.checked')
    //     cy.get('.action-checkboxes [disabled]')
    //     .check({ force: true }).should('be.checked')

    //     cy.get('.action-radios [type="radio"]')
    //     .check('radio3', { force: true }).should('be.checked')


    // })


    // it('uncheck ', ()=> {

    //     cy.get('.action-check [type="checkbox"]')
    //     .not('[disabled]').uncheck().should('not.be.checked')

    //     cy.get('.action-check [type="checkbox"]')
    //     .check(['checkbox1','checkbox3']).should('be.checked')
    //     .uncheck(['checkbox1','checkbox3']).should('not.be.checked')

    //     cy.get('.action-check [disabled]')
    //     .uncheck({ force: true }).should('not.be.checked')

    // })

    // it('select', ()=> {

    //     cy.get('.action-select').select('apples')

    //     cy.get('.action-select-multiple')
    //     .select(['apples', 'oranges', 'bananas'])
    
    
    // })

    it('to scroll an element into view', ()=> {

        cy.get('#scroll-horizontal button')
        .should('not.be.visible')
        cy.get('#scroll-horizontal button').scrollIntoView()
        .should('be.visible')

        cy.scrollTo('bottom')

        cy.get('#scrollable-horizontal').scrollTo('right')
    
    
    })

    it('to trigger an event on a DOM element' ,() => {
        cy.get('.trigger-input-range')
        .invoke('val', 25)
        .trigger('change')
        .get('input[type=range]').siblings('p')
        .should('have.text', '25')

    })




})