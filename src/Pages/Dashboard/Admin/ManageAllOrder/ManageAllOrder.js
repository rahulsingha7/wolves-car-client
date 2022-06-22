import React, { useEffect, useState } from 'react';
import Dashboard from '../../Dashboard/Dashboard';

const ManageAllOrder = () => {
    const [allOrders,setAllOrders] = useState([]);
    const [showStatus,setShowStatus] = useState(false);
    const [manageStatus,setManageStatus] = useState([]);
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/orders`)
        .then(res=>res.json())
        .then(data=>setAllOrders(data));
    },[allOrders])
    const handleChange = e =>{
        const data= {...manageStatus};
        data[e.target.name] = e.target.value;
        setManageStatus(data);
        setShowStatus(true);
    }
    const handleStatus = id =>{
        const url = `https://protected-brook-65806.herokuapp.com/orders/${id}`;
        fetch(url,{
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(manageStatus)
        })
        .then(res=>{
            if(res){
                alert('Status Updated')
            }
        })

    }

    const handleDeleteOrder = id =>{
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
                    const remainingOrders = allOrders.filter(orders=>orders._id!==id)
                    setAllOrders(remainingOrders);
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
  <table class="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Customer Name</th>
        <th>Product Name</th>
        <th>Address</th>
        <th>Purchase Date</th>
        <th>Price</th>
        <th>status</th>
        <th>Action</th>
      </tr>
    </thead>
     {
         allOrders?.map((orders,index)=><tbody key={orders?._id}>
          <tr>
              <td>{index+1}</td>
              <td>{orders?.name}</td>
              <td>{orders?.product}</td>
              <td style={{height:'90px',width:'60%'}}>{orders?.address}</td>
              <td>{orders?.date}</td>
              <td>{orders?.price}</td>
              {/* <td>{orders?.status}</td> */}
              <td>
                 <select value={orders?.status} onChange={handleChange} className='form-control' name="status"> 
                     <option>Pending</option>
                     <option>Shipped</option>
                 </select></td>
                {
                    showStatus && <td><button className="btn bg-yellow-500" onClick={()=>handleStatus(orders._id)}>Update</button>
                    <button onClick={()=>handleDeleteOrder(orders?._id)} className='btn bg-red-700'>Delete</button>
                    </td>
                }
                 
          </tr>
         </tbody>)
     }
  </table>
</div>
    </div>
    );
};

export default ManageAllOrder;