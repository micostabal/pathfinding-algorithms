import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { About } from "../../src/pages/About";

describe('general tests', () => {
  
  it('should be able to to sth', () => {
    render(<About></About>);
    expect(screen.getByText(/awesome/i)).toBeInTheDocument();
  })

  

});