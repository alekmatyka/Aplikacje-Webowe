import React, { useState } from 'react';

const Aktualizacja = () => {
    
    const [ product, setProduct] = useState({name:"Pomidor",price:50})

    return (
        <div>
            <div>{product.name} aktualnie kosztuje {product.price}</div>
            <button onClick={()=>setProduct(prev=>({...prev,price: 100}))}>
                Zmien cene
            </button>
        </div>
    );
};

export default Aktualizacja;