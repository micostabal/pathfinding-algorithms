import React from "react";
import { DropDownContent } from "./DropDownContent";
import { DropDownOption } from "./DropDownOption";
import { SelectionElement } from "./SelectionElement";

export const FillMazeSelection = () => {
  return (
    <SelectionElement
      text={'Fill with Maze'}
      disabled={false}
    >
      <DropDownContent>
        <DropDownOption text={"Trivial Maze"}/>
        <DropDownOption text={"Random Maze"}/>
        <DropDownOption text={"Spiral Maze"}/>
      </DropDownContent>
    </SelectionElement>
  )
}