import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../Dashboard/Dashboard';

const ManageProducts = () => {
    const [manageProducts,setManageProducts] = useState();
    useEffect(()=>{
        fetch(`https://protected-brook-65806.herokuapp.com/products`)
        .then(res=>res.json())
        .then(data=>setManageProducts(data))
    },[])
    const handleDeleteProduct = id =>{
        const proceed = window.confirm('Are you sure?');
        if(proceed){
            const url = `https://protected-brook-65806.herokuapp.com/products/${id}`
            fetch(url,{
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
                    alert('Deleted Successfully');
                    const remainingProducts = manageProducts.filter(allProducts=>allProducts._id!==id)
                    setManageProducts(remainingProducts);
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
        <th>Img</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
     {
         manageProducts?.map((allProducts,index)=><tbody key={allProducts?._id}>
          <tr>
              <td>{index+1}</td>
              <td><img src={allProducts?.img} alt="" style={{height:'70px'}}/></td>
              <td>{allProducts?.name}</td>
              <td style={{height:'90px',width:'60%'}}>{allProducts?.description}</td>
              <td>{allProducts?.price}</td>
              <td>
                 <Link to={`/dashboard/manageProduct/${allProducts._id}`}>
                 <button className='btn bg-yellow-400'>Update</button>
                 </Link>
                  <button onClick={()=>handleDeleteProduct(allProducts._id)} className='btn bg-red-700'>Delete</button>
              </td>
          </tr>
         </tbody>)
     }
  </table>
</div>
    </div>
    );
};

export default ManageProducts;