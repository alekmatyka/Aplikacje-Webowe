import React from 'react';
import Produkt from './Produkt';

const NowyKoszyk = () => {
    const Produkty = [{ nazwa:"japko"},{ nazwa:"jajko"},{ nazwa:"jagoda"},{ nazwa:"jeżyna"},{ nazwa:"jarmuż"}]

    return (
        <div>
            {Produkty.map((produkt)=>{
                return(
                    <div>
                        <Produkt nazwa={produkt.nazwa}/>
                        <br></br>    
                    </div>
                )
            })}
            
        </div>
    );
};

export default NowyKoszyk;