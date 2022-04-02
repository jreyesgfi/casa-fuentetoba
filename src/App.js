import { useEffect, useRef, useState } from 'react';
import './App.css';
import ScreenController from './views/screens/ScreenController';
import BottomNavBar from './views/nav/BottomNavBar';
import offsetEventListener from './operators/OffsetController';


function App() {
  
  // A React state to manage the loading
  const [isLoading, setIsLoading] = useState(true);
  
  // Await with spinner to load
  useEffect(
    ()=>{
      setTimeout(()=>
        {
          setIsLoading(false);
        }, 2000)
    },
    []
  )


  


  

  return (
    <div className="App">
      <ScreenController isLoading={isLoading}>
      </ScreenController>
    </div>
  );
}

export default App;

