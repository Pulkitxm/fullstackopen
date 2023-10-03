describe('before login', () => {

  beforeEach(()=>{
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173/')    
  })

  it('displays the login form by default', () => {
    cy.contains('Login').click()

    //ensuring that form elements are displayed
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  
})