import React, { useEffect, useRef, useState } from 'react';
import Komentarz from './Komentarz';

interface User{
    id: number,
    username: string,
    fullName: string
}

interface Comment{
    id:number,
    body:string,
    postId:number,
    likes:number,
    user:User
}

const Komentarze = () => {

    const [comments, setComments] = useState<Comment[]>([])
    const hasRunOnce = useRef(false);

    useEffect(() => {
        if(hasRunOnce.current) return;
        hasRunOnce .current = true
        fetch("https://dummyjson.com/comments")
            .then(res => res.json())
            .then((data) => {
                data.comments.forEach((element:any) => {
                    //console.log(element)
                    const newUser: User = {
                        id: element.user.id,
                        username: element.user.username,
                        fullName: element.user.fullName
                    }
                    const newComment: Comment = {
                        id: element.id, body: element.body,
                        postId: element.postId,
                        likes: element.likes,
                        user: newUser
                    }
                        setComments(prev=>[...prev,newComment])
                });
                
            })
    }, [])

    return (
        <div>
            {comments.map((comment)=>{
                return(
                    <div key={comment.id}>
                    <Komentarz {...comment}/>
                    </div>
                )
            })}
        </div>
    );
};

export default Komentarze;