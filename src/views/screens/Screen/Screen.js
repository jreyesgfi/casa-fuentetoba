import React from "react";
import './screen.css';


// Global values for the screen
export const screenHeightFactor = 1.2;



export default class Screen extends React.Component{
    // create a static value for the offset
    //generalOffset = 0;

    constructor(props){
        super(props);

        // define the dimensions of the general screen
        this.screenStyle = {
            height:String(100 * screenHeightFactor) + 'vh'
        }

    }


    render(){
        return(
            <div>
            </div>
        )
    }
}