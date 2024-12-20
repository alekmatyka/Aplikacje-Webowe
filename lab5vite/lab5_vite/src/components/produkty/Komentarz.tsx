import React, { useState } from 'react';

const Komentarz = (props:any) => {
    const {id, body, 
        postId, likes, user} = props

    const [postLikes,setLikes] = useState(likes)
    return (
        <div className='comment'>
            <h4>{postId}:{id}</h4>
            <div className='usr'>
                <h2>{user.fullName}</h2> &nbsp;
                <h4>{user.username}#{user.id}</h4>
            </div>
            <h3>{body}</h3>
            <div className='likes'>
            <button onClick={()=>setLikes(oldLikes=>(oldLikes+1))}>+</button>
            <h3>{postLikes}</h3>
            <button onClick={()=>setLikes(oldLikes=>(oldLikes-1))}>-</button>
            </div>
        </div>
    );
};

export default Komentarz;