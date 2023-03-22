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
  
  const neitherOriginNorDestination = () => {
    return !Point.of(row, col).equals(selectedOrigin)
      && !Point.of(row, col).equals(selectedDestination);
  }

  const pointIsWall = () => {
    return wallSquares.contains(point);
  }
  
  useEffect( () => {
    if (finished) {
      if (algorithm?.isSuccess()) {
        if (pathDisplayIndex!==null) {
          if (algorithm.path.slice(pathDisplayIndex).contains(point)) {
            setTitle("optimal-path");
          }
        }
      }
    } else if (!executionState) {setTitle("")}
    else if (!executionState.openSet.contains(point)) {
      setTitle("");
    } else {
      setTitle("open-set");
    }
  }, [executionState, pathDisplayIndex, algorithm, col, row, finished, point]);

  const getColor = () => {
    
    if (algorithm!==null) {
      if (algorithm.isFinished()) {
        if (algorithm.isSuccess()) {
          if (algorithm.path.slice(pathDisplayIndex).contains(point)) {
            return "aquamarine";
          }
        }
      }
    }
    
    if (executionState
       && !executionState.openSet.contains(Point.of(row, col))
       && neitherOriginNorDestination()
      ) {
      
      const scoreMap = executionState.gScore;
      
      if (scoreMap.get(point)<Number.POSITIVE_INFINITY) {
        
        const ratio = scoreMap.get(point) /
          distance(selectedOrigin, selectedDestination);
        return interpolateColor(
          START_COLOR,
          END_COLOR,
          ratio
        );
      }
    }
    if (wallSquares.contains(Point.of(row, col))) {
      return 'black';
    }
    return '#5B5EA6';
  }
  
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
      style= {{backgroundColor: getColor()}}
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