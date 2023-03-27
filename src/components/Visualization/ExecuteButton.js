import React, {useContext, useEffect, useState} from "react";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionElement } from "./SelectionElement";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";
import { EXECUTION_INTERVAL } from "../VisualizationGrid/Constants";

export const ExecuteButton = () => {
  const {
    selectionDispatcher,
    selectionState: { algorithm, algorithmType, paused }
  } = useContext(SelectionContext);
  const [executing, setExecuting] = useState(false);
  
  useEffect( () => {
    if (executing && algorithm!==null) {
      let executionInterval = setInterval( () => {
        if (algorithm.finished) {
          setExecuting(false);
          clearInterval(executionInterval);
          return;
        }
        selectionDispatcher({type: SelectionState.nextIter, executionInterval});
      }, EXECUTION_INTERVAL);
      return () => clearInterval(executionInterval);
    }
  }, [executing, algorithm, selectionDispatcher, paused]);
  
  return (
    <SelectionElement
      text={executing && !paused ? "Pause" : "Execute"}
      disabled={algorithmType===null}
      onClick={() => {
        if (executing) {
          setExecuting(false);
          selectionDispatcher({type: SelectionState.pauseExecution});
        } else {
          if (algorithmType!==null && paused) {
            // Debería llamar a algo que siga con la iteracion en caso de que se haya pausado
          } else if (algorithmType!==null && !paused) {
            selectionDispatcher({type: SelectionState.execute});
          }
          setExecuting(true);
        }
        
      }}
    />
  )
}