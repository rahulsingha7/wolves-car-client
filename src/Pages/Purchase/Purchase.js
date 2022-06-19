import React,{useEffect, useRef, useState} from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const Purchase = () => {
    const {user} = useAuth();
    const {productId} = useParams();
    const [product,setAllProduct] = useState({});
    useEffect(()=>{
       fetch(`http://localhost:5000/products/${productId}`)
       .then(res=>res.json())
       .then(data=>setAllProduct(data))
    },[]);
    const productRef =useRef();
    const userRef = useRef();
    const addressRef = useRef();
    const dateRef = useRef();
    const priceRef = useRef();
    const handlePurchase = e =>{
        const product = productRef.current.value;
        const user = userRef.current.value;
        const address = addressRef.current.value;
        const date = dateRef.current.value;
        const price = priceRef.current.value;
        const order = {product,user,address,date,price}
        order.status = "pending";
        fetch(`http://localhost:5000/orders`,{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.insertedId){
                alert('Order Successful');
                e.target.reset();
            }
        })

        e.preventDefault();
    } 
    return (
        <div>
  <div  className="grid md:grid-cols-2 gap-4">
  <div class="card w-100 bg-base-100 shadow-xl">
  <figure class="px-8 pt-6">
    <img src={product?.img} alt="" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Name: {product?.name}</h2>
    <h5><span className="font-bold">Description:</span> {product?.description}</h5>
    <h1 className="text-2xl font-bold">Price: ${product?.price}</h1>
  </div>
</div>
      <div className='my-auto'>
      <form onSubmit={handlePurchase}>
            <h1 className='mb-4 font-bold text-xl'>Fill The Following Information To Purchase</h1>
            <div className="mb-4">
              <input ref={productRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="productName" value={product?.name} required/>
            </div>
          <div className="mb-4">
              <input ref={userRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="name" value={user?.email} required/>
            </div>
         
         
            <div className="mb-4">
              <textarea ref={addressRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="address" required/>
            </div>
          <div className="mb-4">
              <input ref={dateRef}  type="date" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="date" required/>
            </div>
          <div className="mb-4">
              <input ref={priceRef}  type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="price" value={product?.price} required/>
            </div>
          <div className="mb-4">
              <input  type="submit" value="Purchase" className="w-2/4 mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300"/>
            </div>
            
         
          </form>

        
      </div>
    </div>
        </div>
    );
};

export default Purchase;