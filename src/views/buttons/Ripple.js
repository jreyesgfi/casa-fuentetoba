import { height } from "@material-ui/system";
import { element } from "prop-types";
import { useState } from "react";

export default function CreateRipple(props){
    const event = props?.event||null;
    if (!event){
        console.log(null)
        return null;
    }
    console.log(event)
    


    const style={
        width:'40px',
        height:'40px',
        top:`${event.clientY}px`,
        left : `${event.clientX}px`
    };

    return(
            <span className='ripple' style={style}>
            </span> 
    )
}