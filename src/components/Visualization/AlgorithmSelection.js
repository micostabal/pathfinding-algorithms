import React, { useContext } from "react";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionElement } from "./SelectionElement";
import { DropDownOption } from "./DropDownOption";
import { DropDownContent } from "./DropDownContent";
import { AlgorithmTypes } from "../../PathFindingAlgorithms/AlgorithmTypes";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";

export const AlgorithmSelection = () => {
  const {
    selectionDispatcher,
    selectionState: { algorithmType }
  } = useContext(SelectionContext);

  const getText = () => {
    if (algorithmType) {
      return AlgorithmTypes
        .find( t => t.name===algorithmType)
        .label;
    }
    return 'Select Algorithm';
  }
  
  return (
    <SelectionElement
      text={ getText() }
      disabled={false}
    >
      <DropDownContent>
        {AlgorithmTypes.map( ({name, label}) => {
          return <DropDownOption
            key={name}
            text={label}
            onClick={() => {
              selectionDispatcher({
                type: SelectionState.algorithmSelection,
                newAlgorithmType: name
              })
            }}
          />;
        })}
      </DropDownContent>
    </SelectionElement>
  )
}