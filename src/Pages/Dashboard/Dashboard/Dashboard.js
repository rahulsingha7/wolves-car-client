import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Dashboard = () => {
    const {logOut} = useAuth();
    return (
        <div>
            <div class="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col items-center justify-center">
    
    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content bg-blue-800 text-white my-2">
      <li> <NavLink to="/home">Home</NavLink></li>
      <li> <NavLink to="/dashboard/payment">Pay</NavLink></li>
      <li> <NavLink to="/dashboard/addProduct">Add Products</NavLink></li>
      <li> <NavLink to="/dashboard/manageProduct">Manage Products</NavLink></li>
      <li> <NavLink to="/dashboard/myOrder">My Orders</NavLink></li>
      <li> <NavLink to="/dashboard/review">Review</NavLink></li>
     <button onClick={logOut} className='btn bg-blue-800'>LogOut</button>
    </ul>
  
  </div>
</div>
        </div>
    );
};

export default Dashboard;