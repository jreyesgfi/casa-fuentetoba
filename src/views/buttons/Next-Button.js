

export default function NextButton(props){
    return(
        <div className='button next-button'
        onClick={()=>{props?.nextScreen()}}>
            Siguiente
        </div>
    )
}