import React, {useContext, useState} from "react";
import { Point } from "../../GridComponents/Point";
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
  const {
    selectionState : {
      executionState,
      selectedDestination,
      selectedOrigin,
      algorithm,
      wallSquares,
      isDragging,
      selectionState
    },
    selectionDispatcher
  } = useContext(SelectionContext);

  const neitherOriginNorDestination = () => {
    return !Point.of(row, col).equals(selectedOrigin)
      && !Point.of(row, col).equals(selectedDestination);
  }
  
  const getTitle= () => {
    if (!executionState) return "";
    else if (!executionState.openSet.has(Point.of(row, col))) {
      return "";
    } else {
      return "open-set";
    }
  };

  const getColor = () => {
    const point = Point.of(row, col);

    if (algorithm!==null) {
      if (algorithm.isFinished()) {
        if (algorithm.isSuccess()) {
          if (algorithm.path.contains(Point.of(row, col))) {
            return '#00FF7F';
          }
        }
      }
    }
    
    if (executionState
       && !executionState.openSet.has(Point.of(row, col))
       && neitherOriginNorDestination()
      ) {
      
      const scoreMap = executionState.gScore;
      
      if (scoreMap.get(point)<Number.POSITIVE_INFINITY) {
        
        const ratio = distance(point, selectedDestination) /
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
      title={getTitle()}
      className={'square' + (squareIsDragging ? "-dragging" : "")}
      style= {{backgroundColor: getColor()}}
    >
      {Point.of(row, col).equals(selectedOrigin) || (selectionState===SelectionState.selectOrigin
       && squareIsDragging )
       ? <VscDebugStart color="#F9F6EE"/> : null}
      {Point.of(row, col).equals(selectedDestination)  || (selectionState===SelectionState.selectDestination
       && squareIsDragging )
       ? <VscRecord color="red"/> : null}
    </div>
  )
}

export default Square;