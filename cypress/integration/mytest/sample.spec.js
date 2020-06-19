describe('network request', function() {

    it("network request", function()
    {
    //    cy.request('https://jsonplaceholder.cypress.io/comments')
    //    .should((response =>{
    //        expect(response.status).to.eq(200)
    //        expect(response.body).to.have.length(500)
    //        expect(response).to.have.property('headers')
    //        expect(response).to.have.property('duration')
           
    //    }))

        cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
        .its('body.0')
        .then((user)=>{
            expect(user).property('id').to.be.a('number')
            cy.request('POST', 'https://jsonplaceholder.cypress.io/posts',{
              userId: user.id,
              title: 'Cypress Test Runner',
              body: 'Fast, easy and reliable testing for anything that runs in a browser.',
            })

        })
        .then((res)=>{
            expect(res).property('status').to.equal(201) // new entity created
            expect(res).property('body').to.contain({
              title: 'Cypress Test Runner',
            })
        })



          
    })

})