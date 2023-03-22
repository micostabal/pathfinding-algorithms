import { useReducer } from 'react';
import {VisualizationGrid} from '../VisualizationGrid/VisualizationGrid';
import './Visualization.css';
import { SelectionContext } from '../VisualizationGrid/SelectionContext';
import  { SelectionState } from '../VisualizationGrid/selectionStates/SelectionState';
import {
  DEFAULT_START_POSITION,
  DEFAULT_DESTINATION_POSITION
} from '../VisualizationGrid/Constants';
import { PointList } from '../DataStructures/PointList';
import { algorithmFactory } from "../../PathFindingAlgorithms/AlgorithmFactory";
import { SelectionStateFactory } from '../VisualizationGrid/selectionStates/SelectionStateFactory';
import { GridActions } from '../VisualizationGrid/GridActions';
import { N_ROWS, N_COLUMNS } from '../VisualizationGrid/Constants';
import { SelectionMenu } from "./SelectionMenu";
import { mazeFactory } from '../../mazes/MazeFactory';

const reducer = (state, {
  type,
  i,
  j,
  newAlgorithmType,
  mazeType,
  executionInterval
}) => {
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
      if (state.executionInterval!==null) {
        clearInterval(state.executionInterval);
      }
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
        paused: false,
        selectionState: SelectionState.inactive
      }
    case SelectionState.nextIter:
      state.algorithm.executeIteration();
      const isFinished = state.algorithm.isFinished();
      return {
        ...state,
        executionState: state.algorithm.getState(),
        finished: isFinished,
        pathDisplayIndex: 0,
        paused: false,
        selectionState: SelectionState.inactive,
        executionInterval
      }
    case SelectionState.algorithmSelection:
      return {...state, algorithmType: newAlgorithmType}
    case SelectionState.fillWithMaze:
      const maze = mazeFactory.create(mazeType);
      return {
        ...state,
        selectedOrigin: maze.getOrigin(),
        selectedDestination: maze.getDestination(),
        wallSquares: maze.getWalls()
      }
    case SelectionState.addNodeToPathDisplay:
      return {
        ...state,
        pathDisplayIndex: state.pathDisplayIndex+1
      };
    case SelectionState.clearSelection:
      if (state.executionInterval!==null) {
        clearInterval(state.executionInterval);
      }
      return {
        ...state,
        selectedOrigin: DEFAULT_START_POSITION,
        selectedDestination: DEFAULT_DESTINATION_POSITION,
        wallSquares: new PointList(),
        algorithmType: null,
        algorithm: null,
        finished: false,
        paused: false,
        executionState: null,
        selectionState: SelectionState.notSelected
      };
    case SelectionState.pauseExecution:
      clearInterval(state.executionInterval);
      return {
        ...state,
        executionInterval: null,
        paused:true
      };
    default:
      throw new Error('No such action '+type);
  }
}

export const Visualization = () => {
  const [selectionState, selectionDispatcher] = useReducer(reducer, {
    selectionState: SelectionState.notSelected,
    wallSquares: new PointList(),
    selectedOrigin: DEFAULT_START_POSITION,
    selectedDestination: DEFAULT_DESTINATION_POSITION,
    algorithmType: null,
    algorithm: null,
    executionState: null,
    executionInterval: null,
    pathDisplayIndex: null,
    finished: false,
    paused: false,
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