import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Header = () => {
  const {user,logOut} = useAuth();
    return (
        <div>
           <div className="navbar bg-blue-800 text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex="0" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-sky-500 rounded-box w-52">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        {
     user?.email &&  <NavLink className="my-3 mr-2" to="/dashboard">Dashboard</NavLink>
   }
        {
     user?.email?
    <Link to="/login"> <button onClick={logOut} className='btn bg-blue-800'>LogOut</button></Link>
     :
       <NavLink className="my-3" to="/login">Login</NavLink>
   }
      </ul>
    </div>
    <i className="fab fa-2x fa-wolf-pack-battalion"></i>
    <a className="normal-case text-xl">Wolves Car</a>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="menu menu-horizontal p-0">
    <NavLink className="my-3 mr-2" to="/home">Home</NavLink>
    <NavLink className="my-3 mr-2" to="/explore">Explore</NavLink>
    
   {
     user?.email &&  <NavLink className="my-3 mr-2" to="/dashboard">Dashboard</NavLink>
   }
   {
     user?.email?
     <Link to="/login"> <button onClick={logOut} className='btn bg-blue-800'>LogOut</button></Link>
     :
       <NavLink className="my-3" to="/login">Login</NavLink>
   }
   {
         <ul className="my-3">
           {user?.displayName || user?.email}
         </ul>
   }
  
    </ul>
  </div>
  
</div>
        </div>
    );
};

export default Header;