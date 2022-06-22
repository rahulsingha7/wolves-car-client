import React, { useRef } from 'react';
import Dashboard from '../../Dashboard/Dashboard';

const AddProduct = () => {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imgRef = useRef();
  const handleAddProduct = (e) =>{
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const img = imgRef.current.value;
    const addProduct = {name,description,price,img};
    console.log(addProduct);
    fetch(`https://protected-brook-65806.herokuapp.com/products`,{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(addProduct)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.insertedId){
        alert('Product Added Successfully');
        e.target.reset();
      }
    })
    e.preventDefault();
  }
    return (
        <div className="flex">
        <div>
            <Dashboard></Dashboard>
        </div>
        <div className="mx-auto my-auto">
        <div className="w-full max-w-xs">
        <form onSubmit={handleAddProduct}>
            <h1 className='mb-4 font-bold text-xl'>Add Products</h1>
          <div className="mb-4">
              <input ref={nameRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="name" required/>
            </div>
         
          <div className="mb-4">
              <textarea ref={descriptionRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="description" required/>
            </div>
            <div className="mb-4">
              <input ref={priceRef}  type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="price" required/>
            </div>
          <div className="mb-4">
              <input ref={imgRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="img url" required/>
            </div>
          <div className="mb-4">
              <input  type="submit" className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300"/>
            </div>
            
         
          </form>

        </div>
    </div>
    </div>
    );
};

export default AddProduct;