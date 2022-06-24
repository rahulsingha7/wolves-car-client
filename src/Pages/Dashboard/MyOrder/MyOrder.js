import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import DashboardHome from '../DashboardHome/DashboardHome';


const MyOrder = () => {
    const{user} = useAuth();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/myOrder/${user?.email}`)
        .then(res=>res.json())
        .then(data=>setOrders(data));
    },[user])
    const handleCancelOrder = id =>{
        const proceed = window.confirm('Are you sure?');
        if(proceed){
            const url = `https://protected-brook-65806.herokuapp.com/orders/${id}`;
            fetch(url,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    alert('Order Cancelled');
                    const remainingOrders = orders.filter(order=>order._id!==id)
                    setOrders(remainingOrders);
                }
            })
        }
    }
    return (
        <div className="flex">
        <div>
           <DashboardHome></DashboardHome>
        </div>
        <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Cusmoter Name</th>
        <th>Cusmoter Email</th>
        <th>Cusmoter Phone No.</th>
        <th>Product Name</th>
        <th>Address</th>
        <th>Purchase Date</th>
        <th>Price</th>
        <th>Payment</th>
        <th>status</th>
        <th>Action</th>
      </tr>
    </thead>
     {
         orders?.map((order,index)=><tbody key={order?._id}>
          <tr>
              <td>{index+1}</td>
              <td>{order?.name}</td>
              <td>{order?.email}</td>
              <td>{order?.phone}</td>
              <td>{order?.product}</td>
              <td style={{height:'90px',width:'60%'}}>{order?.address}</td>
              <td>{order?.date}</td>
              <td>{order?.price}</td>
              <td>{order?.payment ? 'Paid' : <Link to={`/dashboard/payment/${order?._id}`}><button className='btn bg-blue-400'>Pay</button></Link>}</td>
              <td>{order?.status}</td>
              <td><button onClick={()=>handleCancelOrder(order?._id)} className="btn bg-red-600">Cancel</button></td>
          </tr>
         </tbody>)
     }
  </table>
</div>
    </div>
    );
};

export default MyOrder;