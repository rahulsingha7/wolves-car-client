import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardHome from '../DashboardHome/DashboardHome';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51KzJfoB35lzk5AJH8j1yrNSNJObJuvdR4VkcKlKwR66paMOTUFx8HLMmpjx6tNyir3XavT8rBbdb4y7wswTwEVXa00f8OePrWa');
const Payment = () => {
    const{orderId} = useParams();
    const [order,setOrder] = useState({})
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/orders/${orderId}`)
        .then(res=>res.json())
        .then(data=>setOrder(data));
    },[orderId]);
    return (
        <div className="flex">
            <div>
               <DashboardHome></DashboardHome>
            </div>
            <div className="mx-auto my-auto">
                <h1 className="font-bold mb-5">Customer Name: {order?.name}</h1>
                <h1 className="font-bold mb-5">Product Name: {order?.product}</h1>
                <h1 className="font-bold mb-5">Product Price: ${order?.price}</h1>
                {
                    order?.price && <Elements stripe={stripePromise}>
                    <CheckoutForm
                     order = {order}

                    />
                </Elements>
                }
            </div>
        </div>
    );
};

export default Payment;