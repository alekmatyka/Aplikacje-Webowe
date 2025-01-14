import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewReview = (props:any) => {

    const addReview=props.addReview

    const [text,setText] = useState("")
    const [rating,setRating] = useState(5)
    const [disableButton, setDisabled] = useState(true)
    const [disableRatingPlus, setDisabledRatingPlus] = useState(true)
    const [disableRatingMinus, setDisabledRatingMinus] = useState(true)

    useEffect(()=>{
        if(text.length == 0 || localStorage.getItem("token")==""){
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


    return (
        <div className='new-review-wrapper'>
            <div className='really-new-review-wrapper'>
                <h1>Dodaj opinie</h1>
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
                    <button className="add-review-button" disabled={disableButton} onClick={()=>{addReview(rating,text)}}>opublikuj</button>        
                </div>
                {localStorage.getItem("token")=="" ? <Alert className='alert-review' variant='info'><Link to="/login"><u>Zaloguj się</u></Link>, aby dodać opinie</Alert> : ""}
            </div>
        </div>
    );
};

export default NewReview;