describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`);
    cy.visit('');
  });

  it('displays the login form by default', () => {
    cy.contains('Login').click();
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('login attempts', () => {
    it('login is successful with correct credentials', () => {
      const user = {
        name: 'Pulkit',
        username: 'pulkit',
        password: 'pulkit123',
      };
      cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user).then((res) => {
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(res.body));
        cy.visit('');
      });
      cy.contains('Pulkit logged in');
    });

    it('login is unsuccessful with wrong credentials', () => {
      const user = {
        name: 'wrong',
        username: 'wrong',
        password: 'wrong',
      };
      cy.request({
        method: 'POST',
        url: `${Cypress.env('backendUrl')}/api/login`,
        body: user,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 401, 403, 404]);
      });
    });
  });

  describe('after login', () => {
    beforeEach(() => {
      const user = {
        name: 'Pulkit',
        username: 'pulkit',
        password: 'pulkit',
      };
      cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user).then((res) => {
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(res.body));
        cy.visit('');
      });
    });

    it('passed', () => {
      cy.contains('Add a new Note').click();
      cy.get("input[name='Username']:eq(0)").type('Cypress');
      cy.get("input[name='Username']:eq(1)").type(JSON.parse(window.localStorage.loggedNoteappUser).id);
      cy.get("input[name='Username']:eq(2)").type('https://devpulkit.vercel.app/');

      const user = {
        username: 'pulkit',
        password: 'pulkit',
      };

      cy.request('POST', `${Cypress.env('backendUrl')}/api/login`, user).then((res) => {
        const blog = {
          title: 'Cypress',
          author: `${JSON.parse(window.localStorage.loggedNoteappUser).id}`,
          url: 'https://devpulkit.vercel.app/',
        };

        cy.request({
          method: 'POST',
          url: `${Cypress.env('backendUrl')}/api/blogs`,
          body: blog,
          headers: {
            Authorization: `Bearer ${res.body.token}`,
            'Content-Type': 'application/json',
          },
        });

        cy.visit('');
        cy.contains('view').click();
        cy.contains('Cypress');
        cy.contains('https://devpulkit.vercel.app/');
      });
    });
  });
});
