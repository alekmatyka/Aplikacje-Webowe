import React, { useEffect, useState } from 'react';

const Haslo = () => {
    
    const [psswd,setPasswd] = useState("")
    const [rePsswd,setRePasswd] = useState("")
    const [msg,setMsg] = useState("")

    useEffect(()=>{
        if(psswd.length==0 && rePsswd.length==0){
            setMsg("Prosze wprowadzic haslo")
        }else if( psswd!=rePsswd){
            setMsg("Hasla nie sa zgodne")
        }else{
            setMsg("")
        }

    })
    

    return (
        <div>
            Haslo
            <input type='text' value={psswd} onChange={(e:any)=>{setPasswd(e.target.value)}}/>
            <br/>
            Powtorz haslo
            <input type='text' value={rePsswd} onChange={(e:any)=>{setRePasswd(e.target.value)}}/>
            <br/>
            <div>
                {msg}    
            </div>        
        </div>
    );
};

export default Haslo;