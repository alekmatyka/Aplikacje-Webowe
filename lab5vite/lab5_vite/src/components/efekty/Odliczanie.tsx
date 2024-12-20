import React, { useEffect, useState } from 'react';

const Odliczanie = () => {
    const [buttonText, setButton] = useState("start")
    const [time, setTime] = useState(150)
    const [isCountdown,setCountdown] = useState(false)
    const [disableButton, setDisabled] = useState(false)

    
    useEffect(()=>{
        console.log(isCountdown)
        let interval
        if(isCountdown){
            interval = setInterval(()=>{
                setTime(oldTime=>(oldTime-1))
            },100)
            setButton("stop")
        }      
        return () => {
            if (interval) clearInterval(interval);
        };

    },[isCountdown]
    )

    useEffect(()=>{
        if(time==0){
            setDisabled(true)
            setButton("odliczanie zakonczone")
            setCountdown(false)
        }        
    },[time]
    )

    return (
        <div>
            <div>{time/10}</div>
            <button onClick={()=>setCountdown(!isCountdown)} disabled={disableButton}>{buttonText}</button>
        </div>
    );
};

export default Odliczanie;