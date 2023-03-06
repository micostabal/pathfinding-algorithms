import React from "react";
import Square from "./Square";
import { arrayRange } from "./Utils";
import { N_ROWS, N_COLUMNS } from "./Constants";

const Grid = () => {
  
  return (
    <div className='grid-container'>
      {arrayRange(0, N_ROWS-1, 1).map( row => {
        return (
          <div
            className='row-container'
            style={{display: "flex", flexDirection: 'columns'}}
            key={row}>
            {
              arrayRange(0, N_COLUMNS-1, 1).map( col => {
                return <Square
                  key={col}
                  row={row}
                  col={col}
                />
              })
            }
          </div>
        );
      })}
    </div>
  )
} 

export default Grid;