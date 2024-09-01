import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CustomToast from '../components/CustomToast';
import Loader from '../components/Loader'
import {  useCreateOrderMutation } from '../slices/orderApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import Message from '../components/Message';


const PlaceOrder = () => {
  const [alert, setAlert]=useState(false); // to track alert
  const [errTemp, setErrTemp]=useState('');
    const cart= useSelector(state=> state.cart)
    const dispatch= useDispatch()
    const navigate= useNavigate();

    console.log(cart);
    useEffect(()=>{
     
        if(!cart.shippingAddress.address){
            navigate('/shopping')

        }
        if(!cart.paymentMethod){
            navigate('/payment')

        }

    },[cart.shippingAddress,cart.cartItems.length, cart.paymentMethod,navigate]);
    const [createOrder, {isLoading}]= useCreateOrderMutation();
  const placeOrderHandler=async()=>{
    try {
      const orderResponse= await createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingCharge,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice
    ,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${orderResponse._id}`)
    } catch (error) {
      setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
    setErrTemp(error?.data?.message||error)
    }
  }
  return (
   <>
    <CheckoutSteps step1 step2 step3 step4 />
    
      {cart.cartItems.length===0?(<Message variant='danger'>Cart is empty</Message>):(<Row>
        <Col md={8}>
        
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
             
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>{cart.shippingPrice||'0'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              {alert?   (<CustomToast message={errTemp}/>):''}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading &&<Loader/>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>)}
    </>
   
  )
}

export default PlaceOrder
