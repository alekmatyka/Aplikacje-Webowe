import React,{useState,useEffect} from 'react';

const Logowanie = () => {
        
    const [login,setLogin] = useState("")
    const [psswd,setPasswd] = useState("")
    const [rePsswd,setRePasswd] = useState("")
    const [msg,setMsg] = useState("")
    const [disableButton, setDisabled] = useState(true)

    useEffect(()=>{
        if(psswd.length==0 || rePsswd.length==0 || login.length==0){
            setDisabled(true)
        }else{
            setDisabled(false)
            if(psswd!=rePsswd){
                setMsg("Hasla nie sa zgodne")
            }else{
                setMsg("Zalogowano poprawnie")
            }
        }

    })
    

    return (
        <div>
            Login
            <input type='text' value={login} onChange={(e:any)=>{setLogin(e.target.value)}}/>
            <br/>
            Haslo
            <input type='text' value={psswd} onChange={(e:any)=>{setPasswd(e.target.value)}}/>
            <br/>
            Powtorz haslo
            <input type='text' value={rePsswd} onChange={(e:any)=>{setRePasswd(e.target.value)}}/>
            <br/>
            <button disabled = {disableButton} onClick={()=>{alert(msg)}}>Logowanie</button>        
        </div>
    );
;
};

export default Logowanie;

