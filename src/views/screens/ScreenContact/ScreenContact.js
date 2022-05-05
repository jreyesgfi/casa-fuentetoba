import { useState } from 'react';
import './screen-contact.css';
import gmailIcon from './../../../icons/darkMail.svg';
import phoneNumberIcon from './../../../icons/darkPhone.svg'

export default function ScreenContact(props) {

    
    return(
        <div className= "contact-screen screen" style = {props.screenStyle}>
            <div className="header contact-header">
                <h2 className="header-title"> Contacto</h2>
                <div className="header-division-line"></div>
            </div>
            <div className="contact-info-container">
                <div className='contact-info-item container'>
                    <div className= 'image-container'>
                        <img src={gmailIcon}></img>
                    </div>
                    <h3>
                        casafuentetoba@gmail.com
                    </h3>
                </div>
                <div className="contact-info-item container">
                    <img src={phoneNumberIcon}></img>
                    <h3>
                        649290487
                    </h3>
                </div>
                <p>
                        Ponte en contacto con nosotros ya sea por correo o teléfono
                        indicando cuales son tus fechas escogidas.
                </p>
            </div>
        </div>
    )
}