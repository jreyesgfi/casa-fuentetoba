import { Alert } from '@material-ui/lab';
import { useEffect, useRef, useState } from 'react';
import IDGenerator from '../../operators/IdGenerator';
import './custom-alert.css'

export default function CustomAlert(props) {
    /**
 * Alert config
 */

    const [alertDisplayLocal, setAlertDisplayLocal] = useState(true);
    const alertDisplay = props?.display || false;
    const alertMessage = props?.message || '';
    const alertSeverity = props?.severity || 'info';
    const alertRef = useRef();
    alertRef.current = props?.reference || 0;
    
    //
    const [extraClassName,setExtraClassName] = useState('');

    /**
     * init the timer
     */

    async function initTheTimer(time = 5000) {

        // track this alert
        const id = alertRef.current;

        //define a function to wait 
        await new Promise(() => {
            setTimeout(() => {
                console.log(alertRef.current, id)
                // check if the current alert is the one seted
                if (alertRef.current === id) {
                    console.log('fading')

                    // start the fading out
                    setExtraClassName('fading-out');
                }
            }, time);

            setTimeout(() => {
                // check if the current alert is the one seted
                if (alertRef.current === id) {
                    // make it dessapear
                    setAlertDisplayLocal(false);
                }
            }, 1500 + time);
        });
        return
    }


    // each time the alert change
    function resetAlert(){
        setAlertDisplayLocal(true);
        setExtraClassName('');
        initTheTimer();
    }

    useEffect(
        ()=>{
            resetAlert();}
    ,[alertRef.current])

    if (!alertDisplay === true || !alertDisplayLocal === true) {
        return null;
    }

    return (
        <Alert
            className={`alert ${extraClassName||''}`}
            severity={`${alertSeverity}`}
            onClose={() => { setAlertDisplayLocal(false); alertRef.current = 0; }}>
            {alertMessage}
        </Alert>
    )
}