import "cypress-real-events/support"
import { N_ROWS, N_COLUMNS } from "../../src/components/VisualizationGrid/Constants";

const paintSquare = (row, col) => {
  cy.get('*[class^="square"]')
    .eq(row * N_COLUMNS + col)
    .realMouseDown()
    .realMouseUp();
} 

describe('Visualization Main Features', () => {

  beforeEach( () => {
    cy.visit('http://localhost:3000/');
  });

  it('should have execution button disabled by default', () => {
    cy.get('button')
      .contains('Execute')
      .should('be.disabled');
  });

  it('should be able to select A* and execute it', () => {
    cy.contains('Select Algorithm')
      .realHover();
    
    cy.contains('A*').click();
    
    cy.get('button')
      .contains('Execute')
      .should('be.enabled')
      .click();
  });

  it('should be able to execute dijkstra dodging walls', () => {
    cy.contains('Select Algorithm')
      .realHover();
    
    cy.contains('Dijkstra').click();

    for (let row = Math.floor(N_ROWS/3); row < Math.floor(4 * N_ROWS/5); row++) {
      paintSquare(row, Math.floor(N_COLUMNS/2));
    }
    
    cy.get('button')
      .contains('Execute')
      .should('be.enabled')
      .click();
  });

  it.skip('should be able to draw walls', () => {
    
  });
  
  it.skip('should be able to drag and drop origin and destination', () => {
    
  });
  
  it.skip('should be able to ', () => {
    
  });
  
});
