import React, { useState, useEffect } from "react";
import ScreenFront from './ScreenFront/ScreenFront';
import LoadingSpinner from "../spinner/Spinner";
import BottomNavBar from "../nav/BottomNavBar";
import {changeWindowOffset, offsetEventListener} from "../../operators/OffsetController";
import ScreenGallery from "./ScreenGallery/ScreenGallery";
import ScreenCharacteristics from "./ScreenCharacteristics/ScreenCharacteristics";
import ScreenCalendar from "./ScreenCalendar/ScreenCalendar";
import ScreenLocation from "./ScreenLocation/ScreenLocation";
import ScreenContact from "./ScreenContact/ScreenContact";
import TopNavBar from "../nav/TopNavBar";
import deviceUsed from "../../operators/SessionInformation/DeviceUsed";

export default function ScreenController (props) {
    // create a static value for the offset
    //generalOffset = 0;

    // define the screen properties as states
    const [offset,setOffset] = useState(0);

    

    const screenUpToDevice = () => {
        const ratio = window.devicePixelRatio || 1;
        const device = deviceUsed();
        var height = 0;
        //tablet
        if (device==='tablet') {
            height = window.innerHeight;
        }
        //mobile
        else if (device==='mobile') {
            height = window.screen.height - 200;
        }
        //desktop
        else{
            height = window.innerHeight - 65;
        }
        return height;
        
    };
    const [screenSize, setScreenSize] = useState(screenUpToDevice())
    
    useEffect(
        ()=>{
            setScreenSize(screenUpToDevice())},
        [window.innerHeight]
    )

    //***************************//
    // GENERAL CONFIG FOR SCREENS

    // Global values for the screen
    const screenHeightFactor = 1;
    const topNavHeight =0.1*screenSize;

    // change the window offset to move into a certain screen
    const moveToScreen = function(numScreen){
        // numScreen starts in 0
        changeWindowOffset(screenSize*(numScreen),offset,4000);
    }

    // actually showed screen height
    const screenPercentage = (100 * screenHeightFactor)/100;
    let utilScreenSize = screenPercentage * screenSize;

    // app Screen Number
    const [appScreenNumber, setAppScreenNumber] = useState(parseInt((offset+200)/screenSize));

    // update the offset
    useEffect( ()=> {
        offsetEventListener( ()=>{
            setOffset(window.scrollY);
            setAppScreenNumber(parseInt((window.scrollY+200)/screenSize));
        });
    },[]);


    





    // define the dimensions of the general screen
    const screenStyle = {
        position:'relative',
        height:String(screenSize) + 'px',
        border:'1pt solid red'
    }


    return(
        

        <div key={props.isLoading} className="all-screens-container">
            { //Build all the screens or load, but both are loading
            }
            <div className={props.isLoading?'Normal':'hide'}>
                <LoadingSpinner/> 
            </div>
            
            <div className={props.isLoading?'hide':'Normal'}>
            {   /* BottomNavBar */  }
                <TopNavBar
                    appScreenNumber={appScreenNumber}
                    moveToScreen={moveToScreen}
                >
                </TopNavBar>
                <ScreenFront 
                    screenStyle= {screenStyle}
                    focus= {0==appScreenNumber}
                    moveToScreen= {()=>{moveToScreen(1)}}>
                </ScreenFront>
                <ScreenGallery
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}
                    moveToScreen= {()=>{moveToScreen(2)}}>
                </ScreenGallery>
                <ScreenCharacteristics 
                    screenStyle= {screenStyle}
                    focus= {2==appScreenNumber}
                    moveToScreen= {()=>{moveToScreen(4)}}>
                </ScreenCharacteristics> 
                <ScreenLocation
                    screenStyle= {screenStyle}
                    focus= {3==appScreenNumber}
                    moveToScreen= {()=>{moveToScreen(4)}}>
                </ScreenLocation> 
                <ScreenCalendar 
                    screenStyle= {screenStyle}
                    focus= {4==appScreenNumber}
                    finalScreen= {()=>{moveToScreen(5)}}>
                </ScreenCalendar> 
                <ScreenContact
                    screenStyle= {screenStyle}
                    focus= {5==appScreenNumber}>
                </ScreenContact> 
                <div className= 'empty-bar' style={{width:'100vw',height:String(100-screenPercentage*100) + 'vh'}}>
                </div>
            {   /* BottomNavBar 
                <BottomNavBar
                    appScreenNumber={appScreenNumber}
                    moveToScreen={moveToScreen}
                >
                </BottomNavBar>*/  }
            </div>

        </div>
    )
    
}
