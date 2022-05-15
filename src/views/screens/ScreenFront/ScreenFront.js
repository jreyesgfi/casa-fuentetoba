import './screen-front.css';
import main_title from '../../../elements/main_title/main_title.svg';
import React, { useEffect, useRef, useState } from 'react';

// import bedsIcon from '../../../icons/'


import { importIcons, importImages } from '../../../operators/imagesImporter';
import iconDictionary, { globalIcons } from '../../../operators/iconsImporter/iconsExporter';
import IDGenerator from '../../../operators/IdGenerator';
import deviceUsed from '../../../operators/SessionInformation/DeviceUsed';


export default function ScreenFront(props){
    const [icons,setIcons] = useState(globalIcons);
    const [currentImagePos, setCurrentImagePos] = useState(0);
    const [images,setImages] = useState(importImages("../images/portada/")[0]);
    const size = images?.length||0;
    const [infLoop, setInfLoop] = useState(true);
    
    const price = 15;
    const description = "Esta sería la descripción."
    const infoGraph=[
        {'url':iconDictionary['bed'][0], 'text':'12 pers +4 cama auxiliar'},
        {'url':icons['darkBarbacue.png'], 'text':'Terrazas, jardín,', 'other-text':'barbacoa, chimenea'},
        {'url':icons['darkM2.png'], 'text':'200m2'},
    ]


    // define a timer loop to change the currenImage
    async function autoChangeImage(timeInMs){
        if (infLoop===true){
            // define a function to wait 
            await new Promise(() => {
                setTimeout(() => {
                    setCurrentImagePos((currentImagePos+1)%size);
                }, timeInMs);
            });
        }  
    }

    
    if (infLoop===true){autoChangeImage(4000);}



    function FrontImageHolder(props) {
        

        return (
            <div>
                {size !== 0 && <div
                onClick={()=>{setInfLoop(!infLoop)}}
                className='front-image-container'>
                    <img
                    src={images?.[currentImagePos]}
                    className={`new-front-image 
                        ${currentImagePos%2===0?'even-pos':'odd-pos'}`} 
                    />
                    <img
                    src={images?.[(currentImagePos+props.size-1)%props.size]}
                    className={`last-front-image 
                        ${currentImagePos%2===0?'even-pos':'odd-pos'}`} 
                    />
                </div>
                }
            </div>
        );
    }


    return (
        <div className="screen-front screen" style={props.screenStyle}>
            {/*
            <div className="main-image-container">
                <div className="image-cut"></div>
                <img src='/images/main_image/pueblo-vista-general.png' className='img_fondo_galeria'></img>
            </div>

            <div className='contenedor-titulo-pantalla'>
                <img src={main_title}
                    alt={"LA CASA DE FUENTETOBA"}
                    className="main_title" />
            </div>

            */}
            <FrontImageHolder onClick={()=>{
                setInfLoop(false)}}
                size={size}
                >

            </FrontImageHolder>
            <div className='front-info-container'>
                    <h1>
                        LA CASA DE FUENTETOBA
                    </h1>
                    <div className='small-info-panel'>
                        <div className='small-description-container'>
                            <p></p>
                        </div>
                        <div className='graphic-info'>
                            {
                                infoGraph.map((element)=>(
                                    <div className='each-container-info'
                                    key={IDGenerator()}>
                                        <img className='icon'
                                        src={element['url']}>
                                        </img>
                                        <p>{element['text']}</p>
                                        {element['other-text']!==null&&
                                            <p>{element?.['other-text']}</p>
                                        } 
                                    </div>  
                                )
                                )
                            }
                        </div>
                        <div className='other-info'>
                            <div className='another-container'>
                                
                            </div>
                            <div className='price-container'>
                                <h2>{price}</h2>
                                <img className='icon'
                                        src={icons['darkEuro.png']}>
                                </img>
                                <p>*Precio por persona</p>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className='buttons-container'>
                        <div className='button next-button'>
                            <p>Siguiente</p>
                        </div>
                        <div className='button other-button'
                        onClick={()=>{
                            if(deviceUsed()==='desktop'){
                                navigator.clipboard.writeText(649290487)
                            }
                            else{window.open('tel://649290487')}
                        }}>
                            <img src={icons['darkPhone.svg']}
                                className='icon'></img>
                            <p>649290487</p>
                        </div>
                    </div>
            </div>



        </div>
    )
}
