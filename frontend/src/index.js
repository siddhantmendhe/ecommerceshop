import React from 'react';
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
 
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/product/:id' element={<ProductScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRount/>}>
        <Route path='/cart' element={<CartScreen/>}/>
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>

      </Route>
 
 
     
 
 
 
 
    </Route>
  )
)
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
 
 
reportWebVitals();