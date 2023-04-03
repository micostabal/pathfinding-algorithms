
describe('Basic Website Features', () => {
  
  it('It switches between the Visualization and About pages', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('About').click();
    cy.contains('awesome');
    cy.contains('Visualization').click();
    cy.contains("Select Algorithm");
    cy.contains("Execute");
    cy.contains("Fill with Maze");
  });
});