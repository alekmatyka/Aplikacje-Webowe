import React from 'react';

const Productelement = (props:any) => {
    const product = props.product
    return (
        <div className='product-element'>
            <div className='product-description'>
                <div className='product-img'>
                    <img className='product-home' src={product.image}/>
                </div>
                <div className='product-name'>
                    <h2>{product.title}</h2>
                    <h3>{product.category}</h3>
                </div>
                <div className='product-name'>
                    <p>{product.description}</p>
                </div>
            </div>
            <div className='product-price'>
                <h1>{product.price}$</h1>
            </div>
            
        </div>
    );
};

export default Productelement;