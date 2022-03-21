import React from "react";
import Screen1 from './Screen1/Screen1'



export default class ScreenController extends React.Component{
    // create a static value for the offset
    //generalOffset = 0;

    constructor(props){

        super(props)

        // general screen properties
        this.offset = props.offset || null;        
        this.screenSize = props.screenSize || null;
        //const screenHeihgt = props.screenSize.current[1] || null;

        // what is the current screen number
        //this.screenNumber = Math.floor(this.offset/this.screenHeihgt)

        // keep updated the screens dimensions in css
        


    }

    render(){
        return(
            <div>
                { //Build all the screens
                }
                <Screen1>
                </Screen1>
                <Screen1>
                </Screen1>  

            </div>
        )
    }
}