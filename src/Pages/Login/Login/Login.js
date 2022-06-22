import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const [loginData,setLoginData] = useState({});
  const {loginUser,authError,signInWithGoogle} = useAuth();
  const location = useLocation();
  const navigate
   = useNavigate();
  const handleOnChange =e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData);
  }
  const handleLoginSubmit =e =>{
     loginUser(loginData.email,loginData.password,location,navigate);
      e.preventDefault();
  }
  const handleGoogleSignIn=()=>{
    signInWithGoogle(location,navigate);
  }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
            
          <form onSubmit={handleLoginSubmit}>
          <div className="">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="email">Email</label>
              <input onBlur={handleOnChange} type="email" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="email" placeholder="@email" required/>
            </div>
            <div className="">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="password">Password</label>
              <input onBlur={handleOnChange} type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" name="password" placeholder="password" required />
            </div>
            
            <button className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300" type="submit">LOGIN</button>
          </form>
           <Link to="/register">
           <span  className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Dont Have An Account</span>
           
           </Link>           
            <button onClick={handleGoogleSignIn} className="w-full mt-6 text-indigo-50 font-bold bg-green-800 py-3 rounded-md hover:bg-green-800 transition duration-300"> <i className="fab fa-google mr-3"></i>LOGIN WITH GOOGLE</button>
          </div>
          
    {
      authError && <div className='text-red-700'>{authError}</div>
    }
        </div>
      </div>
    );
};

export default Login;