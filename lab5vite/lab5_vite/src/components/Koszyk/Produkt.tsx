import React from 'react';

const Produkt = ({nazwa}: string) => {
    //const nazwa = props 

    return (
        <div>
            <b>{nazwa}</b>
        </div>
    );
};

export default Produkt;