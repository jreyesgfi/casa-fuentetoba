import { useEffect, useRef, useState } from 'react';
import './App.css';
import ScreenController from './views/screens/ScreenController';
import TopNavBar from './views/nav/TopNavBar';
import BottomNavBar from './views/nav/BottomNavBar';


function App() {
  
  return (
    <div className="App">
      <TopNavBar>
      </TopNavBar>
      <ScreenController>
      </ScreenController>
      <BottomNavBar>
      </BottomNavBar>
    </div>
  );
}

export default App;
