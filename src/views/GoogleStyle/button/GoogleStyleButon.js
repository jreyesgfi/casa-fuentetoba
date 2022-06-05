import "./google-style-button.css"

export default function GoogleStyleButton(props){
    return(
        <div className={`google-style-button ${props?.['style']==='border'?' border-button':''}`}
            onClick={()=>{props?.['clickFunction']()}}>
            {props?.['label']||'Next'}
        </div>
    )
}