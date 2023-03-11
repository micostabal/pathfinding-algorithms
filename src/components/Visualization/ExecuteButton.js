import React, {useContext, useEffect, useState} from "react";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionElement } from "./SelectionElement";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";
import { EXECUTION_INTERVAL } from "../VisualizationGrid/Constants";

export const ExecuteButton = () => {
  const {
    selectionDispatcher,
    selectionState: { algorithm, algorithmType, finished }
  } = useContext(SelectionContext);
  const [executing, setExecuting] = useState(false);
  
  useEffect( () => {
    if (executing) {
      let executionInterval = setInterval( () => {
        if (algorithm.finished) {
          setExecuting(false);
          clearInterval(executionInterval);
          return;
        }
        selectionDispatcher({type: SelectionState.nextIter});
      }, EXECUTION_INTERVAL);
      return () => clearInterval(executionInterval);
    }
  }, [executing, algorithm, selectionDispatcher]);
  
  return (
    <SelectionElement
      text={executing ? "Restart" : "Execute"}
      disabled={algorithmType===null || executing}
      onClick={() => {
        setExecuting( (ex) => !ex);
        selectionDispatcher({type: SelectionState.execute});
      }}
    />
  )
}