import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const CheckoutForm = ({order}) => {
    const{price,name,_id} = order;
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('');
    const[success,setSuccess]=useState('');
    const [process,setProcess] = useState(false);
    const [clientSecret,setClientSecret] = useState('');
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/create-payment-intent`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({price})
        })
        .then(res=>res.json())
        .then(data=>setClientSecret(data.clientSecret));
    },[price])
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        const card = elements.getElement(CardElement);
        if(card===null){
            return;
        }
        setProcess(true);
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if(error){
            setError(error.message);
            setSuccess('');
        }
        else{
            setError('');
            console.log(paymentMethod);
        }
       
        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: name,
                  email: user.email
                },
              },
            },
          );
          if(intentError){
              setError(intentError.message);
              setSuccess('');
          }
          else{
              setError('');
              setSuccess('Your payment processed successfully');
              setProcess(false);
              //save to database
              const payment={
                 amount: paymentIntent.amount,
                 created: paymentIntent.created,
                 transaction: paymentIntent.client_secret.slice('_secret')[0]
              }
             const url = `https://protected-brook-65806.herokuapp.com/myOrder/${_id}`
             fetch(url,{
                 method: 'PUT',
                 headers: {
                     'content-type': 'application/json'
                 },
                 body: JSON.stringify(payment)
             })
              .then(res=>res.json())
              .then(data=>console.log(data))
          }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
     {
         process  ? <div className="flex justify-center items-center">
         <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
         </div>
       </div> :  <button className="btn bg-blue-800 text-white" type="submit" disabled={!stripe || success}>
         Pay ${price}
       </button>
     }
    </form>
    {
        error && <h3 style={{color: 'red'}}>{error}</h3>
    }
    {
        success && <h3 style={{color: 'green'}}>{success}</h3>
    }
        </div>
    );
};

export default CheckoutForm;