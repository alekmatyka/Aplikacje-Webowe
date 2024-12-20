import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Art{
    id:string,
    title:string,
    body:string
}

const Article = () => { 
    const emptyArticle:Art = {id: "", title: "Nie ma takiego artykulu", body:""}
    const { id } = useParams<{ id: string }>();
    const articles = localStorage.getItem("articles")
    let article
    if(articles){
        article = JSON.parse(articles).find((art:Art)=>art.id===id)
        if(article === undefined){
            article = emptyArticle
        }
    }else{
        article = emptyArticle
    }    
    

    return (
        <div>
            <h2>{article.title}</h2>
            {article.body}
        </div>
    );
};

export default Article;