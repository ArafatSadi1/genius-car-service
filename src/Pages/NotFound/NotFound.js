import React from 'react';
import sleeping from '../../images/sleepping.jpg'

const NotFound = () => {
    return (
        <div className='my-5'>
            <h2 className='text-primary text-center mb-3'>Mechanich Is Sleeping...</h2>
            <img className='w-100' src={sleeping} alt="" />
        </div>
    );
};

export default NotFound;