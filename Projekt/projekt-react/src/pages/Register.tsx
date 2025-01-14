import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [login,setLogin] = useState("")
    const [psswd,setPasswd] = useState("")
    const [rePsswd,setRePasswd] = useState("")
    const [disableButton, setDisabled] = useState(true)
    const [a1,setA1] = useState(true)
    const [a2,setA2] = useState(true)
    const [a3,setA3] = useState(true)
    const navigate = useNavigate();
    const regEmail = /\S+@\S+\.\S+/;

    useEffect(()=>{
        if(psswd.length==0 || rePsswd.length==0 || login.length==0 || psswd!=rePsswd || !regEmail.test(login)){
            setDisabled(true)
        }else{
            setDisabled(false)
        }

        if(!regEmail.test(login)){
            setA1(true)
        }
        else{
            setA1(false)
        }

        if(psswd.length==0){
            setA2(true)
        }
        else{
            setA2(false)
        }

        if(psswd!=rePsswd){
            setA3(true)
        }
        else{
            setA3(false)
        }

    })

    
    const registerUser = ()=>{
        fetch('/api/register',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({email:login,password:psswd})
        })
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
          })
          .then(data => {
            console.log('Success:', data);
            const token=localStorage.setItem("token",data.token)
            window.location.reload();
            navigate('/')
            navigate(0)
            
          })
          .catch(error => {
            alert("blad rejestracji")
            console.error('Error:', error);
        })
    }
    

    return (
        <div className='login-wrapper'>
            <div className='login-input-wrapper'>                
            <h2>Email</h2>
            <input type='text' className='login-input' value={login} onChange={(e:any)=>{setLogin(e.target.value)}}/>
            </div>
            { a1 ? <Alert className='alert-error' variant='info'>Niepoprawny emial</Alert> :""}
            <br/>
            <div className='login-input-wrapper'>  
            <h2>Haslo</h2>
            <input type='text' className='login-input' value={psswd} onChange={(e:any)=>{setPasswd(e.target.value)}}/>
            </div>
            { a2 ? <Alert className='alert-error' variant='info'>Niepoprawne hasło</Alert> :""}
            <br/>
            <div className='login-input-wrapper'>  
            <h2>Powtorz haslo</h2>
            <input type='text' className='login-input' value={rePsswd} onChange={(e:any)=>{setRePasswd(e.target.value)}}/>
            </div>
            { a3 ? <Alert className='alert-error' variant='info'>Hasła się nie zgadzają</Alert> :""}
            <br/>
            <button disabled = {disableButton} className="login-button" onClick={()=>{registerUser()}}>Zarejestruj się</button> 
            <br/>

        </div>
    );
};

export default Register;