import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
  const [loginData,setLoginData] = useState({});
  const navigate = useNavigate();
  const {registerUser,isLoading,authError} = useAuth();
  const handleOnBlur =e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
  }
  const handleLoginSubmit =e =>{
    registerUser(loginData.email,loginData.password,loginData.name,navigate)
      e.preventDefault();
  }
     

  
    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center">
  <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
    <div className="py-12 p-10 bg-white rounded-xl">
     <form onSubmit={handleLoginSubmit}>
     <div className="mb-6">
        <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="name">Name</label>
        <input onBlur={handleOnBlur} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="name" placeholder="name" />
      </div>
      <div className="mb-6">
        <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="name">Email</label>
        <input onBlur={handleOnBlur} type="text" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="email" placeholder="email" />
      </div>
      <div className="">
        <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="name">Password</label>
        <input onBlur={handleOnBlur} type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="password" placeholder="password" />
      </div>
      
      <button className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300" type="submit">Register</button>
     </form>
      <Link to="/login">
      <span className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Already Have An Account</span>
      </Link>
    </div>
    {
      isLoading &&   <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    </svg>
    }
   
    {
      authError && <div className='text-red-700'>{authError}</div>
    }
  </div>
</div>
        </div>
    );
};

export default Register;