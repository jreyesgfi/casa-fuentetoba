import characteristicJSON from "../../../elements/characteristicDetails.json"
import { LimitText } from "../../../operators/textEditor";
import "./screen-characteristic.css"

export default function ScreenCharacteristics(props) {

    const categories = {
        'alojamiento':{
            'title': 'ALOJAMIENTO',
            'elements': ['television','terraza','chimenea',
            'capacidad', 'camas', 'sofa'
        ]
        },
        'entorno':{
            'title':'ENTORNO',
            'elements': [
                'piscina', 'polideportivo','montaña'
            ]
        }

    };



    const characteristicsGenerator = function(category) {
        const categorySelected = categories[category]
        return(
            <div className= 'category-container'>
                <h3> {categorySelected['title']}</h3>
                <div className= 'characteristics-container'>
                    {categorySelected['elements'].map((element)=>
                        <div className="characteristic-container">
                            <img
                            src={characteristicJSON[element]['url']}
                            ></img>
                            <h3> {LimitText(characteristicJSON[element]['title'])}</h3>
                            <p> {characteristicJSON[element]['text']}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    };

    return(
        <div className= "characteristics-screen screen" style = {props.screenStyle}>
            <div className= "header characteristics-header">
                
                <h2 className="header-title"> DETALLES</h2>
                <div className="header-division-line"></div>
            </div>

            <div className= "characteristics-body">
                {characteristicsGenerator('alojamiento')}
                {characteristicsGenerator('entorno')}
            </div>
        </div>
    )
}