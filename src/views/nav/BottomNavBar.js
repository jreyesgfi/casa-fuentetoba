import './nav.css';
//import SettingButton from './SettinButton';
import iconDictionary from '../../operators/iconsImporter/iconsExporter';
import { useEffect } from 'react';


function BottomNavBar(props) {


  const evolutionCircleArray = [0,1,2,3,4,5];
    
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
            <p>{console.log(classNameSelector(circleNum,props.appScreenNumber))}</p>
          </div>
        )
        }
      </div>


      <div className="icon-container container">
        <div className="icon-box">
          <img
            className="house icon"
            src={iconDictionary['house'][0]}>
          </img>
        </div>

        <div className="icon-box">
          <img
            className="camera icon"
            src={iconDictionary['camera'][0]}>
          </img>
        </div>

        <div className="icon-box">
          <img
            className="bed icon"
            src={iconDictionary['bed'][0]}>
          </img>
        </div>

        <div className="icon-box">
          <img
            className="map icon"
            src={iconDictionary['map'][0]}>
          </img>
        </div>

        <div className="icon-box">
          <img
            className="calendar icon"
            src={iconDictionary['calendar'][0]}>
          </img>
        </div>

        <div className="icon-box">
          <img
            className="conversation icon"
            src={iconDictionary['conversation'][0]}>
          </img>
        </div>

      </div>
    </div>
  );
}

export default BottomNavBar;
