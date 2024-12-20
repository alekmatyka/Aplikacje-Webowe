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
        if(!isCountdown){
            setButton("start")
            if(time==0){
                setButton("odliczanie zakonczone")
            }
        }  
        return () => {
            if (interval) clearInterval(interval);
        };

    },[isCountdown]
    )

    useEffect(()=>{
        if(time==0){
            setDisabled(true)
            setCountdown(false)
            setButton("odliczanie zakonczone")
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