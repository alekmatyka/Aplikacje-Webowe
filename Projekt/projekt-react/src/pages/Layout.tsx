import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {

    const [token,setToken] = useState("")
    const [user,setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const newToken = localStorage.getItem("token");
        setToken(newToken);
        console.log(newToken);
      }, []);


    useEffect(()=>{
        //pobranie tokena z pamieci
    //   const newtoken=localStorage.getItem("token")
    //   setToken(()=>newtoken)
    //   console.log(localStorage.getItem("token"));
      
       console.log(token)

      //pobranie uzytkownika
      fetch('/api/user',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        setUser(data)
        console.log('Success:', data);        
      })
      .catch(error => {
        console.error('Error:', error);
    })


    },[token])
    
    return (
        <div className='wrapper'>
            <header>
            <Link to="/" ><div className='header-main'>Strona glowna</div></Link>
            <div className='other-wrapper'>
                <div className='header-user'>{user.email}</div>
                { user.user ?
                        <Link to="/koszyk"><div className='header-other'>Koszyk</div></Link>
                        : ''
                }
                { user.user ?
                        
                    <Link to="/orders"><div className='header-other'>Zamowienia</div></Link>
                : ''
                }

                <Link to="/login"><div className='header-other'>Zaloguj sie</div></Link> 


                <Link to="/register"><div className='header-other'>Zarejestruj sie</div></Link>

                <div className='header-other' onClick={()=>{
                  localStorage.setItem("token","")
                  navigate('/')
                  navigate(0)
                }}>Wyloguj się</div>
            
            </div>
            </header>  
            {/* {token}<br/>
            {JSON.stringify(user)} */}

            <Outlet/>
        </div>
    );
};

export default Layout;