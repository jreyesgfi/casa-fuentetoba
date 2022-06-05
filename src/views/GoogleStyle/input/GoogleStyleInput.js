import { useState } from "react";
import "./google-style-input.css";

export default function GoogleStyleInput(props){
    const [text, SetText] = useState('');
    return(
        <div className="input-container">
            <input type={props?.['type']||'text'}
                    className={`input-element 
                    ${props?.['class']||props?.['label']}
                    ${props?.['longText']===true?'long-text':''}`}
                    onChange={(event)=>{
                        const value = event?.target?.value;
                        SetText(value);
                        //set the information to the form
                        props?.['setValue'](value);
                    }}
                    // name="name"
                    // id="name"
                    // autocomplete="off" value=""
                    // aria-labelledby="placeholder-fname"
                    >
            </input>
            <label className={`input-label ${text?.[0]?'filled':''}`}>
                {props?.['label']||props?.['class']||'Escriba aquí'}
            </label>
        </div>
    )
}