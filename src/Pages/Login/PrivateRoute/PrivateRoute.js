import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivateRoute = ({children,...rest}) => {
    const {user,isLoading} = useAuth();
    let location = useLocation();
   if(isLoading)
   {
       return  <div className="flex justify-center items-center">
       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
       </div>
     </div> 
   }
   if(user.email){
       return children;
   }
   else{
       return <Navigate to="/login" state={{from: location}} replace />
   }
};

export default PrivateRoute;