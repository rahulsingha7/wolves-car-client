import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Dashboard from '../Dashboard/Dashboard';

const MyOrder = () => {
    const{user} = useAuth();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/myOrder/${user?.email}`)
        .then(res=>res.json())
        .then(data=>setOrders(data));
    },[])
    const handleCancelOrder = id =>{
        const proceed = window.confirm('Are you sure?');
        if(proceed){
            const url = `http://localhost:5000/orders/${id}`;
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
            <Dashboard></Dashboard>
        </div>
        <div class="overflow-x-auto">
  <table class="table-fixed">
    <thead>
      <tr>
        <th>Id</th>
        <th>User</th>
        <th>Product Name</th>
        <th>Address</th>
        <th>Purchase Date</th>
        <th>Price</th>
        <th>Payment</th>
        <th>Action</th>
      </tr>
    </thead>
     {
         orders?.map((order,index)=><tbody key={order?._id}>
          <tr>
              <td>{index+1}</td>
              <td>{order?.User}</td>
              <td>{order?.product}</td>
              <td style={{height:'90px',width:'60%'}}>{order?.address}</td>
              <td>{order?.date}</td>
              <td>{order?.price}</td>
              <td>"paid"</td>
              <td><button onClick={()=>handleCancelOrder(order?._id)}>Cancel</button></td>
          </tr>
         </tbody>)
     }
  </table>
</div>
    </div>
    );
};

export default MyOrder;