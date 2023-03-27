import React, {useContext, useEffect, useState} from "react";
import { Point } from "../GridComponents/Point";
import { SelectionContext } from "./SelectionContext";
import { interpolateColor } from "./Utils";
import { distance } from "../../PathFindingAlgorithms/GridUtils";
import {VscDebugStart, VscRecord} from "react-icons/vsc";
import {START_COLOR, END_COLOR} from "./Constants";
import "./Square.css";
import { GridActions } from "./GridActions";
import { SelectionState } from "./selectionStates/SelectionState";


const Square = ({row, col}) => {
  const [squareIsDragging, setSquareIsDragging] = useState(false);
  const [color, setColor] = useState("#5B5EA6");
  const [title, setTitle] = useState("");
  const {
    selectionState : {
      executionState,
      selectedDestination,
      selectedOrigin,
      algorithm,
      wallSquares,
      isDragging,
      selectionState,
      pathDisplayIndex,
      finished
    },
    selectionDispatcher
  } = useContext(SelectionContext);
  const point = Point.of(row, col);
  
  const pointIsWall = () => {
    return wallSquares.contains(point);
  }
  
  useEffect( () => {
    if (finished
      && algorithm?.isSuccess() 
      && pathDisplayIndex!==null
      && algorithm
        .path
        .slice(pathDisplayIndex)
        .contains(point)) {
      setTitle("optimal-path");
    } else if (!executionState) {setTitle("")}
    else if (!executionState.openSet.contains(point)) {
      setTitle("");
    } else {
      setTitle("open-set");
    }
  }, [executionState, pathDisplayIndex, algorithm, col, row, finished, point]);

  useEffect( () => {
    if (wallSquares.contains(Point.of(row, col))) {
      setColor('black');
    } else if (algorithm!==null && algorithm?.isFinished() && algorithm?.isSuccess() 
      && algorithm?.path.slice(pathDisplayIndex).contains(point)) {
      return setColor("aquamarine");
    } else if (executionState!== null) {
      const scoreMap = executionState.gScore;
      if (scoreMap.get(point)<Number.POSITIVE_INFINITY) {
        const distanceToOrigin = scoreMap.get(point);
        const ratio = distanceToOrigin / distance(selectedOrigin, selectedDestination);
        const newColor = interpolateColor(
          START_COLOR,
          END_COLOR,
          ratio
        );
        setColor(newColor);
      }
    } else {
      setColor("#5B5EA6");
    }
  }, [algorithm, pathDisplayIndex, col, executionState, wallSquares,
    point, row, selectedOrigin, selectedDestination, color
  ]);
  
  return (
    <div
      onMouseDown={ () => {
        selectionDispatcher({
          type: GridActions.mouseDown,
          i: row,
          j: col
        });
        setSquareIsDragging(true);
        
      }}
      onMouseUp={ () => {
        setSquareIsDragging(false);
        selectionDispatcher({
          type: GridActions.mouseUp,
          i: row,
          j: col
        });
      }}
      onMouseOver={ () => {
        selectionDispatcher({
          type: GridActions.mouseOver,
          i: row,
          j: col
        });
      }}
      onMouseEnter={ () => {
        if (isDragging) {
          setSquareIsDragging(true);
          selectionDispatcher({
            type: GridActions.mouseEnter,
            i: row,
            j: col
          });
        }
      }}
      onMouseLeave={ () => {
        if (isDragging) {
          setSquareIsDragging(false);
          selectionDispatcher({
            type: GridActions.mouseLeave,
            i: row,
            j: col
          });
        }
      }}
      title={title}
      className={'square' + (squareIsDragging ? "-dragging" : "")}
      style= {{backgroundColor: color}}
    >
      {Point.of(row, col).equals(selectedOrigin) || (selectionState===SelectionState.selectOrigin
       && squareIsDragging && !pointIsWall() )
       ? <VscDebugStart color="#F9F6EE"/> : null}
      {Point.of(row, col).equals(selectedDestination)  || (selectionState===SelectionState.selectDestination
       && squareIsDragging && !pointIsWall() )
       ? <VscRecord color="red"/> : null}
    </div>
  )
}

export default Square;