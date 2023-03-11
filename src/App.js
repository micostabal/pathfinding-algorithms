import React, { useState } from 'react';
import './App.css';
import { Visualization } from './components/Visualization/Visualization';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {About} from './pages/About';
import {Navbar} from './components/Navbar/Navbar';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import {lightTheme, darkTheme} from "./styles/MainStyles";

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div
      className='App'
    >
      <Router>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <>
            <GlobalStyle/>
            <Navbar theme={theme} themeSetter={setTheme} />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%',
              marginTop: '3em'
            }}>
              <Routes>
                <Route path='/' exact element={<Visualization/>}/>
                <Route path='/about' exact element={<About/>} />
              </Routes>
            </div>
          </>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
