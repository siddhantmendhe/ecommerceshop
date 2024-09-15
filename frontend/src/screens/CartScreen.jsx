import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import {Navbar,Button, Container, Row, Col, Card, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { decreaseQty, removeCartItem } from '../slices/cartSlice';


import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CartScreen() {
    const cart=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {cartItems}=cart;

    const decreaseHandler= async(item)=>{
        dispatch(decreaseQty({item,value:item.qty-1}))
       
    }
    const increaseHandler= async(item)=>{
        dispatch(decreaseQty({item,value:item.qty+1}))
      

    }

    //remove item handler
    const removeItemHandler=async(item)=>{
        dispatch(removeCartItem(item));
        console.log('hello')
    }
    const checkoutHandler = () => {
      navigate('/login?redirect=/shipping');
    };


    console.log(cart.itemsPrice)
  

  return (
    <>

 {cartItems.length===0?(<><Alert>Cart is empty <LinkContainer  to="/">
    <Navbar.Brand >EcommerceShop</Navbar.Brand></LinkContainer></Alert>  </>):(<section className="h-100 h-custom" >
  <Container className="py-5 h-100">
    <Row className="justify-content-center align-items-center h-100">
      <Col>
        <Card>
          <Card.Body className="p-4">
            <Row>
              <Col lg="7">
                <Card.Title tag="h5"> 
                <LinkContainer to='/'>
                <Button >Continue
                shopping  <IoIosArrowForward /></Button>
                  </LinkContainer>
                </Card.Title>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                 
                    <p className="mb-0">Items Added in Cart: {cartItems.reduce((a, c) => a + c.qty, 0)} </p>
                  </div>
               
                </div>

            
                <Card className="mb-3">
                    {cartItems.map(item=>
                        (<Card.Body key={item._id}>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <Card.Img 
                                src={item.image}
                                fluid className="rounded-3" style={{ width: "65px" }}
                                alt="Shopping item" />
                            </div>
                            <div className="ms-3">
                              <Card.Title tag="h5">
                                {item.name}
                              </Card.Title>
                              
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ padding: "5px" }}>
                              <Card.Title tag="h5" className="fw-normal mb-0">
                                <><form>
                                <Container>
                                <Row>
                                  <Button onClick={()=>decreaseHandler(item)} disabled={item.qty <=1} >-</Button> 
                                  <span>{item.qty}</span>
                                  <Button onClick={()=>increaseHandler(item)} disabled={item.countInStock<=item.qty} >+</Button>
                                  </Row>  
                                  </Container> </form></>
                              </Card.Title>
                            </div>
                            <div style={{ padding: "5px" }}>
                              <Card.Title tag="h5" className="mb-0">
                                {item.price*item.qty}
                              </Card.Title>
                            </div>
                            <a href="#!" style={{ color: "#cecece" }}>
                            <MdDelete onClick={()=>removeItemHandler(item)}/>
                         
                            </a>
                          </div>
                        </div>
                      </Card.Body>)
                    )}
                  
                </Card>
               
              </Col>

              <Col lg="5">
                <Card className="bg-primary text-white rounded-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Card.Title tag="h5" className="mb-0">
                        Card details
                      </Card.Title>
                      <Image src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                        fluid className="rounded-3" style={{ width: "45px" }} alt="Avatar" />
                    </div>

                    


                    <hr />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">{cart.itemsPrice}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Shipping</p>
                      <p className="mb-2">{cart.shippingCharge}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total(taxes)</p>
                      <p className="mb-2">{cart.taxPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total Price</p>
                      <p className="mb-2">{cart.totalPrice}</p>
                    </div>
                    
                  </Card.Body>
                  <Button variant="light" className="d-flex justify-content-center" block size="lg"  onClick={checkoutHandler}>
                      <div className="d-flex justify-content-between">
                      
                        
                        <span>
                          Checkout
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div>
                    </Button>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>)}


      </>
  )
}

export default CartScreen
