import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Pages/Context/AuthProvider/AuthProvider';
import AddProduct from './Pages/Dashboard/Admin/AddProduct/AddProduct';
import ManageProducts from './Pages/Dashboard/Admin/ManageProducts/ManageProducts';
import UpdateProduct from './Pages/Dashboard/Admin/UpdateProduct/UpdateProduct';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import MyOrder from './Pages/Dashboard/MyOrder/MyOrder';
import Payment from './Pages/Dashboard/Payment/Payment';
import Review from './Pages/Dashboard/Review/Review';
import Explore from './Pages/Explore/Explore';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Register from './Pages/Login/Register/Register';
import NotFound from './Pages/NotFound/NotFound';
import Purchase from './Pages/Purchase/Purchase';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';

function App() {
  return (
    <div className="App">
  
        <AuthProvider>
        <BrowserRouter>
         <Header></Header>
         <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/home" element={<Home></Home>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/explore" element={<Explore></Explore>} />
      <Route path="/purchase/:productId" element={<PrivateRoute><Purchase></Purchase></PrivateRoute>}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>} />
      <Route path="/dashboard/payment" element={<Payment></Payment>} />
      <Route path="/dashboard/addProduct" element={<AddProduct></AddProduct>} />
      <Route path="/dashboard/manageProduct" element={<ManageProducts></ManageProducts>} />
      <Route path="/dashboard/review" element={<Review></Review>} />
      <Route path="/dashboard/myOrder" element={<MyOrder></MyOrder>} />
      <Route path="/dashboard/manageProduct/:id" element={<UpdateProduct></UpdateProduct>} />
      <Route path="*" element={<NotFound></NotFound>} />
    </Routes>
    <Footer></Footer>
    </BrowserRouter>

        </AuthProvider>
    </div>
  );
}

export default App;
