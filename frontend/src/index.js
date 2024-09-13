import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux'
import { store } from './store';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRount from './screens/PrivateRount';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './screens/AdminRoute';
import OrderListScreen from './screens/Admin/OrderListScreen';
import ProductListScreen from './screens/Admin/ProductListScreen';
import ProductEditScreen from './screens/Admin/ProductEditScreen';
import UserListScreen from './screens/Admin/UserListScreen';
import UserEditScreen from './screens/Admin/UserEditScreen';
 
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRount/>}>
        <Route path='/cart' element={<CartScreen/>}/>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/order/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListScreen/>}/>
        <Route path='/admin/orderlist/:pageNumber' element={<OrderListScreen/>}/>

        <Route path='/admin/productlist' element={<ProductListScreen/>}/>
        <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen/>}/>

        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
        <Route path='/admin/userlist' element={<UserListScreen/>}/>
        <Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>

      </Route>
 
 
     
 
 
 
 
    </Route>
  )
)
const initialOptions = {
  "client-id": "",
  currency: "USD",
  intent: "capture",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions} deferLoading={true} >
     <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
 
 
reportWebVitals();