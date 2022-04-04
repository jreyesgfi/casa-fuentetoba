import { useState } from 'react';
import './screen-gallery.css'


import { globalFolder } from '../../../operators/photoImporter/GalleryPhotoImporter';


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
              <p className={`${name.length>7?'long-text':''}`}>
                  {name}
                  </p>
                <p>
                  {name.length>7?'HAB.':''}
                </p>
            </div>
        )
    }

    // return the main photo of the gallery
    const mainPhotoGenerator = function(){
        const numTotalPhotos = globalFolder[selectedRoom].length;

        if (numTotalPhotos === 0){ return}

        const currentPhotoPos = mainPhotoNum%numTotalPhotos;

        return(
            <img 
                src={globalFolder[selectedRoom][currentPhotoPos]['imgUrl']}
                >
            </img>
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
            <div className= "photo-container">
                <div className="top-photo-row flex-box">
                    {selectButtonGenerator('TERRAZA')}
                    {selectButtonGenerator('SALÓN')}
                </div>
                <div className="main-photo-row flex-box">
                    {mainPhotoGenerator()}
                </div>
                <div className="bottom-photo-row flex-box">
                    {selectButtonGenerator('BAÑOS')}
                    {selectButtonGenerator('HABITACIONES')}
                    {selectButtonGenerator('COCINA')}
                </div>
            </div>

        </div>
    )
}