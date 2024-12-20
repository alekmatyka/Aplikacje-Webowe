import React, { useEffect, useState } from 'react';

const Tytul = () => {

    const [title,setTitle] = useState("")

    useEffect(()=>{
        document.title=title
    },[title])

    return (
        <div>
            <input type='text' value={title} onChange={(e:any)=>{setTitle(e.target.value)}}></input>
        </div>
    );
};

export default Tytul;