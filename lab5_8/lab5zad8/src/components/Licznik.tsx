import React, { useEffect, useState } from 'react';

const Licznik = () => {
    const [count,setCounter] = useState<number>(()=>{
        const savedCount = localStorage.getItem("count")
        return savedCount ? parseInt(savedCount,10) : 0
    })

    useEffect(()=>{
        localStorage.setItem("count",count.toString())
    },[count])


    return (
        <div>
            Licznik: {count}<br/>
            <button onClick={()=>{
                setCounter((oldCount)=>oldCount+1)
            }}>
                
                kliknij mie

            </button>
        </div>
    );
};

export default Licznik;