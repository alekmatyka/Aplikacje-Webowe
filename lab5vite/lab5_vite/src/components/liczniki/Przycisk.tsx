import React from 'react';

const Przycisk = (props:any) => {
    const plusCount = props.plusCount

    return (
        <div>
            <button onClick={plusCount}>
                mie tyz kliknij
            </button>            
        </div>
    );
};

export default Przycisk;