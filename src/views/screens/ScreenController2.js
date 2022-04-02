import React from "react";
import Screen1 from './Screen1/Screen1';
import LoadingSpinner from "../spinner/Spinner";
import BottomNavBar from "../nav/BottomNavBar";
import OffsetEventListener from "../../operators/OffsetController";

class ScreenController2 extends React.Component{
    // create a static value for the offset
    //generalOffset = 0;

    constructor(props){

        super(props)

        // Set the offset listener
        OffsetEventListener(this.scrollCallBack)
        
        // general screen properties
        this.state = {'offset':window.scrollY};        
        this.screenSize = props.screenSize || null;

        // states of the app
        this.isLoading = props.isLoading;

        //
        


        //const screenHeihgt = props.screenSize.current[1] || null;

        // what is the current screen number
        //this.screenNumber = Math.floor(this.offset/this.screenHeihgt)

        // keep updated the screens dimensions in css
        


    }

    scrollCallBack(){
        this.setState({
            'offset':window.scrollY,
        })
    }

    render(){
        console.log(this.offset)
        //console.log(this.screenSize)
        
        return(
            <div key={this.isLoading} className="hi">
                { //Build all the screens or load, but both are loading
                }
                <div className={this.props.isLoading?'Normal':'hide'}>
                    <LoadingSpinner/> 
                </div>
                <div className={this.props.isLoading?'hide':'Normal'}>
                    <Screen1>
                    </Screen1>
                    <Screen1>
                    </Screen1> 

                    {   /* BottomNavBar */  }
                    <BottomNavBar>
                    </BottomNavBar>
                </div>

            </div>
        )
    }
}