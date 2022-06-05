import { useEffect, useRef, useState } from "react";
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

// for read csv npm install xlsx

export default function ScreenCalendar(props) {


    /**
     * Alert config
     */
    const [alert, setAlert] = useState({
        'display': false,
        'severity': 'info',//'success, info, warning or error',
        'message': 'Seleccione una fecha de llegada.',
    });


    /**
     * alert
     */
    const alertRef = useRef(0);


    async function setAlertWithTimer(value,time=5000){
        // save a copy
        const alertLocal = {...value};

        // track this alert
        const id = IDGenerator();
        alertRef.current = id;

        // set the alert
        setAlert(value);

        //define a function to wait 
        await new Promise(() => {
            setTimeout(() => {
                console.log(alertRef.current, id)
                // check if the current alert is the one seted
                if (alertRef.current===id){
                    
                    // start the fadding out
                    alertLocal['className']= 'fadding-out';
                    setAlert(alertLocal);
                }
            }, time);

            setTimeout(() => {
                // check if the current alert is the one seted
                if (alertRef.current===id){
                    // make it dessapear
                    setAlert({});
                    alertRef.current = 0;
                }
            }, 1500+time);
        });
        return

    }

    /**
     *  Email panel
     */
    const [emailPanel, setEmailPanel]= useState(false);

    /**
     * states to monitor the activity
     */
    const [dayToFocus, setDayToFocus] = useState(new Date());

    const [selectingDay, setSelectingDay] = useState(false);


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
                    <CalendarWidget dayToFocus={dayToFocus}>
                    </CalendarWidget>
                    <div className="boocking-condition-container">
                        <p>*La reserva mínima es de 600€.</p>
                    </div>
                </div>
                <div className='second-section-container'>
                    <div className="total-price-container">
                        <div className={`total-price ${true != false ? 'range-completed' : 'range-not-completed'}`}>
                            Total:
                            {100 | 0} €
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
            {alert['display'] == true &&
                    <Alert
                        className={`alert ${alert?.['className']}`}
                        severity={`${alert['severity']}`}
                        onClose={() => { setAlert({}); alertRef.current = 0;}}>
                        {alert['message']}
                    </Alert>
            }
            {emailPanel === true &&
                <div></div>
                // <SendEmailPanel rangeSelected={rangeSelected?.['days']} closePanel={()=>{setEmailPanel(false);}}>
                // </SendEmailPanel>
            }
        </div>
    )
}