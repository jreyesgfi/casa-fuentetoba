import './nav.css';
//import SettingButton from './SettinButton';
import iconDictionary from '../iconsImporter/iconsExporter';

function BottomNavBar() {
  return (
    <div className="bottom-nav-bar">
      <div className="evolution-line-container">
        <div className="dot-line evolution-line"></div>
        <div className="evolution-circle-container">
          <div className="evolution-circle"></div>
          <div className="evolution-circle"></div>
          <div className="evolution-circle"></div>
          <div className="evolution-circle"></div>
          <div className="evolution-circle"></div>
          <div className="evolution-circle"></div>
        </div>

      </div>


      <div className="icon-container">
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
