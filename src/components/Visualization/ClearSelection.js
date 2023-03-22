import React, { useContext } from "react";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";
import { SelectionElement } from "./SelectionElement"

export const ClearSelection = () => {
  const {
    selectionDispatcher,
    selectionState: { paused, executionState, finished }
  } = useContext(SelectionContext);
  
  return (
    <SelectionElement
      text={"Clear Selection"}
      disabled={ !paused && executionState!==null && !finished }
      onClick={() => {
        selectionDispatcher({type: SelectionState.clearSelection});
      }}
    />
  )
}