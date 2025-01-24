describe('template spec', () => {
  it('should allow login with user@example.com', () => {
    cy.visit('/auth');

    cy.get('input#email')
      .type('user@example.com');

    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
    cy.url().should('include', '/tasks');

    cy.get('button[id="addTask"]').click();

    cy.get('#taskNewModal').should('be.visible');

    cy.get('input#title').type('Tarea TEST');

    cy.get('textarea').then(($elements) => {
      console.log($elements);
    });

    cy.get('textarea#description', { timeout: 10000 }).should('be.visible');

    cy.get('#taskNewModal textarea#description', { timeout: 2000 }).type('Descripción de Tarea TEST');


    cy.get('#taskNewModal .btn#success').click();

    cy.get('#taskNewModal').should('not.be.visible');

    cy.contains('Tarea TEST').should('exist');
    cy.contains('Descripción de Tarea TEST').should('exist');


    cy.get('.card').first().within(() => {
      cy.get('input[type="checkbox"]').check();

      cy.get('button.btn-danger', {timeout: 5000}).contains('Eliminar').click();
    });


  });
})