import React from "react";
import { AlgorithmSelection } from './AlgorithmSelection';
import { ExecuteButton } from './ExecuteButton';
import { ClearSelection } from "./ClearSelection";
import { FillMazeSelection } from "./FillMazeSelection";

export const SelectionMenu = () => {
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
      <FillMazeSelection/>
      
      <AlgorithmSelection/>
      
      <ExecuteButton/>

      <ClearSelection/>
    </div>
  )
}