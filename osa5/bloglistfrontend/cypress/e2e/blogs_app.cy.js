describe('Blog app', () => {
  beforeEach(() => {
    const testUser = {
      username: 'testaaja',
      password: 'testaaja',
      name: 'Testaaja Mallinen'
    };

    const testUserSecond = {
      username: 'tester',
      password: 'tester',
      name: 'Mr Tester'
    };

    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', testUser);
    cy.request('POST', 'http://localhost:3001/api/users', testUserSecond);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get('#loginForm').as('loginForm');
    cy.get('@loginForm').children('#username');
    cy.get('@loginForm').children('#password');
    cy.get('@loginForm').children('#submitLogin');
  });

  describe('Login tests', () => {
    it('Successful login as user testaaja', () => {
      cy.get('#username').type('testaaja');
      cy.get('#password').type('testaaja');
      cy.get('#submitLogin').click();
      cy.get('#message').contains('Login successful');
    });

    it('Fail to login', () => {
      cy.get('#username').type('testaaja');
      cy.get('#password').type('wrongPasswordWhoops');
      cy.get('#submitLogin').click();
      cy.get('#errorMessage').contains('Wrong user credentials, try again...');
    });
  });

  describe('While logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('testaaja');
      cy.get('#password').type('testaaja');
      cy.get('#submitLogin').click();
    });

    /*
    afterEach(() => {
      cy.get('#logoutButton').click();
    });
    */

    it('Create a new blog', () => {
      cy.get('#toggleNewBlogForm').click();
      cy.get('#title').type('Test Blog');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('https://newtestblog.fi');
      cy.get('#submitNewBlog').click();
      cy.get('#message').contains('Blog has been added to list');
    });

    describe('New blog has been created and blog area is extended', () => {
      beforeEach(() => {
        /*
        const newBlog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'https://newtestblog.fi'
        };
        */
        //cy.request('POST', 'http://localhost:3001/api/blogs', newBlog);
        
        cy.visit('http://localhost:3000');
        cy.get('#username').type('testaaja');
        cy.get('#password').type('testaaja');
        cy.get('#submitLogin').click();
        
        cy.get('#toggleNewBlogForm').click();
        cy.get('#title').type('Test Blog');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('https://newtestblog.fi');
        cy.get('#submitNewBlog').click();

        cy.get('[class="viewHideButton"]').then(buttons => cy.wrap(buttons[0]).as('foundViewHideButton'));
        cy.get('@foundViewHideButton').click();
      });

      it('Like the new blog', () => {
        // according to the documentation, targeting class is not the best practice to use
        // instead you should add data-attribute for the element and give proper name and value for it
        // example: cy.get('[data-cy="likeButton"]').click() and <input data-cy='likeButton' ... /> on the Blog.js
        cy.get('[class="likeButton"]').then(buttons => cy.wrap(buttons[0]).as('foundLikeButton'));
        cy.get('@foundLikeButton').click();
        cy.get('#message').contains('You have liked from Test Blog');
      });

      
      it('Delete the new blog', () => {
        cy.get('[class="deleteButton"]').then(buttons => cy.wrap(buttons[0]).as('foundDeleteButton'));
        cy.get('@foundDeleteButton').click();
        //cy.get('#message').contains()
      });  
    });

    describe('New blog has been created by testaaja and after that, logged to different user', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.get('#username').type('testaaja');
        cy.get('#password').type('testaaja');
        cy.get('#submitLogin').click();
        
        cy.get('#toggleNewBlogForm').click();
        cy.get('#title').type('Test Blog');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('https://newtestblog.fi');
        cy.get('#submitNewBlog').click();

        cy.get('#logoutButton').click();
        cy.get('#username').type('tester');
        cy.get('#password').type('tester');
        cy.get('#submitLogin').click();

        cy.get('[class="viewHideButton"]').then(buttons => cy.wrap(buttons[0]).as('foundViewHideButton'));
        cy.get('@foundViewHideButton').click();
      });

      it('Delete button should not be displayed', () => {
        cy.get('.deleteButton').should('not.exist');
      });
    });

    describe('Two blogs have been created and user liked from Test Blog 2', () => {
      beforeEach(() => {
        const newBlog = {
          title: 'Test Blog 99',
          author: 'Test Author',
          url: 'https://newtestblog99.fi'
        };

        cy.visit('http://localhost:3000');
        cy.get('#username').type('testaaja');
        cy.get('#password').type('testaaja');
        cy.get('#submitLogin').click();

        cy.request('POST', 'http://localhost:3001/api/blogs', newBlog);
        
        cy.get('#toggleNewBlogForm').click();
        cy.get('#title').type('Test Blog');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('https://newtestblog.fi');
        cy.get('#submitNewBlog').click();

        cy.get('#toggleNewBlogForm').click();
        cy.get('#title').type('Test Blog 2');
        cy.get('#author').type('Test Author');
        cy.get('#url').type('https://newtestblog2.fi');
        cy.get('#submitNewBlog').click();

        cy.wait(10000);
        cy.get('[class="viewHideButton"]').then(buttons => cy.wrap(buttons[2]).as('foundViewHideButton'));
        cy.get('@foundViewHideButton').click();

        cy.get('[class="likeButton"]').then(buttons => cy.wrap(buttons[2]).as('foundLikeButton'));
        cy.get('@foundLikeButton').click();
      });

      it.only('Test Blog 2 should be first on the blog display', () => {
        cy.wait(10000);
        cy.get('[class="blogTitle"]').then(titles => cy.wrap(titles[0]).as('firstBlogTitle'));
        cy.get('@firstBlogTitle').contains('Test Blog 2');
      });
    });
  });
});