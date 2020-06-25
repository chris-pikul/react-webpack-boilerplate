import React, { useState } from 'react';

export default () => {
    const [ curValue, setValue ] = useState(0);

    const increment = () => setValue(curValue + 1);
    const decrement = () => setValue(curValue - 1);

    return <div className='counter'>
        <h1>Value: { curValue }</h1>
        <button type='button' onClick={increment}>+</button>
        <button type='button' onClick={decrement}>-</button>
    </div>
}