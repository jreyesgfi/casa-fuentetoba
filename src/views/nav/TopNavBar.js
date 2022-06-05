import './nav.css';
import './top-nav.css';
//import SettingButton from './SettinButton';
import iconDictionary from '../../operators/iconsImporter/iconsExporter';
import { useEffect, useRef, useState } from 'react';
import CreateRipple from '../buttons/Ripple';
import IDGenerator from '../../operators/IdGenerator';
import { LimitText } from '../../operators/textEditor';


function TopNavBar(props) {


  const evolutionCircleArray = [0,1,2,3,4,5];
  const iconArray = [['house','Inicio'], ['camera','Galeria'],['bed','Detalles'], ['map','Ubicación'], ['calendar','Disponibilidad y Precios'], ['conversation','Contáctanos']]
    
  const classNameSelector = (i,appScreenNumber) =>{
    if (appScreenNumber <i ){ return 'uncharted'}
    else if (appScreenNumber == i)return 'focus'
    else return 'past'
  }

  const [eventToSend, setEventToSend] = useState(null);

  useEffect(async()=>{//console.log('eventToSendChanged')
    if (eventToSend!==null){
      await new Promise(() => {
        setTimeout(() => {
           setEventToSend(null)
        }, 500);
      })
    }
  },[eventToSend]);

  return (
    <div>
      <div className="empty-top-nav-bar">
      </div>
      <div className="top-nav-bar nav-bar">
        <div className="icons-container container">

          {iconArray.map((icon,index) => {
              const iconRef = icon[0];
              const iconName = icon[1];
              return  (
                <div className='icon-container'
                key={IDGenerator()}
                onClick = {(event)=>{
                    props.moveToScreen(index);
                    setEventToSend(event);
                }}
                onMouseEnter={(event)=>{
                  //
                  // const container = event['nativeEvent']['path'][0];
                  // container.classList.add("ripple");

                }}
                >
                  <img className={`icon 
                  ${iconRef}
                  `}
                  key = {index}
                  src = {iconDictionary[iconRef][index==props.appScreenNumber?1:2]}
                  onClick = {()=>{props.moveToScreen(index)}}
                  >
                  </img>
                  <p>{LimitText(iconName,11,6)}</p>
                </div>
              )
              }
            )
          }

        </div>
      </div>
      <CreateRipple event={eventToSend}>
      </CreateRipple>
    </div>
  );
}

export default TopNavBar;
