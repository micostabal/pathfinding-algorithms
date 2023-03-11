import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
} from './NavbarElements';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { ImSun } from 'react-icons/im';
import {WiMoonWaningCrescent2} from 'react-icons/wi';
import './styles.css';

export const Navbar = ({theme, themeSetter}) => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Visualization
          </NavLink>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
        </NavMenu>
        
        <NavBtn>
          <Toggle
            className='theme-toggle'
            onChange = {(newValue) => {
              themeSetter(theme==='light' ? 'dark' : 'light')
            }}
            icons={{checked: <ImSun style={{height: '0.8em', transform: `translate(0px, -0.1em)`}}/>,
            unchecked: <WiMoonWaningCrescent2 style={{height: '0.9em', transform: `translate(0px, -0.1em)`}}/>
          }}/>
        </NavBtn>
      </Nav>
    </>
  )
}