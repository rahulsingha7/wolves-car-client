import React, { useRef,useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Dashboard from '../Dashboard/Dashboard';
import noProfile from '../../../images/User/download-removebg-preview.png'
const Review = () => {
    const {user} = useAuth();
    const [error,setError] = useState('');
  
    const nameRef = useRef();
  const commentRef = useRef();
  const ratingRef = useRef();
  const handleAddReview = (e) =>{
    const name = nameRef.current.value;
    const comment = commentRef.current.value;
    const rating = ratingRef.current.value;
    const img = user?.photoURL || noProfile;
    if(rating>5){
      setError('Rating can not be more than 5');
      e.preventDefault();
    }
   else if(rating<1){
      setError('Rating can not be less than 1');
      e.preventDefault();
    }
    else{
      const addRating = {name,comment,rating,img};
      console.log(addRating);
      fetch(`http://localhost:5000/reviews`,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(addRating)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.insertedId){
          alert('Review Added Successfully');
          e.target.reset();
          setError('');
        }
      })
      e.preventDefault();
    }
    
  }
    return (
        <div className="flex">
        <div>
            <Dashboard></Dashboard>
        </div>
        <div className="mx-auto my-auto">
        <div className="w-full max-w-xs">
        <form onSubmit={handleAddReview}>
            <h1 className='mb-4 font-bold text-xl'>Add Review</h1>
          <div className="mb-4">
              <input ref={nameRef} value={user?.displayName||user?.email} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="name" required/>
            </div>
         
          <div className="mb-4">
              <textarea ref={commentRef} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="comment" required/>
            </div>
            <div className="mb-4">
              <input ref={ratingRef}  type="number" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="rating" required/>
            </div>
            {
              error && <div className='text-red-700'>{error}</div>
            }
          <div className="mb-4">
              <input  type="submit" value="Add" className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300"/>
            </div>
         
         
          </form>

        </div>
    </div>
    </div>
    )
};

export default Review;