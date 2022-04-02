import React, { useState, useEffect } from "react";
import Screen1 from './Screen1/Screen1';
import LoadingSpinner from "../spinner/Spinner";
import BottomNavBar from "../nav/BottomNavBar";
import OffsetEventListener from "../../operators/OffsetController";

export default function ScreenController (props) {
    // create a static value for the offset
    //generalOffset = 0;

    // define the screen properties as states
    const [offset,setOffset] = useState([0]);
    const [screenSize, setScreenSize] = useState(window.innerHeight)

    // update the offset
    useEffect( ()=> {
        OffsetEventListener(()=>{setOffset(window.scrollY)})
    },[]);


    // app Screen Number
    let appScreenNumber = parseInt((offset+screenSize/2) / screenSize);


    //***************************//
    // GENERAL CONFIG FOR SCREENS

    // Global values for the screen
    const screenHeightFactor = 1;





    // define the dimensions of the general screen
    const screenStyle = {
        height:String(100 * screenHeightFactor) + 'vh'
    }


    return(
        

        <div key={props.isLoading} className="hi">
            { //Build all the screens or load, but both are loading
            }
            <div className={props.isLoading?'Normal':'hide'}>
                <LoadingSpinner/> 
            </div>
            <div className={props.isLoading?'hide':'Normal'}>
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {0==appScreenNumber}>
                </Screen1>
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </Screen1>
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </Screen1> 

            {   /* BottomNavBar */  }
                <BottomNavBar
                    appScreenNumber={appScreenNumber}
                >
                </BottomNavBar>
            </div>

        </div>
    )
    
}
