import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component"
const Reviews = () => {
    const[reviews,setReviews] = useState([]);
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/reviews`)
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])

    return (
        <div className="my-5">
            <h1 className="mb-5 text-2xl font-bold">See What Client's Have To Say</h1>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5">
        {
            reviews.map((card,id)=>(
                <div className="card w-96 bg-base-100 shadow-2xl transform transition duration-500 hover:scale-110" key={id}>
<figure className="px-10 pt-10">
<img src={card.img} alt="" />
</figure>
<div className="card-body items-center text-center">
<h2 className="card-title">{card.name}</h2>
<h4>{card.email}</h4>
<div className="flex">
<h2 className='font-bold text-lg pl-4'>Rating: </h2>
<ReactStars 
    count={5}
    value={card.rating}
    size={24}
    edit={false}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />

</div>
<p>{card.comment}</p> 
<div className="card-actions">
</div>
</div>
</div>
            ))
        }
    </div>
   </div>    
    );
};

export default Reviews;