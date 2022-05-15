import { useState } from 'react';
import './screen-gallery.css';

import undoIcon from "./../../../icons/undo-arrow.png"


import { globalFolder } from '../../../operators/photoImporter/GalleryPhotoImporter';
import { setOffset } from '../../../operators/OffsetController';


export default function ScreenGallery(props) {
    //example of photo dict
    const roomDict = {
        'TERRAZA':"/images/photolake/terraza/terraza-2.jpeg",
        'SALÓN':"/images/photolake/salon/salon-1.jpeg",
        'BAÑOS':"/images/photolake/baño/baño-1.jpeg",
        'HABITACIONES':"/images/photolake/habitacion/habitacion-1.jpeg",
        'COCINA':"/images/photolake/cocina/cocina-1.jpeg",
    }

    
    //react state to track the current room clicked
    const [selectedRoom, setSelectedRoom] = useState('SALÓN');

    //react state to keep the id of the current main photo
    const [mainPhotoNum, setMainPhotoNum] = useState(0)

    /* DIFERENT ACTIONS WHEN CLICK */

    // open the image
    const [photoFullScreen,setPhotoFullScreen] = useState(false);



    // generate the buttons to select room
    const selectButtonGenerator= function(name){
        return(
            <div className= "flex-item room-buttons-container"
                onClick = {()=>{
                    setSelectedRoom(name);
                    setMainPhotoNum(0);
                }}
            >
              <img className='photo'
                    src={roomDict[name]}
              ></img>
              <div className= 
              {`button-mask  
                ${name==selectedRoom?
                'selected':'not-selected'}`}>
              </div>
              <p className={`${name==selectedRoom?
                'white-text':'dark-text'}`
                /*${name.length>7?'long-text':''}`*/}>
                  {name.length>7?'HAB.':name}
                </p>
            </div>
        )
    }

    // return the main photo of the gallery
    const mainPhotoGenerator = function(){
        const numTotalPhotos = globalFolder[selectedRoom].length;

        if (numTotalPhotos === 0){ return}

        var currentPhotoPos = mainPhotoNum%numTotalPhotos;

        if ( mainPhotoNum < 0){ 
            currentPhotoPos = (numTotalPhotos-1);
            setMainPhotoNum(numTotalPhotos-1);
        }

        

        return(
            <div className={`${!photoFullScreen? 'main-photo-row flex-box':'full-screen-photo'}`}>
                <img 
                src={globalFolder[selectedRoom][currentPhotoPos]['imgUrl']}
                onClick={()=>{setPhotoFullScreen(!photoFullScreen)}}
                >
                </img>
                <div className="contenedor-icono-cambio-imagen flex-box">
                    <div className= 'prev-photo-button button'
                        onClick={()=>{setMainPhotoNum(mainPhotoNum-1)}}>
                        {'<'}
                    </div>
                    <div className= 'next-photo-button button'
                        onClick={()=>{setMainPhotoNum(mainPhotoNum+1)}}>
                        {'>'}
                    </div>
                </div>
            </div>
        )
    }
    
    
    
    return(
        <div className= "gallery-screen screen" style = {props.screenStyle}>
            <div className= "header gallery-header">
                
                <h2 className="header-title"> GALERIA</h2>

                <div className="house-draft-container">
    
                </div>

                <div className="header-division-line"></div>
                
            </div>
            {!photoFullScreen &&
                <div className= "photos-container">
                    <div className="top-photo-row flex-box">
                        {['TERRAZA', 'SALÓN', 'BAÑOS', 'HABITACIONES', 'COCINA'].map(
                            (room)=>selectButtonGenerator(room)
                        )}
                    </div>
                    {mainPhotoGenerator()}
                </div>
            }
            {photoFullScreen &&
                <div className= "full-screen-photo-container">
                    <h2>{selectedRoom}</h2>
                    {mainPhotoGenerator()}
                    <div className="undo-buttom-container"
                        onClick={()=>{setPhotoFullScreen(false)}}>
                        <img src={undoIcon} className='undo-icon'></img>
                    </div>
                    
                </div>
            }
            

        </div>
    )
}