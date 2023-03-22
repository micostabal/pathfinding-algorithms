import React, { useContext } from "react";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";
import { SelectionElement } from "./SelectionElement"

export const ClearSelection = () => {
  const {
    selectionDispatcher
  } = useContext(SelectionContext);
  
  return (
    <SelectionElement
      text={"Clear Selection"}
      disabled={false}
      onClick={() => {
        selectionDispatcher({type: SelectionState.clearSelection});
      }}
    />
  )
}