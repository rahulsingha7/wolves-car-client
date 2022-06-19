import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Explore = () => {
    const [allproducts,setAllProducts] = useState([]);
    useEffect(()=>{
       fetch(`http://localhost:5000/products`)
       .then(res=>res.json())
       .then(data=>setAllProducts(data))
    },[])
    return (
       <div className="my-5">
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {
                allproducts.map((card,id)=>(
                    <div className="card w-100 bg-base-100 shadow-xl" key={id}>
  <figure className="px-10 pt-10">
    <img src={card.img} alt="" className="rounded-xl" />
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
       </div>
    );
};

export default Explore;