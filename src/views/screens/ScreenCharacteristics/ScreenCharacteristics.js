import { useEffect, useState } from "react";
import characteristicJSON from "../../../elements/characteristicDetails.json"
import IDGenerator from "../../../operators/IdGenerator";
import { LimitText } from "../../../operators/textEditor";
import NextButton from "../../buttons/Next-Button";
import "./screen-characteristic.css"

import descriptionImage from "../../../images/descripcion/fachada.jpg"
import deviceUsed from "../../../operators/SessionInformation/DeviceUsed";

export default function ScreenCharacteristics(props) {
    const categories = {
        'alojamiento': {
            'title': 'ALOJAMIENTO',
            'elements': ['television', 'terraza', 'chimenea',
                'capacidad', 'camas', 'sofa'
            ]
        },
        'entorno': {
            'title': 'ENTORNO',
            'elements': [
                'piscina', 'polideportivo', 'montaña'
            ]
        }

    };


    // track if an element is clicked
    const [taleKey, setTaleKey] = useState({});
    const [taleClicked, setTaleClicked] = useState();
    

    // create tales just once
    useEffect(
        ()=>{
            var taleKeyLocal = {};
            Object.keys(characteristicJSON).map((key,index)=>{
                taleKeyLocal[key]= IDGenerator();
            })
            //add a state for description
            taleKeyLocal['appDescription']=IDGenerator();

            setTaleKey(taleKeyLocal);
        }
     ,[])


     // click behabiour
    function sendElementClicked(keyDict, key, currentClickedValue, setClickedFunction){
        const valueToCheck = keyDict?.[key];
        if (valueToCheck === currentClickedValue) { setClickedFunction(null) }
        else { 
            console.log(key, 'sent')
            setClickedFunction(valueToCheck) 
        }
     }

     // click on Characterisctic

    function sendCharacteristicClicked(key){
         sendElementClicked(taleKey,key,taleClicked,setTaleClicked);
    }


    const characteristicsGenerator = function (category) {
        const categorySelected = categories[category]
        return (
            <div className={`category-container ${categorySelected['title']} `}>
                <h3> {categorySelected['title']}</h3>
                <div className={`characteristics-container`}>
                    {categorySelected['elements'].map((element) => {
                        const id = taleKey[element]
                        return (
                            <div className="characteristic-container button"
                                key={id}
                                onClick={() => {
                                    sendCharacteristicClicked(element);
                                }}>
                                {taleClicked !== id &&
                                <div className='tale-not-clicked'>
                                    <img
                                        src={characteristicJSON[element]['url']}
                                    ></img>
                                    <h3> {LimitText(characteristicJSON[element]['title'])}</h3>
                                </div>
                                }
                                {taleClicked === id &&
                                    <div className='tale-clicked'>
                                        <h3> {LimitText(characteristicJSON[element]['title'])}</h3>
                                        <p> {characteristicJSON[element]['text']}</p>
                                    </div>
                                }

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    };

    return (
        <div className="characteristics-screen screen" style={props.screenStyle}>
            <div className="header characteristics-header">

                <h2 className="header-title"> DETALLES</h2>
                <div className="header-division-line"></div>
            </div>

            <div className="characteristics-body">
                <div className="characteristics-elements">
                    {characteristicsGenerator('alojamiento')}
                    {characteristicsGenerator('entorno')}
                </div>
                {/* { deviceUsed() === 'desktop'&& */}
                <div className='image-container'>
                    <img src={descriptionImage}></img>
                </div>
                
                
                <div className={`characteristics-description ${taleKey['appDescription']===taleClicked?'opened':'closed'}`}
                        key={taleKey['appDescription']}
                        onClick={()=>{sendCharacteristicClicked('appDescription')}}>
                        <h3>Descripción</h3>
                        <p>La Casa de Fuentetoba es un unifamiliar adosado que se encuentra ubicada en el pueblo de Fuentetoba, pedanía de Golmayo. Fue restaurado en el 2022 y renovado su menaje y muebles en esta fecha.</p>
                        <p>Tiene una superficie útil de unos 180 m cuadrados, distribuidos en tres plantas. Esta equipada con todos los utensilios tostador, exprimidor, cafetera, secador, plancha, lavadora, lavavajillas etc.</p>
                        <p>En la planta baja hay cocina, salón-comedor con sofá cama y chimenea, aseo y terraza jardín de unos 30m2. Está equipada con mobiliario de teka, mesa para comer hasta 14 personas, tumbonas y zona de sofás. Barbacoa rosca para paellera. y unas espectaculares vistas a la sierra y a la puesta de sol.</p>
                        <p>En la segunda planta hay 3 dormitorios amplios, todos ellos con cama de matrimonio y con armarios de madera. Cada habitación de un color, una azul, otra amarilla y otra verde. Todas ellas tiene terraza. orientadas al amanecer y al atardecer. Hay un baño completo con bañera.</p>
                        <p>La tercera planta es abuhardillada con techo de madera. Tiene un recibidor en el cual hay un sofá cama y TV y dos habitaciones. una con cama de matrimonio y la otra muy amplia con una cama doble que puede ser dos de 80 , o una de 160 y una cama nido con dos colchones de 80. Además dispone de un bonito baño abuhardillado con ducha.</p>
                        <p>Las vistas son sensacionales, por un lado al majestuoso Pico frentes. Desde la terraza de una de las habitaciones puedes disfrutar de un café viendo amanecer. Por el otro lado la vista también es impresionante. Desde la terraza jardín del salón puedes disfrutar en el sofá de un bonito atardecer.</p>
                        <p>Fuentetoba, es un precioso pueblo de Soria a los pies del pico frentes, en donde se encuentra la espectacular cascada de la Toba. Está situado a tan solo 8 Km de Soria capital. En el pueblo hay piscina con complejo polideportivo, hay restaurante y mesón y existe venta.</p>
                        <p>A tan solo 7 km de la casa se encuentra el famoso monte soriano de Valonsadero, a 11 km el campo de golf de Pedrajas, a 25 minutos en coche del precioso pueblo de Vinuesa, en pinares, y el embalse de la cuerda del pozo y a unos 40 minutos en coche, la famosa Laguna Negra y el espectacular Cañón del rio Lobos.</p>
                        <p>¡Tu estancia será inolvidable!</p>
                    <div className="open-description-area">
                        <p>{`${taleKey['appDescription']===taleClicked?'LEER MENOS':'LEER MÁS'}`}</p>
                    </div>
                </div>
                <div className='process-buttons-container'>
                    <NextButton nextScreen={()=>props?.moveToScreen(3)}>
                    </NextButton>
                </div>
            </div>
        </div>
    )
}