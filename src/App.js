import { useEffect, useRef, useState } from 'react';
import './App.css';
import ScreenController from './views/screens/ScreenController';
import BottomNavBar from './views/nav/BottomNavBar';


function App() {
  
  // A React state to manage the loading
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(
    ()=>{
      setTimeout(()=>
        {
          setIsLoading(false);
          console.log('hi')
        }, 1000)
    },
    []
  )


  

  return (
    <div className="App">
      <ScreenController isLoading={isLoading}>
      </ScreenController>
      <BottomNavBar>
      </BottomNavBar>
    </div>
  );
}

export default App;

