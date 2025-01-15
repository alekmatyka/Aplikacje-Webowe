import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Review from '../components/Review';
import NewReview from '../components/NewReview';
import { Alert } from 'react-bootstrap';

const Product = () => {
    const { id } = useParams<{ id: string }>();
    const [product,setProduct] = useState({})
    const [reviews,setReviews] = useState([])
    const [user,setUser] = useState({})
    const [updateReviews,setUpdate] = useState(false)
    const navigate = useNavigate()
    const [amount,setAmount]=useState(1)
    const [disableAmountMinus,setDisabled] = useState(true)
    const [isLoggedIn,setLoggedIn] = useState(false)

    useEffect(() => {
        console.log('isLoggedIn:', isLoggedIn);
    }, [isLoggedIn]);

    useEffect(()=>{
        if(amount<=1){
            setDisabled(true)
        } else {
            setDisabled(false)
        }

        if(user.user){
            setLoggedIn(true)
        }
    })

    useEffect(()=>{
        fetch(`/api/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
           // console.log(data)
            setProduct(data)
        })
    },[])

    useEffect(()=>{
        fetch(`/api/review/${id}`)
        .then((res)=>res.json())
        .then((data)=>{
            setReviews(data)
        })
    },[updateReviews])

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
            setUser(data)
            setLoggedIn(true)
            console.log(isLoggedIn)
            console.log('Success:', data);        
            })
            .catch(error => {
            console.error('Error:', error);
        })
    },[])

    const addReview = (rating:number, content:string)=>{
        console.log(content);
        const token = localStorage.getItem("token")

        if(reviews.find((rev)=>(rev.userID==user.user))){
            alert("twoja opinia juz istnieje")
            navigate(0)
            return
        }
        
        
        fetch(`/api/review/${id}`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({rating:rating,content:content})
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
            setUpdate(!updateReviews)
            //navigate(0)
                    
            })
            .catch(error => {
            console.error('Error:', error);
        })
    }

    const deleteReview = (uid) =>{
        const token = localStorage.getItem("token")
        console.log(token)

        fetch(`/api/review/${id}/user/${uid}`,{
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
            return response.json(); // Parse the JSON response
            })
            .then(data => {
            console.log('Success:', data);
            setUpdate(!updateReviews)
            //navigate(0)
                    
            })
            .catch(error => {
            console.error('Error:', error);
        })
    }


    const addToCart = ()=>{
        const token = localStorage.getItem("token")
        console.log(token)

        fetch(`/api/cart`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({productid:parseInt(id),amount:amount})
        })
        .then(response => {
            console.log(token)
            if (!response.ok) {
                console.log(response.json())
                throw new Error(`HTTP error! Status: ${response.status} ${token}`);
                
            }
            return response.json(); // Parse the JSON response
            })
            .then(data => {
            console.log('Success:', data);
            alert("Dodano produkt")
            //navigate(0)
                    
            })
            .catch(error => {
            console.error('Error:', error);
        })        
    }


    return (
        <div className='home-wrapper'>

            <div className='product-display'>
                <div>    
                    <img className='product-img' src={product.image}/>
                </div>
                <div className='product-dispaly-desc'>
                    <div className='product-display-description'>
                        <div className='product-display-name'>
                            <h2>{product.title}</h2>
                            <h3>{product.category}</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className='product-display-price'>
                        <h1>{product.price}$</h1>
                    </div>
                </div>
            </div>
            <div className='cart-adding-wrapper'>
                <div className='amount-wrapper'>
                    <h2>{amount}</h2>
                </div>
                <div className='cart-adding-button-wrapper'>
                    <button className='amount-change-button' onClick={()=>{setAmount((prev)=>prev+1)}}>+</button>
                    <button className='amount-change-button' disabled={disableAmountMinus} onClick={()=>{setAmount((prev)=>prev-1)}}>-</button>
                </div>
            </div>
            <div className='add-button-wrapper'>
                <button className='add-cart-button' disabled={!isLoggedIn} onClick={()=>{addToCart()}}>Dodaj do koszyka</button> 
                {isLoggedIn ? "" : <Alert className='alert' variant='info'><Link to="/login"><u>Zaloguj się</u></Link>, aby dodać produkt do koszyka</Alert>}
            </div>
                

            <NewReview addReview={addReview}/>

            {/* {JSON.stringify(reviews)} */}

            <div className='review-wrapper'>
                <h1>Opinie uyzytkownikow</h1>
                {
                    reviews.map((rev)=>{
                        return( <Review rev={rev} usr={user} deleteReview={deleteReview}/>)
                    })
                }
            </div>
        </div>
    );
};

export default Product;