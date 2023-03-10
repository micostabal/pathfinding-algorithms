import { useState, useReducer, useContext, useEffect } from 'react';
import {VisualizationGrid} from './VisualizationGrid';
import './Visualization.css';
import { SelectionContext } from './SelectionContext';
import  { SelectionState } from './selectionStates/SelectionState';
import { Point } from '../../GridComponents/Point';
import { PointList } from '../../GridComponents/PointList';
import { AStar } from "../../PathFindingAlgorithms/AStar";
import { EXECUTION_INTERVAL, N_COLUMNS, N_ROWS } from './Constants';
import { SelectionStateFactory } from './selectionStates/SelectionStateFactory';
import { GridActions } from './GridActions';

const DropDownOption = ({text}) => {
  return (
    <li
      className='dropdown-option'
      style={{textAlign: 'left'}}
      onClick={() => {
        console.log(text);
      }}
    >
      {text}
    </li>
  )
}

const DropDownContent = (props) => {
  const {children} = props;
  return (
    <div
      className='dropdown-content'
    >
      {children}
    </div>
  );
}

const SelectionElement = (props) => {
  const {
    text, 
    disabled,
    children,
    onClick
  } = props;
  const [buttonColor, setButtonColor] = useState('orange');
  
  return (
    <>
      <div
        className={disabled ? 'dropdown-disabled' : 'dropdown-enabled'}
        style={{
          position: 'relative',
          display: 'inline-block',
          cursor: disabled ? 'not-allowed' : 'normal'
        }}
      >
        <button
          style={{
            border: '1px solid black',
            borderRadius: '3px',
            backgroundColor: buttonColor,
            padding: '0.3em',
            fontWeight: 'bold'
          }}
          disabled={disabled}
          onMouseEnter={() => {
            setButtonColor('blue');
          }}
          onMouseLeave={() => {
            setButtonColor('orange');
          }}
          onClick={onClick}
        >
          {text}
        </button>
        {children}
      </div>
    </>
  )
}
const AlgorithmSelection = () => {
  const {
    selectionState: { algorithm }
  } = useContext(SelectionContext);
  
  useEffect( () => {
    console.log(algorithm);
  }, [algorithm]);
  
  return (
    <SelectionElement
      text={'Selected Algorithm'}
      disabled={false}
    >
      <DropDownContent>
        <DropDownOption text={'Dijkstra'}></DropDownOption>
        <DropDownOption text={'A*'}></DropDownOption>
        <DropDownOption text={'BFS'}></DropDownOption>
        <DropDownOption text={'DFS'}></DropDownOption>
      </DropDownContent>
    </SelectionElement>
  )
}

const ExecuteButton = () => {
  const {
    selectionDispatcher,
    selectionState: { algorithm }
  } = useContext(SelectionContext);
  const [executing, setExecuting] = useState(false);
  
  useEffect( () => {
    if (executing) {
      let executionInterval = setInterval( () => {
        if (algorithm.finished) {
          clearInterval(executionInterval);
          return;
        }
        selectionDispatcher({type: SelectionState.nextIter});
      }, EXECUTION_INTERVAL);
      return () => clearInterval(executionInterval);
    }
    console.log(algorithm);
  }, [executing, algorithm, selectionDispatcher]);
  
  return (
    <SelectionElement
      text={executing ? "Pause" : "Execute"}
      disabled={executing}
      onClick={() => {
        setExecuting( (ex) => !ex);
        selectionDispatcher({type: SelectionState.execute});
      }}
    />
  )
}

const SelectionMenu = () => {
  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: '3em',
      justifyContent: 'space-evenly',
      backgroundColor: '#FFA500',
      borderRadius: '0.2em'
    }}>
      <SelectionElement
        text={'Fill with Maze'}
        disabled={true}
        onClick={() => {console.log('clicked fill with maze');}}
      >
      </SelectionElement>
      
      <AlgorithmSelection/>
      
      <ExecuteButton/>
    </div>
  )
}

const reducer = (state, {type, i, j}) => {
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
      const newAlgorithm = new AStar(
        N_ROWS,
        N_COLUMNS,
        state.wallSquares,
        state.selectedOrigin,
        state.selectedDestination
      );
      state.setAlgorithm(newAlgorithm)
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
      };
      return {
        ...state,
        executionState: state.algorithm.getState(),
        finished,
        selectionState: SelectionState.inactive
      }
    default:
      throw new Error('No such action '+type);
  }
}

export const Visualization = () => {
  const [algorithm, setAlgorithm] = useState(null);
  const [selectionState, selectionDispatcher] = useReducer(reducer, {
    selectionState: SelectionState.notSelected,
    wallSquares: new PointList(),
    selectedOrigin: Point.of(Math.floor(N_ROWS/2), Math.floor(N_COLUMNS/3)),
    selectedDestination: Point.of(Math.floor(N_ROWS/2), Math.floor(2 * N_COLUMNS/3)),
    algorithm,
    setAlgorithm,
    executionState: null,
    finished: false,
    isDragging: false
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
          <div
            className=''
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <VisualizationGrid></VisualizationGrid>
          </div>
        </SelectionContext.Provider>
      </div>
    </>
  )
} 