import { useEffect, useState } from 'react';
import './App.css';
import ScreenController from './views/screens/ScreenController';
import BottomNavBar from './views/nav/BottomNavBar';
import offsetEventListener from './operators/OffsetController';
import ClickListener, { conse } from './operators/Listeners/ClickListener';
import CreateRipple from './views/buttons/Ripple';


function App() {
  
  // A React state to manage the loading
  const [isLoading, setIsLoading] = useState(true);
  
  // Await with spinner to load
  useEffect(
    ()=>{
      setTimeout(()=>
        {
          setIsLoading(false);
        }, 3000)
    },
    []
  )

  //set the Listeners (they have the useEffect in their definition)
  // const [rippleEvent, setRippleEvent] = useState(null);

  // ClickListener(async (e, ref) => {
  //   //Create the ripple
  //   setRippleEvent(e);

  //   //
  //   console.log(ref)
  //   await new Promise(() => {
  //     setTimeout(() => {
  //       setRippleEvent(null);
  //     }, 500);
  //   });

  // }, 'hola');
  
  

  


  

  return (
    <div className="App">
      <ScreenController isLoading={isLoading}>
      </ScreenController>
      {/* <CreateRipple event ={rippleEvent}>
      </CreateRipple> */}
    </div>
  );
}

export default App;

