import React, {useContext} from "react";
import { DropDownContent } from "./DropDownContent";
import { DropDownOption } from "./DropDownOption";
import { SelectionElement } from "./SelectionElement";
import { SelectionContext } from "../VisualizationGrid/SelectionContext";
import { SelectionState } from "../VisualizationGrid/selectionStates/SelectionState";
import { MazeType } from "../../mazes/MazeFactory";

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
            type: SelectionState.fillWithMaze, mazeType: MazeType.trivial
          });
        }}/>
        <DropDownOption text={"Random Maze"}/>
        <DropDownOption text={"Spiral Maze"} onClick={() => {
          console.log('selection dispatcher');
          selectionDispatcher({
            type: SelectionState.fillWithMaze, mazeType: MazeType.spiral
          });
        }}/>
      </DropDownContent>
    </SelectionElement>
  )
}