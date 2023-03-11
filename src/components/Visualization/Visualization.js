import { useReducer } from 'react';
import {VisualizationGrid} from '../VisualizationGrid/VisualizationGrid';
import './Visualization.css';
import { SelectionContext } from '../VisualizationGrid/SelectionContext';
import  { SelectionState } from '../VisualizationGrid/selectionStates/SelectionState';
import { Point } from '../GridComponents/Point';
import { PointList } from '../GridComponents/PointList';
import { algorithmFactory } from "../../PathFindingAlgorithms/AlgorithmFactory";
import { SelectionStateFactory } from '../VisualizationGrid/selectionStates/SelectionStateFactory';
import { GridActions } from '../VisualizationGrid/GridActions';
import { N_ROWS, N_COLUMNS } from '../VisualizationGrid/Constants';
import { SelectionMenu } from "./SelectionMenu";

const reducer = (state, {type, i, j, newAlgorithmType}) => {
  const handler = SelectionStateFactory.get(state.selectionState);
  switch (type) {
    case GridActions.mouseDown:
      return handler.mouseDown(state, i, j);
    case GridActions.mouseUp:
      return handler.mouseUp(state, i, j);
    case GridActions.mouseEnter:
      return handler.mouseEnter(state, i, j);
    case GridActions.mouseLeave:
      return handler.mouseLeave(state, i, j);
    case GridActions.mouseOver:
      return handler.mouseOver(state, i, j);
    case SelectionState.execute:
      const newAlgorithm = algorithmFactory.create(
        state.algorithmType,
        [
          N_ROWS,
          N_COLUMNS,
          state.wallSquares,
          state.selectedOrigin,
          state.selectedDestination
        ]
      );
      newAlgorithm.initialize();
      return {
        ...state,
        algorithm: newAlgorithm,
        executionState: newAlgorithm.getState(),
        finished: newAlgorithm.isFinished(),
        selectionState: SelectionState.inactive
      }
    case SelectionState.nextIter:
      const finished = state.algorithm.isFinished();
      if (!finished) {
        state.algorithm.executeIteration();
      }
      return {
        ...state,
        executionState: state.algorithm.getState(),
        finished,
        selectionState: SelectionState.inactive
      }
    case SelectionState.algorithmSelection:
      return {...state, algorithmType: newAlgorithmType}
    default:
      throw new Error('No such action '+type);
  }
}

export const Visualization = () => {
  const [selectionState, selectionDispatcher] = useReducer(reducer, {
    selectionState: SelectionState.notSelected,
    wallSquares: new PointList(),
    selectedOrigin: Point.of(Math.floor(N_ROWS/2), Math.floor(N_COLUMNS/3)),
    selectedDestination: Point.of(Math.floor(N_ROWS/2), Math.floor(2 * N_COLUMNS/3)),
    algorithmType: null,
    algorithm: null,
    executionState: null,
    finished: false,
    isDragging: false,
    readyToExecute: false
  });
  
  return (
    <>
      <div
        className='main-container'
        style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <SelectionContext.Provider value={{
          selectionState,
          selectionDispatcher
        }}>
          <SelectionMenu/>
          <VisualizationGrid></VisualizationGrid>
        </SelectionContext.Provider>
      </div>
    </>
  )
} 