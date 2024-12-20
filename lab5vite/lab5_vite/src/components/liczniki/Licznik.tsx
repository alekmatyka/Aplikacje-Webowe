import React, { useState } from 'react';

const Licznik = () => {
    const [count,setCounter] = useState(0)


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