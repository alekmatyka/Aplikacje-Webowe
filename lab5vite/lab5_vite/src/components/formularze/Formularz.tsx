import React, { useState } from 'react';

const Formularz = () => {

    const [text,setText] = useState("")

    const textChanged = (e:any) =>{
        setText(e.target.value)
    }

    return (
        <div>
            <div>{text}</div>
            <br/>
            <input type='text' value={text} onChange={textChanged}/>
            
        </div>
    );
};

export default Formularz;

