import React from 'react';
import Grid from './Grid';

export const VisualizationGrid = () => {
  return (
    <div
      className=''
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <div className="App">
        <Grid />
      </div>
    </div>
  )
}