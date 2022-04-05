import './nav.css';
//import SettingButton from './SettinButton';
import iconDictionary from '../../operators/iconsImporter/iconsExporter';
import { useEffect } from 'react';


function BottomNavBar(props) {


  const evolutionCircleArray = [0,1,2,3,4,5];
  const iconArray = ['house', 'camera','bed', 'map', 'calendar', 'conversation']
    
  const classNameSelector = (i,appScreenNumber) =>{
    if (appScreenNumber <i ){ return 'uncharted'}
    else if (appScreenNumber == i)return 'focus'
    else return 'past'
  }

  return (
    <div className="bottom-nav-bar">

      <div className="evolution-line-container">
        <div className="evolution-line"></div>
        <div className="ends-evolution-line"></div>
      </div>

      <div className="evolution-circle-container container">
        {evolutionCircleArray.map(circleNum => 
          <div className={`evolution-circle 
          ${classNameSelector(circleNum,props.appScreenNumber)}
          `}
          key = {circleNum}
          >
          </div>
        )
        }
      </div>


      <div className="icon-container container">

        {iconArray.map((iconName,index) => 
            <img className={`icon 
            ${iconName}
            `}
            key = {index}
            src = {iconDictionary[iconName][index==props.appScreenNumber?1:0]}
            onClick = {()=>{props.moveToScreen(index)}}
            >
            </img>
          )
        }

      </div>
    </div>
  );
}

export default BottomNavBar;
