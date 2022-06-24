import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardHome from '../../DashboardHome/DashboardHome';


const UpdateProduct = () => {
    const {id} = useParams();
    const [product,setProduct] = useState({});
    useEffect(()=>{
        const url = `https://protected-brook-65806.herokuapp.com/products/${id}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[])
    const handleNameChange = e=>{
        const updatedName = e.target.value;
        const updatedProduct= {name:updatedName,description:product.description,price:product.price,img:product.img}
        setProduct(updatedProduct);
    }
    const handleDescriptionChange = e =>{
        const updatedDescription = e.target.value;
        const updatedProduct={name:product.name,description: updatedDescription,price: product.price,img:product.img}
        setProduct(updatedProduct);
    }
    const handlePriceChange = e =>{
        const updatedPrice = e.target.value;
        const updatedProduct={name:product.name,description:product.description,price: updatedPrice,img:product.img}
        setProduct(updatedProduct);
    }
    const handleImgChange = e =>{
        const updatedImg = e.target.value;
        const updatedProduct={name:product.name,description: product.description,price: product.price,img:updatedImg}
        setProduct(updatedProduct);
    }
    const handleUpdateProduct = e=>{
        const url = `https://protected-brook-65806.herokuapp.com/products/${id}`
        fetch(url,{
            method: 'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(product)
        
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('Product Updated Successfully');
                setProduct({});
            }
        })
        e.preventDefault();
      
    }
    return (
        <div className="flex">
        <div>
           <DashboardHome></DashboardHome>
        </div>
        <div className="mx-auto my-auto">
        <div className="w-full max-w-xs">
        <form >
            <h1 className='mb-4 font-bold text-xl'>Update Product</h1>
          <div className="mb-4">
              <input type="text" onChange={(e)=>handleNameChange(e)} value={product?.name || ''} className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="name" required/>
            </div>
         
          <div className="mb-4">
              <textarea type="text" onChange={(e)=>handleDescriptionChange(e)} value={product?.description || ''} className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="description" required/>
            </div>
            <div className="mb-4">
              <input  type="text" onChange={(e)=>handlePriceChange(e)} value={product?.price || ''} className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="price" required/>
            </div>
          <div className="mb-4">
              <input  type="text" onChange={(e)=>handleImgChange(e)} value={product?.img || ''} className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="img url" required/>
            </div>
          <div className="mb-4">
              <input  type="submit" onClick={(e)=>handleUpdateProduct(e)} value="Update" className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300"/>
            </div>
            
         
          </form>

        </div>
    </div>
    </div>
    );
};

export default UpdateProduct;