import { useEffect } from "react"

export default function ClickListener (callback, ref=null){
    useEffect(
        ()=>{
            //Bind the event listener
            document.addEventListener("mousedown", (e)=>{
                console.log(e)
                callback(e,ref)});

            //Unbind the event listener to avoid memory leaks
            document.removeEventListener("mousedown", (e)=>{
                console.log(e)
                callback(e,ref)});
        }
    , [ref]);
}

// some functions to use as callbacks for clickListener

export function handleClickOutside(event, ref) {
    if (ref.current && !ref.current.contains(event.target)) {
      alert("You clicked outside of me!");
    }
}
export function conse(event,ref) {
    console.log('the event is ', event, ' and the ref is ',ref)
}