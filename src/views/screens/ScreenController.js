import React from "react";
import Screen1 from './Screen1/Screen1';
import LoadingSpinner from "../spinner/Spinner";

export default class ScreenController extends React.Component{
    // create a static value for the offset
    //generalOffset = 0;

    constructor(props){

        super(props)

        // general screen properties
        this.offset = props.offset || null;        
        this.screenSize = props.screenSize || null;

        // states of the app
        this.isLoading = props.isLoading;

        
        //const screenHeihgt = props.screenSize.current[1] || null;

        // what is the current screen number
        //this.screenNumber = Math.floor(this.offset/this.screenHeihgt)

        // keep updated the screens dimensions in css
        


    }

    render(){
        console.log('the loading is',this.isLoading)
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
                </div>
                

            </div>
        )
    }
}