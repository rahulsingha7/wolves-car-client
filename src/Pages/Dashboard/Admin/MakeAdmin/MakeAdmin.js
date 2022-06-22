import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import Dashboard from '../../Dashboard/Dashboard';

const MakeAdmin = () => {
  const [email,setEmail] = useState('');
  const [success,setSuccess] = useState(false);
  const {token} = useAuth();
  const handleOnBlur = e=>{
    setEmail(e.target.value)
  }
  const handleAdminSubmit = e =>{
    const user = {email};
    fetch(`https://protected-brook-65806.herokuapp.com/users/admin`,{
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
          if(data.modifiedCount){
            setSuccess(true);
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
        <form onSubmit={handleAdminSubmit}>
            <h1 className='mb-4 font-bold text-xl'>Make Admin</h1>
          <div className="mb-4">
              <input type="text" onBlur={handleOnBlur} className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="email" placeholder="email" required/>
            </div>
          <div className="mb-4">
              <input  type="submit" value="Make Admin" className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300"/>
            </div>
            
         
          </form>
          {success && <div className="bg-green-400">Made Admin successfully</div>}

        </div>
    </div>
    </div> 
    );
};

export default MakeAdmin;