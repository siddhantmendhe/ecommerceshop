import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice';

const OrderScreen = () => {
    const {id:orderId}=useParams();
    const {
        data: order,
        refetch,
        isLoading,
        error,
      } = useGetOrderDetailsQuery(orderId)
    console.log(order);

  return (
    <>
      <h1>order screen</h1>
    </>
  )
}

export default OrderScreen
