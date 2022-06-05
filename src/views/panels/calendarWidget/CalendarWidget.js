import { useEffect, useRef, useState } from "react";
import "./calendar-widget.css"

import Papa from "papaparse";
import IDGenerator from "../../../operators/IdGenerator.js"

import { dateToString } from "../../../elements/parser/dateParser";
import daysCalendar from "../../../elements/daysExample/ejemploDays.csv";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";


export default function CalendarWidget(props) {

    /**
     * Initial dicts definition
     */
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
        2: new Date().getFullYear % 4 == 0 ? 29 : 28,
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


    /****************************
     Recover the calendar days 
    *****************************/
    // state for manage the loading
    const [loadingDays, setLoadingDays] = useState(true);

    async function uploadDaysData() {
        setLoadingDays(true);
        const parsing = new Promise(() => {
            Papa.parse(props.daysCalendar || daysCalendar, {
                header: true,
                skipEmptyLines: true,
                download: true,
                complete: async function (results) {
                    const daysPromise = new Promise((resolve) => resolve(changeDaysToDict(results.data)));
                    daysPromise.then(daysInObject => {
                        setDaysData(daysInObject)
                    })
                }
            })
            return null
        }
        )
        await parsing;
        setLoadingDays(false);
    }

    async function changeDaysToDict(df) {
        const finalDf = new Promise((resolve) => {
            const dfToReturn = {};
            df.forEach((row) => {
                dfToReturn[row['dia'].toString()] = row
            })
            return resolve(dfToReturn)
        });
        await finalDf;
        return finalDf
    }

    /**
     * Displayed period
     */

    // first date needed calculated
    const rangeToDisplay= (arbitraryDay)=>{
        // 1 of these month
        const firstOfMonth = new Date(arbitraryDay.getTime());
        firstOfMonth.setDate(1);

        // last of month
        const lastOfMonth = new Date(arbitraryDay.getTime());

        lastOfMonth.setDate(daysOfEachMonth[arbitraryDay.getMonth()+1]);
        
        // complete the week with previous days
        const prevMonday = new Date(firstOfMonth.getTime());
        prevMonday.setDate(2-firstOfMonth.getDay()); //1 cause you are currently in the first and 1 cause monday is 0 not 1

        return [prevMonday,[firstOfMonth,lastOfMonth]];
    }

    // generate the whole bunch of days needed to display
    const displayedDates = (firstDayCalculatedLocal) => {

        // variables that takes a place into the loop
        const dayThatChanges = new Date(firstDayCalculatedLocal.getTime());
        const list = [];

        // add all the days
        for (let i = 0; i < 42; i++) {
            list.push(dateToString(dayThatChanges, "mm/dd/yyyy"));
            dayThatChanges.setDate(dayThatChanges.getDate() + 1);
        }
        return list
    };

    // obtain the objects related to the data
    /**
     * 
     * @param {*} displayedDatesArrayLocal 
     * @param {*} firstLastDayInMonth: [firstDayInMont,lastDayInMonth]
     * @returns 
     */
    const displayedObjects = (displayedDatesArrayLocal,[firstDayInMonth,lastDayInMonth]) => {

        // //make a copy of the data dict
        // const objDict = {...daysData};

        // fill the objDataArray and objDict
        const objList = displayedDatesArrayLocal.map((date) => {
            const dayDateFormat = new Date(date);

            //recover the data
            const dayInData = daysData?.[date]
                || { 'dia': date, 'precio': new Date(date).getDay() > 3 ? 300 : 150, 'ocupado': 0 };
            
            // add custom values
            dayInData['situacion'] = dayInData?.['situacion'] || ` 
                ${dayDateFormat<firstDayInMonth && dayDateFormat.getDate()!==1? 'previous':''}
                ${dayDateFormat.toDateString()===today.toDateString()? 'today':''}
                ${dayDateFormat>lastDayInMonth?'incoming':''} `;

            //return
            return dayInData;
        });
        return objList
    };

    /**
     * plot all days
     */
    
    /**
     * 
     * @param {*} daysArrayLocal 
     * @returns calendar plot
     */
    const plotDayTiles = (daysArrayLocal) => {
        // check if have data
        if (!daysArrayLocal) {
            return null
        }

        // create the array of tilesToPlot
        const tilesToPlot = daysArrayLocal.map((dayLocal) =>
        (/*day container*/
            <div className={`day-container
            ${dayLocal['ocupado'] == 1 ? ' ocupado' : ''}
            ${dayLocal['situacion']} 

            ${selectedDays[dayLocal['dia']] ? ' appointed ' : ''}
            `}

                /*day clickBehavior*/
                onClick={() => { clickInDay(dayLocal) }}
                key={IDGenerator()}>

                {/*content*/}
                <div className='day-header'>
                    {dayLocal['dia'][3]==='0'?dayLocal['dia'].slice(4,5):dayLocal['dia'].slice(3,5)}
                </div>
                <div className='day-body'>
                    {dayLocal['precio']}€
                </div>
            </div>
        )
        )

        //return the tiles array
        return (

            <div className='calendar-container'>
                {tilesToPlot}
            </div>

        )

    }


    /**
     *  Calls to functions and data flow
     */

    // a call to the function at the beggining
    useEffect(() => {
        uploadDaysData(); //saved in daysData

    }, [])

    // pipeline to the flow
    function flowPipeline(dayToFocusLocal) {
        // 1 determine firstDateCalculated
        const [firstDateCalculatedLocal, firstLastRange] = rangeToDisplay(dayToFocusLocal);

        // 2 needed days to evaluate (string format)
        const displayedDatesArray = displayedDates(firstDateCalculatedLocal);

        // #3 obtain its asociated objects (dict format)
        const displayedObjArray = displayedObjects(displayedDatesArray, firstLastRange);

        // #4 plot the days
        return plotDayTiles(displayedObjArray)
    }


    // daysData[dateToString(  )]

    /*********************
     *  functions to define the interaction
     *******************/

    //click function
    const clickInDay = (dateObj) => {
        //check if is an unselect click
        if (rangeState!==0){
            unSelectAll();
        }

        //check if is first click
        else if (Object.keys(selectedDays).length === 0){
            selectDay(dateObj);
        }
        
        // check if second click
        else  if (Object.keys(selectedDays).length === 1){
            selectRange(dateObj);
        }
        
        // otherwise is a click after select a range
        else{
            unSelectAll();
        }
    }

    function unClick(){
        
    }



    /**
     * Functions to select
     */

    function selectDay(dateObj){
        const selectedDaysCopy = {...selectedDays};
        selectedDaysCopy[dateObj['dia']]= dateObj;
        setSelectedDays(selectedDaysCopy);

        // check if is occupied
        if (dateObj['ocupado'] == 1) {
            occupiedDate(dateObj['dia']);
            return null;
        }
    }

    function selectRange(dateObj){
        selectDay(dateObj)
        
        // order the days
        const selectedDay = selectedDays[Object.keys(selectedDays)[0]];
        var firstDate = selectedDay;
        var secondDate = dateObj;
        if (new Date(dateObj['dia'])<new Date(selectedDay['dia']) ){
            firstDate = dateObj;
            secondDate = selectedDay;
        }
        
 
         // keep the track of the setOfDays
         var totalRange = {};
 
         // manage each iteration and break the loop params
         var currentDay = new Date(firstDate['dia']);
         const limitDay = new Date(secondDate['dia']);
         var iterNum = 0;
         console.log('hi', limitDay, currentDay)
 
         while (limitDay >= currentDay) {
             // security break
             if (iterNum > 30) {
                 break;
             }
 
             // save as an string
             const currentDayStr = dateToString(currentDay, "mm/dd/yyyy");
 
             // add the current day to the list of rangeSelected
             totalRange[currentDayStr] = currentDayStr;

             // check if it is occupied
             console.log(isOccupied(currentDayStr))
             if (isOccupied(currentDayStr)==1){
                // totalRange = {};
                // break;
                occupiedDate(currentDayStr);
             }
 
              // pass to the next day
             currentDay.setDate(currentDay.getDate() + 1);
        }

        setSelectedDays(totalRange);
    }

    function unSelectAll(){
        setSelectedDays({});
        setRangeState(0);
    }

    // function justSelectOne(dateObj){
    //     setSelectedDays({[dateObj['dia']]:dateObj});
    //     setRangeState(0);
    // }

    /*************
     * Functions to import the data with rules
     */

     function isOccupied(dayText){
        const answer = daysData?.[dayText]?.['ocupado'] || 0;
        if (answer===1){
            occupiedDate(dayText);
        }
        return answer
    }

    function whatIsPrice(dayText){
        const answer = daysData?.[dayText]?.['precio'] || new Date(dayText).getDay() > 3 ? 300 : 150;
        return answer
    }


    /**
     * funtions to update the selected range
     */
    const [rangeState, setRangeState]= useState(0);//-1 wrong range; 0 pending; 1 approved

    // function component to display the price
    function PriceComponent(){
        if (Object?.keys(selectedDays).length<2){
            return null
        }
        
        const totalPrice=
            // change to its price
            Object.keys(selectedDays).map((day)=>whatIsPrice(selectedDays[day])).
            // add to the total
            reduce((p1,p2)=> p1+p2)
        
        // check if its enough
        finalCheck(totalPrice);

        return totalPrice
    }

    function occupiedDate(dateText){

        // the alert
        sendAlert({
            'display': true,
            'severity': 'warning',
            'message': `El día ${dateText} está ocupado, selecciona una fecha disponible.`,
        });

        // wrong range
        setRangeState(-1);


        return null;
    }

    function finalCheck(totalPrice=0){

        // check if we are pending for final check
        if (rangeState!==0){
            return null
        }


        //determine if pass
        var pass = true;
        if (totalPrice < 600){
            pass = false;
        }
        
        //act depending on the pass value
        if (pass===true){
            setRangeState(1);
        }
        else{
            setRangeState(-1);
        }

        return null
    }





    /**
     * Interactions with the container
     */
    const sendAlert = props?.sendAlert || (()=>{});


    /**
     * important days
     */
    
    // today
    const today = new Date();
    
    // state to keep the processed data
    const [daysData, setDaysData] = useState({});

    // day that points the month to display
    const dayToFocus = props?.dayToFocus||new Date();

    // selected days
    const [selectedDays,setSelectedDays] = useState({});


    /**
     * The plot of the component
     */

    return (
        <div className=" calendar-widget">


            {/*week day*/}
            <div className='week-day-header'>
                {[...Array(7).keys()].map((n) =>
                (<div className='week-day-cell'>
                    {daysOfWeekDict[(n + 1) % 7].slice(0, 3)}
                </div>
                )
                )}
            </div>
            <div update={selectedDays}
                className={`
                    ${rangeState<0?' wrong-period':''}
                    ${rangeState===0?' indetermined-period':''}
                    ${rangeState>0?' approved-period':''}
                `}>
                {flowPipeline(dayToFocus)}
            </div>
            <PriceComponent>
            </PriceComponent>
            


        </div>
    )
}