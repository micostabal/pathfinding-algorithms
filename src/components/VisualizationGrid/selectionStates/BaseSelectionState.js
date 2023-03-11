import { Point } from "../../GridComponents/Point";
import { SelectionState } from "./SelectionState";


const neitherOriginNordestination = (state, row, col) => {
  return !state.selectedOrigin.equals(Point.of(row, col))
    && !state.selectedDestination.equals(Point.of(row, col))
}

const pointNotInWall = (state, row, col) => {
  return !state.wallSquares.contains(Point.of(row, col));
}

export class WallSelectionState {
  
  mouseEnter (state, row, col) {
    if (neitherOriginNordestination(state, row, col)) {
      state.wallSquares.push(Point.of(row, col));
    }
    return state;
  }

  mouseLeave (state, row, col) {return state;}

  mouseUp (state, row, col) {
    if (!state.wallSquares.contains(Point.of(row, col))) {
      state.wallSquares.push(Point.of(row, col));
    }
    return {
      ...state,
      isDragging: false,
      selectionState: SelectionState.notSelected
    };
  }

  mouseDown (state, row, col) {return state;}
  mouseOver (state, row, col) {return state;}
}

export class OriginSelectionState {
  mouseEnter (state, row, col) {return state;}
  mouseLeave (state, row, col) {return state;}

  mouseUp (state, row, col) {
    const point = Point.of(row, col);
    
    return {
      ...state,
      isDragging: false,
      selectionState: SelectionState.notSelected,
      selectedOrigin: pointNotInWall(state, row, col) ? point : state.selectedOrigin
    };
  }

  mouseDown (state, row, col) {return state;}
  mouseOver (state, row, col) {return state;}
}

export class DestinationSelectionState {
  mouseEnter (state, row, col) {return state;}
  mouseLeave (state, row, col) {return state;}

  mouseUp (state, row, col) {
    const point = Point.of(row, col);
    return {
      ...state,
      isDragging: false,
      selectionState: SelectionState.notSelected,
      selectedDestination: pointNotInWall(state, row, col) ? point : state.selectedDestination
    };
  }

  mouseDown (state, row, col) {return state;}
  mouseOver (state, row, col) {return state;}
}

export class InactiveSelectionState {
  mouseEnter (state, row, col) {return state;}
  mouseLeave (state, row, col) {return state;}
  mouseUp (state, row, col) {return state;}
  mouseDown (state, row, col) {return state;}
  mouseOver (state, row, col) {return state;}
}

export class NotSelectedSelectionState {

  mouseEnter (state, row, col) {
    return state;
  }

  mouseLeave (state, row, col) {
    return state;
  }

  mouseUp (state, row, col) {
    return state;
  }

  mouseDown (state, row, col) {
    let newState;
    if (Point.of(row, col).equals(state.selectedOrigin)) {
      newState=SelectionState.selectOrigin;
    } else if (Point.of(row, col).equals(state.selectedDestination)) {
      newState=SelectionState.selectDestination;
    } else {
      state.wallSquares.push(Point.of(row, col));
      newState=SelectionState.addWallSquare;
    }
    return {
      ...state,
      isDragging: true,
      selectionState: newState
    };
  }

  mouseOver (state, row, col) {
    return state;
  }

}

