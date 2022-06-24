import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Products = () => {

    const [products,setProducts] = useState([]);
    useEffect(()=>{
       fetch(`https://protected-brook-65806.herokuapp.com/products`)
       .then(res=>res.json())
       .then(data=>setProducts(data))
    },[])
    return (
       <div className="my-5">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5">
            {
                products.slice(0,6).map((card,id)=>(
                    <div className="card w-100 bg-base-100 shadow-xl" key={id}>
  <figure className="px-10 pt-10">
    <img src={card.img} alt="" className="rounded-xl scale-75 hover:scale-100 ease-in duration-200" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{card.name}</h2>
    <p>{card.description}</p>
    <h2 className='font-bold text-lg'>${card.price}</h2>
    <div className="card-actions">
    <Link to={`/purchase/${card._id}`}>
     <button className="btn btn-primary bg-blue-800">Buy Now</button>
     </Link>
    
    </div>
  </div>
</div>
                ))
            }
        </div>
        <Link to="/explore">
        <button className="btn btn-primary bg-blue-800 my-5">View All Products</button>
        </Link>
       </div>
    );
};

export default Products;