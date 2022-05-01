import { useEffect, useState } from 'react';
import './selection-wheel.css';


export default function SelectionWheel(props){

    var elementsArray = props.elementsArray;
    //limit the size
    elementsArray = elementsArray.map((element)=>{
        return (element.length > 10 & typeof(element)=='string') ? element.slice(0,7) +'':element;
    })

    // elements array props
    const size = elementsArray.length;
    const [selectedPos, setSelectedPos] = useState(size + (props.initialPos|| 0));

    // material ui props
    //width and infinitiveLoop
    
    // function to remit the selection
    //props.callback()

    // check if next entry has to be active
    const nextEntryHidden = ()=> (props?.infiniteLoop != true && (selectedPos)%size==(size-1));
    const previousEntryHidden = ()=> (props?.infiniteLoop != true && (selectedPos)%size==0);

    useEffect(
        ()=>{props?.callback((selectedPos)%size)}
    ,[selectedPos]);

    return(
        <div className='selection-wheel'
            style={{width:`${props.width}vw`}}
        >
            <div className={`${
                   nextEntryHidden() ? 'hidden':''
                }`}
                onClick={()=>{
                    {setSelectedPos(selectedPos+1)}
                } }>
                    <div className='up-arrow arrow'>
                    </div>
                    <div className='next-selection'>
                        {elementsArray[(selectedPos+1)%size]}
                    </div>
            </div>
            
            <div 
                className='current-selection'
                onClick={()=>{props?.clickCallback()}}
            >
                {elementsArray[(selectedPos)%size]}
            </div>

            <div className={`${previousEntryHidden() ? 'hidden':''}`}
                    onClick={()=>{setSelectedPos(selectedPos+size-1)}}
                >
                    <div className='previous-selection'>
                        {elementsArray[(selectedPos-1)%size]}
                    </div>
                    <div className='down-arrow arrow'>
                    </div>
            </div>



            
        </div>
    )

}
