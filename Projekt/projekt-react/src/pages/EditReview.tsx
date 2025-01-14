import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditReview = () => {
    const { id, userID } = useParams<{ id: string }>();
    const [user,setUser] = useState({})
    const [text,setText] = useState("")
    const [rating,setRating] = useState(5)
    const [disableButton, setDisabled] = useState(true)
    const [disableRatingPlus, setDisabledRatingPlus] = useState(true)
    const [disableRatingMinus, setDisabledRatingMinus] = useState(true)
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
                setUser(data)
                if(data.user!=parseInt(userID) && data.email!="admin@admin.com"){
                    console.log("nie powinno ci etu byc");
                    console.log(data.user)
                    console.log(userID)
                    
                    navigate('/')
                }
                console.log('Success:', data);        
                })
                .catch(error => {
                console.error('Error:', error);
            })
        },[])

        useEffect(()=>{
            fetch(`/api/review/${id}`)
            .then((res)=>res.json())
            .then((data)=>{
                const rev = data.find((element)=>(element.productid == parseInt(id) && element.userID == parseInt(userID)))
                console.log(rev)
                setText(rev.content)
                setRating(rev.rating)
            })
        },[])

        useEffect(()=>{
            if(text.length == 0){
                setDisabled(true)
            } else {
                setDisabled(false)
            }
            if(rating>=5){
                setDisabledRatingPlus(true)
            } else {
                setDisabledRatingPlus(false)
            }

            if(rating<=1){
                setDisabledRatingMinus(true)
            } else {
                setDisabledRatingMinus(false)
            }
        })

        const putReview = ()=>{

            console.log(text);
            const token = localStorage.getItem("token")

            fetch(`/api/review/${id}`,{
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({rating:rating,content:text})
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
                navigate(`/product/${id}`)
                        
                })
                .catch(error => {
                console.error('Error:', error);
            })
        }


    return (
        <div className='home-wrapper'>
            <div className='new-review-wrapper'>
                <div className='really-new-review-wrapper'>
                    <h1>Edytuj opinie</h1>
                    <div className='rating-wrapper'>
                        <h2>Ocena: {rating}/5</h2>
                        <div className='rating-buttons-wrapper'>
                            <button className='amount-change-button' disabled={disableRatingPlus} onClick={()=>{setRating((prev)=>prev+1)}}>+</button>
                            <button className='amount-change-button' disabled={disableRatingMinus} onClick={()=>{setRating((prev)=>prev-1)}}>-</button> 
                        </div>
                    </div>
                    
                    <div className='review-input-wrapper'>
                    <h2>Opinia:</h2>
                    <textarea className='review-input' type='text' value={text} onChange={(e:any)=>{setText(e.target.value)}}/>
                </div>
                <div className='add-button-wrappper'>
                    <button className="add-review-button" disabled={disableButton} onClick={()=>{putReview()}}>opublikuj</button>        
                </div>       
                </div>
            </div>
        </div>
    );
};

export default EditReview;