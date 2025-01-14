import React, { useEffect, useState } from 'react';
import ProductListElement from '../components/ProductListElement';
import { useNavigate } from 'react-router-dom';

const Koszyk = () => {

    const [cart,setCart] = useState({})
    const [cartlist,setCartList] = useState([])
    const [updateCart,setUpdate] = useState(false)
    const [user,setUser] = useState({})
    const navigate = useNavigate()

        useEffect(()=>{
    
            const token = localStorage.getItem("token")
            console.log(token)
    
            fetch('/api/user',{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
            })
            .then(response => {
                console.log(token)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status} ${token}`);
                }
                return response.json(); // Parse the JSON response
                })
                .then(data => {
                if(!data.user){
                    navigate('/')
                }
                setUser(data)
                console.log('Success:', data);        
                })
                .catch(error => {
                console.error('Error:', error);
            })
        },[])

    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        console.log(token)

        fetch('/api/cart',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
        })
        .then(response => {
            console.log(token)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${token}`);
            }
            return response.json(); // Parse the JSON response
            })
            .then(data => {
            setCart(data)
            setCartList(data.cart)
            console.log('Success:', data);        
            })
            .catch(error => {
            console.error('Error:', error);
        })
    },[updateCart])


    const deleteProduct = (id)=>{
        const token = localStorage.getItem("token")
        console.log(token)

        fetch(`/api/cart/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
        })
        .then(response => {
            console.log(token)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} ${token}`);
                
            }
            })
            .then(data => {
            console.log('Success:', data);
            setUpdate(!updateCart)
            //navigate(0)
                    
            })
            .catch(error => {
            console.error('Error:', error);
        })
    }

    const sendOrder = ()=>{
        const token = localStorage.getItem("token")        
        
        fetch(`/api/order`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
        })
        .then(response => {
            console.log(token)
            if (!response.ok) {
                alert("twoja opinia juz istnieje")
                throw new Error(`HTTP error! Status: ${response.status} ${token}`);
                
            }
            return response.json(); // Parse the JSON response
            })
            .then(data => {
            console.log('Success:', data);
            setUpdate(!updateCart)
            navigate('/orders')
                    
            })
            .catch(error => {
            console.error('Error:', error);
        })
    }

    function roundToDecimal(value, decimals) {
        const factor = Math.pow(10, decimals);
        return Math.round(value * factor) / factor;
    }

    return (
        <div className='home-wrapper'>
            {
                cartlist.length==0 ? <h1>Koszyk jest pusty</h1> : 
            
            

            <div className='summary-wrapper'>
                <div className='summary'>
                    <div className='summary-header'>
                        <h2>Wartość koszyka:</h2><h2> {roundToDecimal(cart.sum,2)} $</h2>
                    </div>
                    <div className='summary-items'> 

                        {cartlist.map((product)=>{
                            return(<div className='product-list-wrapper'><ProductListElement product={product} />
                            <button className='delete-product' onClick={()=>{deleteProduct(product.productid)}}>Usuń</button></div>
                        
                    )
                        })}
                    </div>
                </div>
            </div>
            }
            

            {
                cartlist.length==0 ? "" : <button className='order-button' onClick={()=>{sendOrder()}}>zamów</button>
            }
            
        </div>
    );
};

export default Koszyk;