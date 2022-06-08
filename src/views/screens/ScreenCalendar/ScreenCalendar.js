import { createRef, useEffect, useRef, useState } from "react";
import "./screen-calendar.css";
import Papa from "papaparse";
import daysCalendar from "../../../elements/daysExample/ejemploDays.csv";
import { dateToString } from "../../../elements/parser/dateParser";
import Alert from '@material-ui/lab/Alert';
import MonthSelector from "./MonthSelector/MonthSelector";
import IDGenerator from "../../../operators/IdGenerator";
import NextButton from "../../buttons/Next-Button";
import SendEmailPanel from "../../panels/emailPanel/SendEmailPanel";
import CalendarWidget from "../../panels/calendarWidget/CalendarWidget";
import CustomAlert from "../../alerts/CustomAlert";

// for read csv npm install xlsx

export default function ScreenCalendar(props) {




    /**
     *  Email panel
     */
    const [emailPanel, setEmailPanel]= useState(false);

    /**
     * states to monitor the activity
     */
    const [dayToFocus, setDayToFocus] = useState(new Date());

    const [selectingDay, setSelectingDay] = useState(false);

    const [totalPrice, setTotalPrice] = useState(null);

    const [alertRefState, setAlertRefState] = useState();
    const alertObjRef = useRef();
        // 'display': true, false,
        // 'severity': 'info',//success, info, warning or error',
        // 'message': 'Seleccione una fecha de llegada.',

    function sendAlert(alertObj){
        alertObjRef.current = alertObj;
        setAlertRefState(IDGenerator());
    }


    return (
        <div
            className="calendar-screen screen"
            style={props.screenStyle}
        >

            {/* File Uploader 
            <input
                type = "file"
                name = "file"
                accept=".csv"
                onChange = {(eventt)=>uploadDays(eventt)}
                style={{ display: "block", margin: "10px auto"}}
            />
            */}
            <div className="header calendar-header">
                <h2 className="header-title"> DISPONIBILIDAD</h2>
                <div className="header-division-line"></div>
            </div>
            <div className=" calendar-body-container">
                <div className='first-section-container'>
                    <MonthSelector
                        onClick={() => { setSelectingDay(!selectingDay) }}
                        selectingDay={selectingDay}
                        currentFocusedDay={dayToFocus}
                        setSelection={(day) => {
                            setDayToFocus(day);
                        }}
                        
                        className={"month-selector-container"}>
                    </MonthSelector>
                    <CalendarWidget 
                        dayToFocus={dayToFocus}
                        sendAlert={(alertObject)=>{sendAlert(alertObject)}}
                        sendTotalPrice={(price)=>{setTotalPrice(price)}}>
                    </CalendarWidget>
                    <div className="boocking-condition-container">
                        <p>*La reserva mínima es de 600€.</p>
                    </div>
                </div>
                <div className='second-section-container'>
                    <div className="total-price-container">
                        <div className={`total-price ${true != false ? 'range-completed' : 'range-not-completed'}`}>
                            Total:
                            {totalPrice | ''} €
                        </div>
                        {/* {rangeSelected['rangeCompleted'] === true &&
                            <div className={`next-step-buttom button`}
                                onClick={() => { setEmailPanel(true); }}>
                                RESERVAR
                            </div>
                        } */}
                    </div>
                </div>
            </div>
            {/* {alert['display'] == true &&
                    <Alert
                        className={`alert ${alert?.['className']}`}
                        severity={`${alert['severity']}`}
                        onClose={() => { setAlert({}); alertRef.current = 0;}}>
                        {alert['message']}
                    </Alert>
            } */}
            <CustomAlert 
                display={alertObjRef?.current?.['display']}
                message={alertObjRef?.current?.['message']}
                severity={alertObjRef?.current?.['severity']}
                reference={alertRefState||null}
            >
            </CustomAlert>
            {emailPanel === true &&
                <div></div>
                // <SendEmailPanel rangeSelected={rangeSelected?.['days']} closePanel={()=>{setEmailPanel(false);}}>
                // </SendEmailPanel>
            }
        </div>
    )
}