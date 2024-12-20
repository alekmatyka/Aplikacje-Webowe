import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik = () => {

    const [count, setCount] = useState(0)
    
    function increaseCount(){
        setCount(count+1)
    }

    return (
        <div>
            NowyLicznik: {count}
            <Przycisk  plusCount={increaseCount}/>
            
        </div>
    );
};

export default NowyLicznik;