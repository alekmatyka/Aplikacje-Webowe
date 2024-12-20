import React, { useEffect, useState } from 'react';

const Licznik2 = () => {
    const [count,setCounter] = useState(0)

    useEffect(()=>{
        console.log("hello world")
    },[])

    useEffect(()=>{
        if(count>0){
            console.log("Licznik zwiększył się do " + count)
        }
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

export default Licznik2;