import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Article{
    id:string,
    title:string,
    body:string
}

const Dodaj = () => {

    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const navigate = useNavigate();

    const currentArticles = localStorage.getItem("articles")
    const articles = currentArticles ? JSON.parse(currentArticles) : []

    function addArticle(){
        let id=1
        while(isAlready(id)){
            id++
        }
        const newArticle: Article = {id:id.toString(),title:title,body:body}
        articles.push(newArticle)
        localStorage.setItem("articles",JSON.stringify(articles))
        navigate("/blog")
    }

    const [disableButton, setDisabled] = useState(true)

    const isAlready = (id:number) =>{
        return articles.some((art:Article)=>art.id===id.toString())
    }

    useEffect(()=>{
        if(title.length==0 || body.length==0){
            setDisabled(true)
        }else{
            setDisabled(false)
        }

    })

    return (
        <div>
            Tytul:
            <input type='text' value={title} onChange={(e:any)=>{setTitle(e.target.value)}}/>
            <br/>
            Tresc
            <input type='text' value={body} onChange={(e:any)=>{setBody(e.target.value)}}/>
            <br/>
            
            <button onClick={()=>{addArticle()}} disabled={disableButton}>Dodaj</button>
        </div>
    );
};

export default Dodaj;