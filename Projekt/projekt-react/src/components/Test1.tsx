import React, { useEffect, useState } from 'react';

const Test1 = () => {
    
    const [msg,setMsg] = useState('')

    useEffect(()=>{

        fetch('/api/test')
        .then((res) => res.json())
        .then((data) => setMsg(data.msg));

    },[])
    
    return (
        <div>
            {msg}
        </div>
    );
};

export default Test1;