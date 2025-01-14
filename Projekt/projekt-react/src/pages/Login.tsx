import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [login,setLogin] = useState("")
    const [psswd,setPasswd] = useState("")
    const [a1,setA1] = useState(true)
    const [a2,setA2] = useState(true)
    const [disableButton, setDisabled] = useState(true)
    const navigate = useNavigate();

    const regEmail = /\S+@\S+\.\S+/;

    useEffect(()=>{
        if(psswd.length==0 || login.length==0 || !regEmail.test(login)){
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

    })

    
    const loginUser = ()=>{
        fetch('/api/login',{
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
            alert("Bład logowania")
            console.error('Error:', error);
        })
    }
    

    return (
        <div className='login-wrapper'>
            <div className='login-input-wrapper'>
            <h3>Email</h3>
            <input type='text' className='login-input' value={login} onChange={(e:any)=>{setLogin(e.target.value)}}/>
            </div>
            { a1 ? <Alert className='alert-error' variant='info'>Niepoprawny emial</Alert> :""}
            <br/>
            <div className='login-input-wrapper'>
            <h3>Haslo</h3>
            <input type='text' className='login-input' value={psswd} onChange={(e:any)=>{setPasswd(e.target.value)}}/>
            </div>
            { a2 ? <Alert className='alert-error' variant='info'>Niepoprawne hasło</Alert> :""}
            <br/>
            <button disabled = {disableButton} className='login-button' onClick={()=>{loginUser()}}>Logowanie</button>  
            <br/>
            <Alert className='alert-info' id='k' variant='info'>Nie masz konta? <Link to="/register"><u>Zarejestruj się</u></Link></Alert> 
        </div>
    );
};

export default Login;