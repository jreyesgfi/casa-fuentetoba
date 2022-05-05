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

export default function ScreenController (props) {
    // create a static value for the offset
    //generalOffset = 0;

    // define the screen properties as states
    const [offset,setOffset] = useState([0]);

    const screenUpToDevice = () => {
        const ua = navigator.userAgent;
        const ratio = window.devicePixelRatio || 1;
        var height = 0;
        //tablet
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            height = window.innerHeight;
        }
        //mobile
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            height = window.screen.height;
        }
        //desktop
        else{
            height = window.innerHeight;
        }
        return window.innerHeight;
        
    };
    const [screenSize, setScreenSize] = useState(screenUpToDevice())
    
    useEffect(
        ()=>{setScreenSize(screenUpToDevice())},
        [screenUpToDevice()]
    )

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
        changeWindowOffset(utilScreenSize*(numScreen),time);

        console.log(screenPercentage, screenSize, utilScreenSize, offset)
    }

    // actually showed screen height
    const screenPercentage = (100 * screenHeightFactor - navHeight)/100;
    let utilScreenSize = screenPercentage * screenSize;

    // app Screen Number
    let appScreenNumber = parseInt((offset+utilScreenSize/2) / utilScreenSize);

    





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
                <ScreenFront 
                    screenStyle= {screenStyle}
                    focus= {0==appScreenNumber}>
                </ScreenFront>
                <ScreenGallery
                    screenStyle= {screenStyle}
                    focus= {1==appScreenNumber}>
                </ScreenGallery>
                <ScreenCharacteristics 
                    screenStyle= {screenStyle}
                    focus= {2==appScreenNumber}>
                </ScreenCharacteristics> 
                <ScreenLocation
                    screenStyle= {screenStyle}
                    focus= {3==appScreenNumber}>
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
