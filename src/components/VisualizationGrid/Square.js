import React, {useContext, useState} from "react";
import { Point } from "../../GridComponents/Point";
import { SelectionContext } from "./GridContext";
import SelectionMode from "./SelectionMode";
import { interpolateColor } from "./Utils";
import { distance } from "../../PathFindingAlgorithms/GridUtils";
import {START_COLOR, END_COLOR} from "./Constants";
import "./Square.css";

const SelectionClassNames = {
  notSelected: 'square-not-selected',
  selected: 'square-selected',
  wall: 'square-wall'
}

const Square = ({row, col}) => {
  const [className, setClassName] = useState(SelectionClassNames.notSelected);
  const {
    isDragging,
    setIsDragging,
    selectionState : {
      executionState,
      selectedDestination,
      selectedOrigin,
      mode,
      algorithm
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
      return "openSet";
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
    switch (className) {
      case SelectionClassNames.notSelected:
        return '#5B5EA6';
      case SelectionClassNames.selected:
        return '#45B8AC';
      case SelectionClassNames.wall:
        return 'black';
      default:
        throw new Error("No Valid color / state for square!!");
    }
  }
  
  const triggerDispatcher = () => {
    selectionDispatcher({
      type: mode,
      i: row,
      j: col
    });
  }
  
  return (
    <div
      onClick={ () => {
        if (mode===SelectionMode.selectOrigin
           || mode===SelectionMode.selectDestination) {
          setClassName(SelectionClassNames.selected);
          triggerDispatcher();
        }
      }}
      onMouseDown={ () => {
        if (mode===SelectionMode.addWallSquare) {
          setClassName(SelectionClassNames.wall);
          setIsDragging(true);
          triggerDispatcher();
        }
      }}
      onMouseUp={ () => {
        if (mode===SelectionMode.addWallSquare) {
          setClassName(SelectionClassNames.wall);
          setIsDragging(false);
          triggerDispatcher();
        }
      }}
      onMouseOver={ () => {
        if (isDragging && neitherOriginNorDestination() ) {
          setClassName(SelectionClassNames.wall);
          if (mode===SelectionMode.addWallSquare) {
            triggerDispatcher();
          }
        }
      }}
      title={ getTitle() }
      className={className}
      style= {{backgroundColor: getColor()}}
    >

    </div>
  )
}

export default Square;