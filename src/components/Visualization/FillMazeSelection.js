import React, {useContext} from "react";
import { DropDownContent } from "./DropDownContent";
import { DropDownOption } from "./DropDownOption";
import { SelectionElement } from "./SelectionElement";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";


export const FillMazeSelection = () => {
  const {
    selectionDispatcher
  } = useContext(SelectionContext);

  return (
    <SelectionElement
      text={'Fill with Maze'}
      disabled={false}
    >
      <DropDownContent>
        <DropDownOption text={"Trivial Maze"} onClick={() => {
          selectionDispatcher({
            type: SelectionState.fillWithMaze, mazeType: 'trivial'
          });
        }}/>
        <DropDownOption text={"Random Maze"}/>
        <DropDownOption text={"Spiral Maze"}/>
      </DropDownContent>
    </SelectionElement>
  )
}