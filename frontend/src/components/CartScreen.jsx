import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import {Navbar,Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { decreaseQty, removeCartItem } from '../slices/cartSlice';

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
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
      navigate('/auth?redirect=/shipping');
    };


    console.log(cart.itemsPrice)
  

  return (
    <>

 {cartItems.length===0?(<><Alert>Cart is empty <LinkContainer  to="/">
    <Navbar.Brand >EcommerceShop</Navbar.Brand></LinkContainer></Alert>  </>):(<section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol>
        <MDBCard>
          <MDBCardBody className="p-4">
            <MDBRow>
              <MDBCol lg="7">
                <MDBTypography tag="h5">
                <LinkContainer to='/'>
                  <a href="#!" className="text-body">
                    <MDBIcon fas icon="long-arrow-alt-left me-2" /> Continue
                    shopping
                  </a>
                  </LinkContainer>
                </MDBTypography>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <p className="mb-1">Shopping cart</p>
                    <p className="mb-0">Items Added in Cart: {cartItems.reduce((a, c) => a + c.qty, 0)} </p>
                  </div>
               
                </div>

            
                <MDBCard className="mb-3">
                    {cartItems.map(item=>
                        (<MDBCardBody key={item._id}>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-row align-items-center">
                            <div>
                              <MDBCardImage
                                src={item.image}
                                fluid className="rounded-3" style={{ width: "65px" }}
                                alt="Shopping item" />
                            </div>
                            <div className="ms-3">
                              <MDBTypography tag="h5">
                                {item.name}
                              </MDBTypography>
                              
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <div style={{ padding: "5px" }}>
                              <MDBTypography tag="h5" className="fw-normal mb-0">
                                <><form><Button onClick={()=>decreaseHandler(item)} disabled={item.qty <=1} >-</Button>  <span>{item.qty||' '}</span> <Button onClick={()=>increaseHandler(item)} disabled={item.countInStock<=item.qty} >+</Button> </form></>
                              </MDBTypography>
                            </div>
                            <div style={{ padding: "5px" }}>
                              <MDBTypography tag="h5" className="mb-0">
                                {item.price*item.qty}
                              </MDBTypography>
                            </div>
                            <a href="#!" style={{ color: "#cecece" }}>
                           <MDBIcon fas icon="trash-alt" onClick={()=>removeItemHandler(item)} />
                            </a>
                          </div>
                        </div>
                      </MDBCardBody>)
                    )}
                  
                </MDBCard>
               
              </MDBCol>

              <MDBCol lg="5">
                <MDBCard className="bg-primary text-white rounded-3">
                  <MDBCardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBTypography tag="h5" className="mb-0">
                        Card details
                      </MDBTypography>
                      <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
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

                    <MDBBtn color="info" block size="lg"  onClick={checkoutHandler}>
                      <div className="d-flex justify-content-between">
                        <span>{cart.totalPrice}</span>
                        
                        <span>
                          Checkout{" "}
                          <i className="fas fa-long-arrow-alt-right ms-2"></i>
                        </span>
                      </div>
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>)}


      </>
  )
}

export default CartScreen
