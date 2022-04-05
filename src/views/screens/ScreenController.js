import React, { useState, useEffect } from "react";
import Screen1 from './Screen1/Screen1';
import LoadingSpinner from "../spinner/Spinner";
import BottomNavBar from "../nav/BottomNavBar";
import {changeWindowOffset, offsetEventListener} from "../../operators/OffsetController";
import ScreenGallery from "./ScreenGallery/ScreenGallery";

export default function ScreenController (props) {
    // create a static value for the offset
    //generalOffset = 0;

    // define the screen properties as states
    const [offset,setOffset] = useState([0]);
    const [screenSize, setScreenSize] = useState(window.innerHeight)

    //***************************//
    // GENERAL CONFIG FOR SCREENS

    // Global values for the screen
    const screenHeightFactor = 1;
    const navHeight = 16; //vh

    // update the offset
    useEffect( ()=> {
        offsetEventListener(()=>{setOffset(window.scrollY)})
    },[]);

    // change the window offset to move into a certain screen
    const moveToScreen = function(numScreen,time){
        // numScreen starts in 0
        changeWindowOffset(realScreenSize*(numScreen),time);
    }

    // actually showed screen height
    const screenPercentage = (100 * screenHeightFactor - navHeight)/100;
    let realScreenSize = screenPercentage * screenSize;

    // app Screen Number
    let appScreenNumber = parseInt((offset+realScreenSize/2) / realScreenSize);

    





    // define the dimensions of the general screen
    const screenStyle = {
        position:'relative',
        height:String(screenPercentage*100) + 'vh'
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
                <ScreenGallery
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </ScreenGallery>
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {2==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {3==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {4==appScreenNumber}>
                </Screen1> 
                <Screen1 
                    screenStyle= {screenStyle}
                    focus= {5==appScreenNumber}>
                </Screen1> 

            {   /* BottomNavBar */  }
                <BottomNavBar
                    appScreenNumber={appScreenNumber}
                    moveToScreen={moveToScreen}
                >
                </BottomNavBar>
            </div>

        </div>
    )
    
}
