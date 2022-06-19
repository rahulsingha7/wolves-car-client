import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const{handleEmailChange,handlePasswordChange,processLogin,isLoading,error,signInUsingGoogle} =useAuth();
  const location = useLocation();
   const navigate = useNavigate();
  const redirect_url = location.state?.from || '/home';
  const handleGoogleLogin = () =>{
    signInUsingGoogle()
    .then(result=>{
      navigate(redirect_url);
    })
  }
  const userLogin =(e)=>{
    e.preventDefault();
    processLogin()
    .then(result=>{
      navigate(redirect_url);
    })
  }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center">
        <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
          <div className="py-12 p-10 bg-white rounded-xl">
            
          <form onSubmit={userLogin}>
          <div className="">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="email">Email</label>
              <input onBlur={handleEmailChange} type="email" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="@email" required/>
            </div>
            <div className="">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" for="password">Password</label>
              <input onBlur={handlePasswordChange} type="password" className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded" placeholder="password" required />
            </div>
            
            <button className="w-full mt-6 text-indigo-50 font-bold bg-blue-800 py-3 rounded-md hover:bg-blue-800 transition duration-300" type="submit">LOGIN</button>
          </form>
           <Link to="/register">
           <span  className="text-sm text-gray-700 inline-block mt-4 hover:text-indigo-600 hover:underline hover:cursor-pointer transition duration-200">Dont Have An Account</span>
           
           </Link>           
            <button onClick={handleGoogleLogin} className="w-full mt-6 text-indigo-50 font-bold bg-green-800 py-3 rounded-md hover:bg-green-800 transition duration-300"> <i className="fab fa-google mr-3"></i>LOGIN WITH GOOGLE</button>
          </div>
          {
      isLoading &&   <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    </svg>
    }
    {
      error && <div className='text-red-700'>{error}</div>
    }
        </div>
      </div>
    );
};

export default Login;