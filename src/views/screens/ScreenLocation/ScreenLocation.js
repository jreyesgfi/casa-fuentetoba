import { useState } from 'react';
import './screen-location.css'

export default function ScreenLocation(props) {

    
    return(
        <div className= "location-screen screen" style = {props.screenStyle}>
            <div className="header location-header">
                <h2 className="header-title"> Localización</h2>
                <div className="header-division-line"></div>
            </div>
            <div className="map-responsive">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4503617.936797353!2d-6.895546308155423!3d40.77591736554756!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd44d10b78f81b51%3A0x421983168614fc55!2s42190%20Fuentetoba%2C%20Soria!5e0!3m2!1ses!2ses!4v1651518406535!5m2!1ses!2ses"
                    style={{border:"0;"}}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
            <div className="location-info-container">
                <h2>
                    Fuentetoba
                </h2>
                <h3 className="postal-code-info">
                    42190, Soria
                </h3>
                <p>
                    Pueblo situado a menos de 10km de Soria, Castilla y León. Situada al 
                    pie del pico frentes da lugar al hermoso nacimiento del arroyo La Toba.
                </p>
            </div>
        </div>
    )
}