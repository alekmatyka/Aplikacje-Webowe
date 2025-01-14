import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Productelement from '../components/Productelement';

const Home = () => {

    const [products,setProducts] = useState([])
    const [loaded,setLoaded] = useState(false)
    const [text,setText] = useState("")
    

    useEffect(()=>{
        fetch('/api/products')
            .then((res)=>res.json())
            .then((data)=>{
                setProducts(data)
                setLoaded(true)
            })
    },[])


    return (
        <div className='home-wrapper'>

            <br/>
            
            <br/>
            <div className='searchbar-wrapper'>
                <h3>Wyszukaj</h3>
                <input type='text' className="search-bar" placeholder='🔍' value={text} onChange={(e:any)=>{setText(e.target.value)}}/>
            </div>

            {loaded ? products
            .filter((product)=>{
                try{
                const regex = new RegExp(text,"iu")
                return regex.test(product.title) || regex.test(product.category)
                }catch(error){
                    setText("")
                }
            })
            .map((product)=>{
                const productPath = '/product/'+product.id
                return(
                    <Link to={productPath}>
                        <Productelement product={product}/>
                    </Link>
                )
            }) : <h1>Ładowanie</h1>}
        </div>
    );
};

export default Home;