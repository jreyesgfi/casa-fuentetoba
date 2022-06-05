import './month-selector.css';
import SelectionWheel from './SelectionWheel';

import { fillWithZero } from '../../../../elements/parser/dateParser';

export default function MonthSelector(props){
    const currentMonth = props?.currentFocusedDay.getMonth() + 1;
    const currentYear = props?.currentFocusedDay.getFullYear();
    const initialYear = new Date().getFullYear();
    const setSelection = props?.setSelection;


    // defining the days lists
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

    var monthList = [...Array(12).keys()];
    monthList = monthList.map((e)=>monthsDict[e+1]);


    function adjustMonth(date){
        const month = fillWithZero((date['month']+1 || currentMonth).toString());
        const year = (date['year'] || currentYear).toString();
        const newSelection = new Date(`${month}-01-${year}`);
        console.log(newSelection);
        setSelection(newSelection);
    }

    return (
        <div className="month-selector-container">
            <div className="month-selector">
                <div className="date-text button"
                onClick={()=>{props.onClick()}}>
                    {`${monthsDict[currentMonth]}, ${currentYear}`}
                </div>
                {props?.selectingDay == true &&
                    <div className='selection-panel'>
                        <SelectionWheel 
                            className="date-selector-box"
                            elementsArray={[initialYear,initialYear+1]}
                            width={25}
                            initialPos={currentYear}
                            callback={(year)=>{adjustMonth({'year':[initialYear,initialYear+1][year]})}}
                            >
                        </SelectionWheel>
                        <SelectionWheel 
                            className="date-selector-box"
                            elementsArray={monthList}
                            initialPos={currentMonth-1}
                            callback={(month)=>{adjustMonth({'month':month})}}
                            clickCallback={()=>{props.onClick()}}
                            >
                        </SelectionWheel>
                    </div>
                }
            
            </div>
        </div>
    );

}