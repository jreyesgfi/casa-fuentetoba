import { height } from "@material-ui/system";
import { element } from "prop-types";
import { useState } from "react";

export default function CreateRipple(props){
    const event = props?.event||null;

    if (!event){
        return (
            null
        );
    }
    
    const width= 20;
    const height=20;

    const style={
        width:`${width}px`,
        height:`${height}px`,
        top:`${(event?.clientY||event.y)-height/2}px`,
        left : `${(event?.clientX||event.x)-width/2}px`
    };

    return(
        <div className='ripple' style={style}>
        </div> 
    )
}