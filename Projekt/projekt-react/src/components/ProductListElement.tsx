import React from 'react';

const ProductListElement = (props:any) => {

    const product = props.product



    return (
        <div className='product-list-element'>
            {/* {JSON.stringify(product)} */}
            <div className='product-info'>
                <div className='product-info-desc'>
                    <h3>{product.title}</h3>
                    <h4>{product.category}</h4>
                </div>
                <div className='product-info-desc'><h2>Cena: {product.price}$</h2></div>
                <div className='product-info-desc'><h2>Sztuk: {product.amount}</h2></div>
                
            </div>
            <div className='product-info-total'>
                <div className='product-info-desc'><h2>Razem: {product.total} $</h2></div>
            </div>
        </div>
    );
};

export default ProductListElement;