import { useState, useReducer } from 'react';
import { SelectionContext } from './GridContext';
import Grid from './Grid';
import SelectionMode from './SelectionMode';
import { Point } from '../../GridComponents/Point';
import { PointList } from '../../GridComponents/PointList';
import { AStar} from "../../PathFindingAlgorithms/AStar";
import { N_COLUMNS, N_ROWS } from './Constants';

const reducer = (state, action) => {
  switch (action.type) {
    case SelectionMode.selectOrigin: 
      return {
        ...state,
        mode: SelectionMode.selectDestination,
        selectedOrigin: Point.of(action.i, action.j)
      };
    case SelectionMode.selectDestination:
      state.setReadyToExecute(true);
      return {
        ...state,
        mode: SelectionMode.addWallSquare,
        selectedDestination: Point.of(action.i, action.j)
      };
    case SelectionMode.addWallSquare:
      state.wallSquares.push(Point.of(action.i, action.j));
      return state;
    case SelectionMode.execute:
      const newAlgorithm = new AStar(
        N_ROWS,
        N_COLUMNS,
        state.wallSquares,
        state.selectedOrigin,
        state.selectedDestination
      );
      newAlgorithm.initialize();
      const initializedExecutionState = newAlgorithm.getState();
      
      return {
        ...state,
        mode: SelectionMode.execute,
        algorithm: newAlgorithm,
        executionState: initializedExecutionState
      };
    case SelectionMode.nextIter:
      state.algorithm.executeIteration();
      return {
        ...state,
        executionState: state.algorithm.getState()
      };
    default:
      throw new Error('No such action '+action.type);
  }
}

export const VisualizationGrid = () => {
  const [isDragging, setIsDragging] =useState(false);
  const [readyToExecute, setReadyToExecute] =useState(false);
  const [executing, setExecuting] = useState(false);
  const [selectionState, selectionDispatcher] = useReducer(reducer, {
    mode: SelectionMode.selectOrigin,
    wallSquares: new PointList(),
    selectedOrigin: Point.of(-1, -1),
    selectedDestination: Point.of(-1, -1),
    algorithm: null,
    executionState: null,
    setReadyToExecute,
    setExecuting
  });
  
  const buttonDisabled = () => {
    if (selectionState.algorithm!==null) {
      return selectionState.algorithm.isFinished();
    }
    
    return !readyToExecute;
  }

  return (
    <SelectionContext.Provider value={{
      isDragging,
      setIsDragging,
      selectionState,
      selectionDispatcher
    }}>
      <div className="App">
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <button
            onClick={() => {
              if (!executing) {
                selectionDispatcher({type: SelectionMode.execute});
                setExecuting(true);
              } else {
                selectionDispatcher({type: SelectionMode.nextIter});
              }
            }}
            disabled={buttonDisabled()}
          >
            { executing ? "Next Iteration" : "Execute" }
          </button>
        </div>
        {/* <p style={{color: 'white'}}>Current State: {selectionState.mode}</p> */}
        <Grid />
      </div>
    </SelectionContext.Provider>
  )
}