import { useState } from 'react';
import {VisualizationGrid} from './VisualizationGrid';
import './Visualization.css';
import { SideView } from './SideView';
import { SelectionView } from './SelectionView';

const DropDownOption = ({text}) => {
  return (
    <li
      className='dropdown-option'
      style={{textAlign: 'left'}}
      onClick={() => {console.log(text);}}
    >
      {text}
    </li>
  )
}

const DropDownContent = () => {
  return (
    <div
      className='dropdown-content'
    >
      <DropDownOption text={'hola ke ase'}></DropDownOption>
      <DropDownOption text={'filling maze'}></DropDownOption>
      <DropDownOption text={'A* pathfinding algorithm'}></DropDownOption>
    </div>
  );
}

const DropDownMenu = ({text, disabled}) => {
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
        >
          {text}
        </button>
        <DropDownContent />
      </div>
    </>
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
      backgroundColor: 'cyan'
    }}>
      <DropDownMenu
        text={'Fill with Maze'}
        disabled={false}
      >
      </DropDownMenu>

      <DropDownMenu
        text={'Selected Algorithm'}
        disabled={true}
      >
      </DropDownMenu>

      <DropDownMenu
        text={'Execute'}
        disabled={false}
      >
      </DropDownMenu>
    </div>
  )
}

export const Visualization = () => {
  return (
    <>
      <div
        className='main-container'
        style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <SelectionMenu/>
        <div
          className=''
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            className=''
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '30%'
            }}
          >
            <SideView title={"Selection"}>
              <SelectionView />
            </SideView>
          </div>
          <VisualizationGrid></VisualizationGrid>
          <div
            className=''
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '30%'
            }}
          >
            <SideView title={"Iterations"}></SideView>
          </div>
          
        </div>
      </div>
    </>
  )
} 