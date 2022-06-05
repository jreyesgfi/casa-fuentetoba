import { useRef, useState } from 'react';
import GoogleStyleButton from '../../GoogleStyle/button/GoogleStyleButon.js';
import GoogleStyleInput from '../../GoogleStyle/input/GoogleStyleInput.js';
import './send-email-panel.css';

export default function SendEmailPanel(props) {

    // track in what step we are
    const [step, setStep] = useState(0);

    // ref to keep all values
    const formObjectRef = useRef({});



    return (
        <div className="send-email-panel">
            <div className="panel-header">
                <h3> Contáctanos </h3>
            </div>
            <div className="booking-info flex-box"
                onClick={() => { console.log(props) }}>
                <div className="arrive-date-container info-container">
                    <h4> Fecha llegada </h4>
                    <p>{props?.['rangeSelected'][0] || '01/02/2023'}</p>
                </div>
                <div className="departure-date-container info-container">
                    <h4> Fecha salida </h4>
                    <p>{props?.['rangeSelected'][1] || '02/03/2024'}</p>
                </div>
            </div>
            {step == 0 &&
                <div className="body form">
                    <GoogleStyleInput label={'Nombre'}
                        setValue={(value) => { formObjectRef.current['name'] = value }}>
                    </GoogleStyleInput>
                    <GoogleStyleInput label={'Apellidos'}
                        setValue={(value) => { formObjectRef.current['firstName'] = value }}>
                    </GoogleStyleInput>
                    <GoogleStyleInput label={'Correo electrónico'}
                        setValue={(value) => { 
                            console.log(value)
                            formObjectRef.current['email'] = value ;} }>
                    </GoogleStyleInput>
                    <GoogleStyleInput label={'Teléfono (opcional)'}
                        type='number'
                        setValue={(value) => { formObjectRef.current['phone'] = value }}>
                    </GoogleStyleInput>
                    <br></br>
                    <div className="buttons-container flex-box">
                        <GoogleStyleButton label='Modificar fechas'
                            style='border'
                            clickFunction= {()=>{props.closePanel()}} >
                        </GoogleStyleButton>
                        <GoogleStyleButton 
                            label='Siguiente'
                            clickFunction={()=>{setStep(1)}}>
                        </GoogleStyleButton>
                    </div>

                </div>
            }
            {step === 1 &&
                <div className="comments-and-send-container">
                    <div className="email-info info-container">
                        <h4> Correo electrónico </h4>
                        <p>{formObjectRef?.current?.['email']||'blabla@gmail.com'}</p>
                    </div>
                    <GoogleStyleInput label={'Comments'}
                        longText={true}
                        setValue={(value) => { formObjectRef.current['nombre'] = value }}>
                    </GoogleStyleInput>
                    <div className="buttons-container flex-box">
                        <GoogleStyleButton label='Anterior'
                            style='border' 
                            clickFunction={()=>{setStep(0)}}>
                        </GoogleStyleButton>
                        <GoogleStyleButton 
                            label='Enviar'
                            clickFunction={()=>{}}>
                        </GoogleStyleButton>
                    </div>
                </div>
            }
        </div>
    )
}