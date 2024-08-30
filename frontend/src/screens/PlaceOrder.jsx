import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
    const cart= useSelector(state=> state.cart)
    const dispatch= useDispatch()
    const navigate= useNavigate();

    console.log(cart);
    useEffect(()=>{
        if(!cart.shippingAddress){
            navigate('/shopping')

        }
        if(!cart.paymentMethod){
            navigate('/payment')

        }
    },[cart.shippingAddress, cart.paymentMethod,navigate])
  return (
    <div>
      <h1>place order</h1>
    </div>
  )
}

export default PlaceOrder
