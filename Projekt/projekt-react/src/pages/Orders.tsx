import React, { useEffect, useState } from 'react';
import { useFetcher, useNavigate } from 'react-router-dom';
import ProductListElement from '../components/ProductListElement';
import { Accordion } from 'react-bootstrap';
import BasicExample from '../components/BasicExample';
import dayjs from 'dayjs';

const Orders = () => {
    const [user,setUser] = useState({})
    const navigate = useNavigate()
    const [updateOrders,setUpdate] = useState(true)
    const [orders,setOrders] = useState([])

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

        fetch('/api/order',{
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
            setOrders(data)
            console.log('Success:', data);        
            })
            .catch(error => {
            console.error('Error:', error);
        })
    },[updateOrders])


    const deleteOrder = (id)=>{
        const token = localStorage.getItem("token")
        console.log(token)

        fetch(`/api/order/${id}`,{
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
            setUpdate(!updateOrders)
            //navigate(0)
                    
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
                orders.length==0 ? <h1>Brak aktywnych zamówień</h1>:
            
            <div className='summary-wrapper'>
                {orders.map((order)=>{
                    return(<div className='summary'>
                        <div className='summary-header'>
                            <h1>Zamowienie #{order.order}</h1>
                            <h2>
                            Suma: {roundToDecimal(order.sum,2)}$
                            </h2>
                            <h2>{dayjs(order.date).format('YYYY-MM-DD HH:mm:ss')}</h2>
                            <button className='order-button' onClick={()=>{deleteOrder(order.order)}}>Usuń zamówienie</button>
                        </div>
                        <div className='summary-items'>
                            {order.details.map((product)=>{
                                return(<div className='product-list-wrapper'><ProductListElement product={product}/></div>)
                            })}
                            
                        </div>
                    </div>)
                })}
            </div>
            }
        </div>
    );
};

export default Orders;