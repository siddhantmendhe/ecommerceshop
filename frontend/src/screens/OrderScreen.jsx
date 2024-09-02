import React, { useEffect, useState } from 'react'
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '../slices/orderApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const [alert, setAlert]=useState(false); // to track alert
  const [alertDone, setAlertDone]=useState(false); // to track alert

  const [errTemp, setErrTemp]=useState('');


    const {id:orderId}=useParams();
    const {
        data: order,
       refetch,
        isLoading,
        error,
      } = useGetOrderDetailsQuery(orderId);
    
    const [payOrder,{isLoading:LoadingPayOrder}]= usePayOrderMutation();
    const {data:payPalClientId,isLoading:loadingClientData, error: cleintIDError}= useGetPayPalClientIdQuery();
    const [{ options, isPending }, payPalDispatch] = usePayPalScriptReducer();
    const {userInfo}= useSelector(state=> state.auth);
    const [currency, setCurrency] = useState(options.currency);

 
    useEffect(()=>{
      if(!loadingClientData&& !cleintIDError && payPalClientId){
        const loadPayPalScript= async()=>{
          payPalDispatch({
            type:'resetOptions',
            value:{
              'clientId':payPalClientId.clientID,
              currency:'USD',
              intent: "capture",
            }
          });
          payPalDispatch({type:'setLoadingStatus', value:'pending'});
        };
        if(order&&!order.isPaid){
          loadPayPalScript();

        }
      }
    },[loadingClientData,cleintIDError,payPalClientId,order,payPalDispatch])

    const onCurrencyChange = ({ target: { value } }) => {
      setCurrency(value);
      payPalDispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: value,
            
          },
      });
  }
  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {

    await payOrder({ orderId, details: { payer: {} } });
      refetch();
    setAlertDone(true);
    setTimeout(() => {
      setAlertDone(false);
    }, 5000);
setErrTemp(`Payment done`)
  
  }

  const onApproveOrder = (data,actions) => {
    return actions.order.capture().then(async(details) => {
        try {
          await payOrder({orderId,details})
      refetch();

          setAlertDone(true);
          setTimeout(() => {
            setAlertDone(false);
          }, 5000);
      setErrTemp(`Payment done`)
        } catch (err) {
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
    setErrTemp(`Error ${err?.data?.message||err}`)

        }
    });
}

  const onError=(err)=>{
    setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
    setErrTemp(`Error ${err}`)
  }

  const onCreateOrder = (data,actions) => {
    return actions.order.create({
        purchase_units: [
            {
                amount: {
                  currency_code:"USD",
                    value: "0.01",
                },
            },
        ],
    });
}



   // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   console.log('test')

  
  // }

    

  return (
   
      isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <> {alert &&<Message variant='danger'>
   {errTemp}
  </Message>}
  {alertDone &&<Message variant='success'>
   {errTemp}
  </Message>}
      <h1>Order ID :{order._id}</h1>
     
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
              )}
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
                  <Col>$ {order.itemsPrice||0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice||0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice||0}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice||0}</Col>
                </Row>
              </ListGroup.Item>
             
         {!order.isPaid && (
                <ListGroup.Item>
                  {LoadingPayOrder && <Loader />}

                  {isPending ? <Loader /> : (
                <>
                  {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button>
                    <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
                </ListGroup.Item>
              )}
            

              

            
                
                  
                
            </ListGroup>
          </Card>
        </Col>
      </Row>
   
    </>
  ))
}

export default OrderScreen
