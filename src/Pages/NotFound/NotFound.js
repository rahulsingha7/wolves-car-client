import React from 'react';
import { Link } from 'react-router-dom';
import notfound from '../../images/Not Found/notfound.jpg'
const NotFound = () => {
    return (
        <div className='my-5'>
            <h1 className='mb-5 text-red-700 font-bold'>OOPS! Page Not Found</h1>
            <img className='mx-auto mb-5' src={notfound} alt="" />
            <Link to="/home">
            <button className='btn bg-blue-800'>Back to home</button>
            </Link>
        </div>
    );
};

export default NotFound;