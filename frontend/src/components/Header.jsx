import React from 'react';
import {Navbar, Nav, Container, Badge,NavDropdown } from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import logo from '../assets/logo.png';
import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
    const {cartItems}=useSelector(state=>state.cart);
    const {userInfo}= useSelector(state=> state.auth)
    const logouthandler=()=>{
        console.log('logout')

    }
    const cartItemCount=cartItems.reduce((acc, c)=> acc+c.qty,0)
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand >
                    <img src={logo} alt="" />
                     EcommerceShop</Navbar.Brand>
                     </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                        <Nav.Link><FaShoppingCart/>
                        
                        Cart
                        {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItemCount}
                    </Badge>)}</Nav.Link>
                        </LinkContainer>
                        {userInfo?(      <NavDropdown title={userInfo.name} id="usernme">
                               <LinkContainer className='text-dark ' to="/profile">
                               <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logouthandler}>Log out</NavDropdown.Item>
                                
    
                                
                            </NavDropdown>):(  <LinkContainer to="/login">
                        <Nav.Link><FaUser/>Sign In</Nav.Link>
                        </LinkContainer>)}
                      
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header