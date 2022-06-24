import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const DashboardHome = () => {
    const {logOut,admin} = useAuth();
      
        return (
            <div>
            <div className="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col items-center justify-center">
    
    <label for="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    
    </div> 
    <div className="drawer-side">
    <label for="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content bg-blue-800 text-white my-2">
      <li> <NavLink to="/home">Home</NavLink></li>
      
    
      {
        admin && <div>
        <li> <NavLink to="/dashboard/addProduct">Add Products</NavLink></li>
    <li> <NavLink to="/dashboard/manageProduct">Manage Products</NavLink></li>
    <li> <NavLink to="/dashboard/manageAllOrder">Manage All Order</NavLink></li>
    <li> <NavLink to="/dashboard/makeAdmin">Make Admin</NavLink></li>
    </div> 
    }
    {
       !admin && <div>
          <li> <NavLink to="/dashboard/myOrder">My Orders</NavLink></li>   
        <li> <NavLink to="/dashboard/review">Review</NavLink></li>
        </div>
      }
     
    <Link to="/login">
    <button onClick={logOut} className='btn bg-blue-800'>LogOut</button>
    </Link>
    </ul>
    
    </div>
    </div>
        </div>
    );
};

export default DashboardHome;