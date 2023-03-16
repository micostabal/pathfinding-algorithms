import React, { useContext, useEffect } from "react";
import Square from "./Square";
import { arrayRange } from "./Utils";
import { N_ROWS, N_COLUMNS } from "./Constants";
import { SelectionContext } from "./SelectionContext";
import { PATH_DISPLAY_INTERVAL } from "./Constants";
import { SelectionState } from "./selectionStates/SelectionState";

const Grid = () => {
  const {
    selectionState : {
      algorithm,
      finished
    },
    selectionDispatcher
  } = useContext(SelectionContext);
  
  useEffect(() => {
    if (algorithm!==null) {
      if (algorithm.isFinished()) {
        if (algorithm.isSuccess()) {
          const fullPath = algorithm.path.toArray();
          const fullLength = fullPath.length;
          let currentIndex = 0;
          let pathDisplayInterval = setInterval( () => {
            selectionDispatcher({type: SelectionState.addNodeToPathDisplay});
            if (currentIndex>=fullLength-1) {
              clearInterval(pathDisplayInterval);
              return;
            }
            currentIndex++;
          }, PATH_DISPLAY_INTERVAL);
          return () => clearInterval(pathDisplayInterval);
        }
      }
    }
  }, [finished, algorithm, selectionDispatcher]);
  
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