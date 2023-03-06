import React from 'react';
import './App.css';
import { Visualization } from './components/VisualizationGrid/Visualization';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {About} from './pages/About';
import {Navbar} from './components/Navbar/Navbar';
import GlobalStyle from './GlobalStyle';

function App() {
  
  return (
    <div
      className='App'
    >
      <Router>
        <GlobalStyle/>
        <Navbar />
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
      </Router>
    </div>
  );
}

export default App;
