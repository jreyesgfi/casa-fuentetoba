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

    useEffect(
        ()=>{props?.callback((selectedPos)%size)}
    ,[selectedPos]);

    return(
        <div className='selection-wheel'
            style={{width:`${props.width}vw`}}>
            <div className={`${
                    (props?.infiniteLoop != true && (selectedPos)%size==(size-1))
                    ? 'hidden':''
                }`}>
                    <div className='up-arrow arrow'
                        onClick={()=>{setSelectedPos(selectedPos+1)}}>
                    </div>
                    <div className='next-selection'>
                        {elementsArray[(selectedPos+1)%size]}
                    </div>
            </div>
            
            <div className='current-selection'>
                {elementsArray[(selectedPos)%size]}
            </div>

            <div className={`${
                    (props?.infiniteLoop != true && (selectedPos)%size==0)
                    ? 'hidden':''
                }`}>
                    <div className='previous-selection'>
                        {elementsArray[(selectedPos-1)%size]}
                    </div>
                    <div className='down-arrow arrow'
                        onClick={()=>{setSelectedPos(selectedPos+size-1)}}>
                    </div>
            </div>



            
        </div>
    )

}
