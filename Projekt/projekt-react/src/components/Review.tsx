import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Review = (props:any) => {

    const rev = props.rev
    const deleteReview = props.deleteReview

    const [token,setToken] = useState("")
    const [email,setEmail] = useState("")
    const user = props.usr

    useEffect(() => {
        const newToken = localStorage.getItem("token");
        setToken(newToken);
       // console.log(newToken);

        fetch(`/api/users/${rev.userID}`)
        .then((res)=>res.json())
        .then((data)=>{
            setEmail(data.email)
        })
        
        }, []);
        


    return (
        <div className='review'>
            <div className='review-content'>
                <div className='review-user'>
                    <div className='review-rating'><h1>{rev.rating}/5</h1></div>
                    <div className='review-user-info'>
                        <h3>{email}</h3>
                        <h4>userId: {rev.userID}</h4>
                    </div>
                </div>
                <div className="review-content-text">
                    <p>{rev.content}</p>
                </div>
            </div>
            <div className='review-buttons'>
            {
                (user.user==rev.userID || user.email=="admin@admin.com") ? <button className='review-button' onClick={()=>deleteReview(rev.userID)}>usun</button> : ' '
            }
            {
                (user.user==rev.userID) ? <Link to={`/product/${rev.productid}/editreview/${user.user}`} ><button className='review-button' >edytuj</button></Link> : ' '
            }
            </div>
        </div>
    );
};

export default Review;