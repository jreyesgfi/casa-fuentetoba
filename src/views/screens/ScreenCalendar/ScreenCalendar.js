import { useEffect, useState } from "react";
import "./screen-calendar.css";
import Papa from "papaparse";
import daysCalendar from "../../../elements/daysExample/ejemploDays.csv";
import { dateToString } from "../../../elements/parser/dateParser";
import Alert from '@material-ui/lab/Alert';
import MonthSelector from "./MonthSelector/MonthSelector";

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

    // Months
    const monthsDict = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
    };

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
    const [dateSelected, setDateSelected] = useState(today);
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

    const uploadDaysData = () => {
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
    useEffect(() => uploadDaysData(), [])

    // Init of plot
    const [selectedDays, setSelectedDays] = useState([]);

    useEffect(
        () => {
            var days = {};


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
                const previousSchema = daysData[dateToString(oneDay)] ??
                {
                    'precio': 150,
                    'ocupado': 0,
                }

                var dayObject = {
                    'dia': oneDay.getDate(),
                    'mes': oneDay.getMonth() + 1,
                    'año': oneDay.getFullYear(),
                    'fecha': oneDay,
                    'indice': i,
                    'key': dateToString(oneDay),
                    'ocupado': oneDay.getTime() >= new Date().getTime()?previousSchema['ocupado']:1,
                    'precio': previousSchema['precio'],
                    'situacion': situation,
                    'señalado': false,
                }

                // fields: dia, precio, ocupado, 
                // day,month, year, index, key

                days[dateToString(oneDay)] = dayObject;
            }
            setSelectedDays(days);

        },
    [daysData,dateSelected]);





    /*********
     * Functions to modify the data in selected days
     */

    // a funtion to force re-process the selected days
    function uploadSelectedDays(changes){
        // refresh the rendering by redefine the days
        var copy = {};
        for (var key in selectedDays){
            copy[key]=selectedDays[key];
        }  

        for (var change of changes){
            copy[change['key']]= change;
        }

        // commit to refresh
        setSelectedDays(copy);
    }

    // unselect all cells
    function unselectAllCells(){
        var copy = {};
        for (var key in selectedDays){
            copy[key]=selectedDays[key];
            copy[key]['señalado'] = false;
        }

        // commit to refresh
        setSelectedDays(copy);
    }


    /**
     * Alert config
     */
    const [alert,setAlert]=useState({
        'display':true,
        'severity':'info',//'success, info, warning or error',
        'message':'Seleccione una fecha de llegada.',
    });




    /**********************************
     * onClick Behavior
     */

    // state to manage if had clicked a first date
    const [firstClicked, setFirstClicked] = useState(null);

    // range selected
    const [rangeSelected, setRangeSelected] = useState({
        'price':0,
        'days':[],
    });

    // click on occupied date
    function occupiedDate(day){
        console.log(`El día ${day['key']} está ocupado, selecciona una fecha disponible.`);
        // the alert
        setAlert({
            'display':true,
            'severity':'warning',
            'message':`El día ${day['key']} está ocupado, selecciona una fecha disponible.`,
        });
        
        // reset clicked values
        setFirstClicked(null);
        setRangeSelected({})
        unselectAllCells();
        return null;
    }

    // function  triggered when a range of day is set
    function setRange(firstDateObject, secondDateObject) {

        // recover the actual object date type
        var firstDate = firstDateObject['fecha'];
        var secondDate = secondDateObject['fecha'];

        // invert if secondDate is oldest
        if (firstDate > secondDate) {
            firstDate = secondDateObject['fecha'];
            secondDate = firstDateObject['fecha'];
        }

        // // define the key
        // const firstDateKey = firstDate['key'];
        // const secondDateKey = secondDate['key'];

        // keep the track of the setOfDays
        var totalRange = [];
        var totalPrice = 0;

        // manage each iteration and break the loop params
        var currentDay = new Date(firstDate);
        var iterNum = 0;

        while (secondDate >= currentDay) {
            console.log(totalPrice)
            // security break
            if (iterNum > 30) {
                break;
            }

            // look in data for this day
            const currentDayData = selectedDays[dateToString(currentDay)];

            // add the current day to the list of rangeSelected
            //totalRange.push(currentDayData);

            // check if is occupied
            if (currentDayData['ocupado']==true) {
                totalRange = [];
                occupiedDate(currentDayData);
                return;
            }

            // select the day
            currentDayData['señalado']=true;

            // add to the total the price
            totalPrice += parseInt(currentDayData['precio'],10);

            // pass to the next day
            currentDay.setDate(currentDay.getDate() + 1);
        }

        // set the Range selected with its price
        setRangeSelected({
            'price':totalPrice,
            'days':totalRange,
        });

        // update the information about the selected days
        uploadSelectedDays(totalRange);

        // alert of success
        setAlert({
            'display':true,
            'severity':'success',
            'message':`Periodo del ${dateToString(firstDate)} al ${dateToString(secondDate)} seleccionado
            correctamente.`,
        });
    }


    // function triggered by click
    function onClick(target, callback = null) {

        // prevent missclicks
        // if (selectingDay==true){
        //     return
        // }
        
        const targetKey=target['key'];
        const targetValue = target;

        // check if the date is available
        if (targetValue['ocupado'] == true) {
            occupiedDate(targetValue);
            return null;
        }

        // reset the selected range if exists and delete any alert
        unselectAllCells();
        setAlert({});

        // change the focus state
        targetValue['señalado'] = !targetValue['señalado'];

        // if range has been fixed, unselect it
        

        // detect if is an unselect click
        if (targetValue['señalado'] == true) {

            // check if some firstClick exists
            if (firstClicked) {

                // cretate the range of days
                setRange(firstClicked, targetValue);

                // empty the firstClicked
                setFirstClicked(null);
            }
            else {
                setFirstClicked(targetValue);
                setAlert({
                    'display':true,
                    'severity':'info',
                    'message':`Fecha ${targetKey} seleccionada como llegada, indique la fecha de salida.`,
                });
                setRangeSelected({'price':targetValue['precio']});
                console.log(rangeSelected)
            }

            //

        }

        uploadSelectedDays([targetValue]);
        //setSelectedDays([...selectedDays]); // change the array to detect re-rendering
        console.log(targetValue)
    }




    /**************
     * dayCells
     */
    function CalendarGenerator(props) {
        const daysSelectedLocal = props['days-selected'];
        if (!daysSelectedLocal) {
            return null
        }
        const dayCells = [];
        
        // create the dayCells and save in an array
        for (const [key,day] of Object.entries(selectedDays)){ // very important const to not re-write he array
            dayCells.push(
            <div
                    className={
                        `day-container 
                        ${day['ocupado'] == 1 ? ' ocupado' : ''}
                        ${day['señalado'] == true ? ' señalado ' : ''}
                        ${day['situacion']}`
                    }

                    onClick={() => { onClick(day) }}
                    key={key}>

                    <div className='day-header'>
                        {day['dia']}
                    </div>
                    <div className={`day-body`}>
                        {day['precio']}€
                    </div>

            </div>
            );
        }




        return (
            <div className='calendar-container'>
                {dayCells}
            </div>
        )
    };

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
            
            <MonthSelector
                onClick={()=>{setSelectingDay(!selectingDay)}}
                currentMonth={[dateSelected.getMonth()+1]}
                currentYear= {dateSelected.getFullYear()}
                selectingDay={selectingDay}
                setSelection={(month)=>
                    {
                        setDateSelected(month);
                    }
                }
                className={"month-selector-container"}>
            </MonthSelector>

            {/*week day*/}
            <div className='week-day-header'>
            {[...Array(7).keys()].map((n)=>
                (<div className='week-day-cell'>
                    {daysOfWeekDict[(n+1)%7].slice(0,3)}
                </div>
                )
            )}
            </div>

            <CalendarGenerator days-selected={selectedDays}>
            </CalendarGenerator>
            <div className="total-price-container">
                <div className="total-price">
                    Total:
                    {rangeSelected['price']|0} €
                </div>
                {rangeSelected['price']!=0 && 
                <div className= {`next-step-buttom`}
                    onClick={()=>{props?.finalScreen()}}>
                    RESERVAR
                </div>
                }
            </div>

            {alert['display'] == true &&
            <Alert 
                className='alert'
                severity={`${alert['severity']}`}
                onClose={()=>{setAlert({})}}>
                    {alert['message']}
            </Alert>
            }
            

        </div>
    )
}