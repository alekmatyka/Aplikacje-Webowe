import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface Article{
    id:string,
    title:string,
    body:string
}

const Blog = () => {

    const [articles, setArticle] = useState<Article[]>(()=>{
        const savedArticles = localStorage.getItem("articles")
        return savedArticles ? JSON.parse(savedArticles) : []
    })

    // useEffect(()=>{
    //     if(hasRunOnce.current) return;
    //     hasRunOnce.current = true
    //     setArticle(prev=>([...prev,a1,a2]))
        
    //     // console.log(articles)
    //     // console.log("hejjoo")
    // },[])

    useEffect(() => {
        // console.log(articles);
        localStorage.setItem('articles',JSON.stringify(articles))
    }, [articles]);






    return (
        <div>
            <Link to='/dodaj'><button>Dodaj Posta!</button></Link>
            {articles.map((article)=>{
                const path = "/article/"+article.id
                return(
                    <div key={article.id}>
                        <Link to={path}>
                            <h1>{article.title}#{article.id}</h1> 
                        </Link>
                    </div>
                )
            })}
        </div>
    );
};

export default Blog;