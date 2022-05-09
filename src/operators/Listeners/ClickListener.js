import { useEffect } from "react"

export default function ClickListener (callback, ref=null){
    useEffect(
        ()=>{
            //Bind the event listener
            document.addEventListener("mousedown", callback);

            //Unbind the event listener to avoid memory leaks
            document.removeEventListener("mousedown", callback);
        }
    , [ref]);
}

// some functions to use as callbacks for clickListener