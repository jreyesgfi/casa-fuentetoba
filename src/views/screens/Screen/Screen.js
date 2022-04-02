import React from "react";
import './screen.css';


// Global values for the screen
export const screenHeightFactor = 1;



export default class Screen extends React.Component{
    // create a static value for the offset
    //generalOffset = 0;

    static screenCount = 0;

    constructor(props){
        super(props);
        // Define the screen number
        console.log(Screen.screenCount)
        this.screenNumber = Screen.screenCount;
        Screen.screenCount += 0.1;



        // define the dimensions of the general screen
        this.screenStyle = {
            height:String(100 * screenHeightFactor) + 'vh'
        }

        // define the state of focus
        this.focus = true;
    }


    render(){
        
        return(
            <div propsToUpdate={this.props}>
            </div>
        )
    }
}