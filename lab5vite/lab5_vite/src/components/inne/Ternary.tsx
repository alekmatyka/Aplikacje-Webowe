import React from 'react';

const Ternary = () => {
    let a = true
    let b = false    
    
    return (
        <div>
            <div>
                {a ? "a to prawda" : "a to falsz"}
            </div>
            <div>
                {b ? "b to prawda" : "b to falsz"}
            </div>
            
        </div>
    );
};

export default Ternary;