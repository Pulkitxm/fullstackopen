describe('blog app', () => {

  beforeEach(()=>{
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`)
    cy.visit('')    
  })
  
  it('displays the login form by default', () => {
    cy.contains('Login').click()
    
    //ensuring that form elements are displayed
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  
  describe("after login",()=>{
    
    it("login is successful with correct credentials",()=>{
      const user = {
        name: 'Pulkit',
        username: 'pulkit',
        password: 'pulkit123'
      }
      cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user).then(res=>{
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(res.body)
        )
        cy.visit('')    
      })
      cy.contains("Pulkit logged in")   
    })

    it("login is unsuccessful with wrong credentials", () => {
      const user = {
        name: 'wrong',
        username: 'wrong',
        password: 'wrong'
      }
    
      
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/api/login`,
        body: user,
        failOnStatusCode: false 
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 401, 403, 404]); 
      });
      
    });
  })
})