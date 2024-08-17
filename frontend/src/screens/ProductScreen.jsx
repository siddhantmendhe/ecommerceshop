import {React, useState }from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import AlertPage from '../components/AlertPage';
import { Prev } from 'react-bootstrap/esm/PageItem';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
const ProductScreen = () => {
    const {id:productId}= useParams();
    const [qty,setQty]=useState(1);
    const {data:product, isLoading, isError}=useGetProductDetailsQuery(productId);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //add to card handler
    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate('/cart')
    }

  return (
    <>
    {isLoading?(<Loader/>):isError?(<AlertPage/>):( 
        <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>

        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                            <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.countInStock>0? 'In Stock':'Out Of Stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock>0 &&(<ListGroup.Item><Row>
                            <Col><Button onClick={()=>setQty(qty-1)}  disabled={qty===1}>-</Button></Col>
                            <Col>
                            <span>{qty}</span>
                            </Col>
                            <Col>
                            <Button onClick={()=>setQty(qty+1)}  disabled={qty===product.countInStock}>+</Button></Col>
                        </Row></ListGroup.Item>)}
                    
                    <ListGroup.Item>
                       <Button className='btn-block'
                       type='button'
                       disabled={product.countInStock===0}
                       onClick={addToCartHandler}>
                        Add to Cart
                       </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>)
    }
   
    </>
  )
}

export default ProductScreen