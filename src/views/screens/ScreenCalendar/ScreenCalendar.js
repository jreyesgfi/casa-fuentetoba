import { useEffect, useRef, useState } from "react";
import "./screen-calendar.css";
import Papa from "papaparse";
import { upload } from "@testing-library/user-event/dist/upload";
import daysCalendar from "../../../elements/daysExample/ejemploDays.csv";
import { dateToString } from "../../../elements/parser/dateParser";


// for read csv npm install xlsx

export default function ScreenCalendar(props) {

    // describe today date
    var today = new Date();
    var todayToRead = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var dayOfWeek = today.getDay();

    // Days of week
    const daysOfWeekDict = {
        1: "Lunes",
        2: "Martes",
        3: "Miércoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sábado",
        0: "Domingo",
    }

    // Number of days each month
    const daysOfEachMonth = {
        1: 31,
        2: today.getFullYear % 4 == 0 ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }

    // return the correct className depending of day index
    function daySituation(date) {
        var situation = 'free';
        return situation
    }

    // Date selected
    var dateSelected = today;
    var priorDays = -(dateSelected.getDate()) + 1;
    //-( (today.getDay() + 6) % 7)
    var rangeOfPlot = daysOfEachMonth[dateSelected.getMonth() + 1] + priorDays;


    /****************************
     Recover the calendar days 
    *****************************/
    // state for manage the loading
    const [loadingDays, setLoadingDays] = useState(true);

    // state to keep the processed data
    const [daysData, setDaysData] = useState({});

    async function changeDaysToDict(df) {
        const finalDf = new Promise((resolve) => {
            const dfToReturn = {};
            df.forEach((row) => { 
                dfToReturn[row['dia'].toString()] = row 
            })
            return resolve(dfToReturn)
        });
        await finalDf;

        const p1 = new Promise((resolve) => setTimeout(() => resolve('1'), 1000))

        await p1



        return finalDf
    }

    const uploadDays = () => {
        setLoadingDays(true);
        Papa.parse(daysCalendar, {
            header: true,
            skipEmptyLines: true,
            download: true,
            complete: async function (results) {
                const daysPromise = new Promise((resolve) => resolve(changeDaysToDict(results.data)));
                daysPromise.then(daysInObject => {
                    setDaysData(daysInObject)
                })
                
                setLoadingDays(false);
            }
        })
    }

    // a call to the function at the beggining
    useEffect(()=>uploadDays(),[])

    // Init of plot
    const [selectedDays, setSelectedDays] = useState([]);
    const [dayCells, setDayCells] = useState([])

    useEffect(
     () => {
        var days = [];


        // define the first empty holders
        const firstDay = new Date(dateSelected);
        firstDay.setDate(firstDay.getDate() + priorDays);
        const initialDays = -((firstDay.getDay() + 6) % 7)

        // define the last ones
        const lastDay = new Date(dateSelected);
        lastDay.setDate(firstDay.getDate() + daysOfEachMonth[dateSelected.getMonth() + 1]);
        const finalDays = 7 - ((lastDay.getDay() + 6) % 7) + 7;

        // fill the days
        for (var i = initialDays + priorDays; i < rangeOfPlot + finalDays; i++) {
            const oneDay = new Date(dateSelected);
            oneDay.setDate(oneDay.getDate() + i);

            var situation = 'current';

            if (i < priorDays) {
                situation = 'not-visible';
            }
            else if (i == 0) {
                situation = 'today';
            }
            else if (i >= rangeOfPlot) {
                situation = 'incoming';
            }
            const previousSchema = daysData[dateToString(oneDay)]??
                 {
                    'precio':0,
                    'ocupado':1,
                 }

            var dayObject = {
                'dia' : oneDay.getDate(),
                'mes' : oneDay.getMonth()+1,
                'año' : oneDay.getFullYear(),
                'indice' : i,
                'key' : dateToString(oneDay),
                'ocupado': previousSchema['ocupado'],
                'precio': previousSchema['precio'],
                'situacion': situation,
                'señalado': false,
            }
            
            // fields: dia, precio, ocupado, 
            // day,month, year, index, key
            
            days.push(dayObject);
        }
        setSelectedDays(days);

    },[daysData]);

    /**********************************
     * onClick Behavior
     */
     function onClick(target,callback=null){
        
        target['señalado'] = !target['señalado'];
        setSelectedDays([...selectedDays]); // change the array to detect re-rendering
    }



    /**********************************
     * generate the ui of the calendar
     */
    function CalendarGenerator(props){
        const daysSelectedLocal = props['days-selected'];
        if (!daysSelectedLocal){
            return null
        }
        console.log('re-rendering')
        const days = daysSelectedLocal.map((day) => {
                return (
                    <div
                        className={
                            `day-container 
                        ${day['ocupado']==1?' ocupado':''}
                        ${day['señalado']==true?' señalado ':''}
                        ${day['situacion']}`
                        }

                        onClick={()=>{onClick(day)}}
                        key={day['key']}>

                        <div className='day-header'>
                            {day['dia']}
                        </div>
                        <div className={`day-body`}>
                            {day['precio']}€
                        </div>

                    </div>
                )
            }
            )
        
        
        return (
            <div className='calendar-container'>
                {days}
            </div>
        )
    };

    /**************
     * dayCells
     */
    





    return (
        <div className="characteristics-screen screen" style={props.screenStyle}>
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
            <CalendarGenerator days-selected={selectedDays}>
            </CalendarGenerator>
            
        </div>
    )
}