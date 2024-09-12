import {React, useState }from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import RatingComponent from '../components/RatingComponent';
import { useCreateProductReviewMutation, useGetProductDetailsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import AlertPage from '../components/AlertPage';
// import { Prev } from 'react-bootstrap/esm/PageItem';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import Message from '../components/Message';
import CustomToast from '../components/CustomToast';
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
const ProductScreen = () => {
    const {id:productId}= useParams();
    const [alert, setAlert]=useState(false); // to track alert
    const [alertDone, setAlertDone]=useState(false); // to track successful alert
    const [errTemp, setErrTemp]=useState('');
    const [qty,setQty]=useState(1);
    const {data:product, refetch, isLoading, isError}=useGetProductDetailsQuery(productId);
    const [createReview,{isLoading:loadingCreateReview}] =useCreateProductReviewMutation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //add to card handler
    const addToCartHandler=()=>{
        dispatch(addToCart({...product,qty}));
        navigate('/cart')
    }
    const [rating, setRating] = useState(1)
    const [comment, setComment]= useState('')
    const {userInfo}=useSelector(state=>state.auth);
    const submitReviewHandler=async(e)=>{
        e.preventDefault()
       try{ 
        await createReview({rating,productId, comment});
        refetch();
        setAlertDone(true);
        setTimeout(() => {
          setAlertDone(false);
        }, 5000);
        setErrTemp(`Review Added`)
        

    }
        catch(err){
           <Message>err</Message>
        }



    }

 

  return (
    <>{alertDone&&<CustomToast variant='success' message={errTemp}/>}
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
    <Row className='review'>         
       <Col md={5}>
       
       <h2>Reviews</h2>
       {userInfo ?(
            <Form className="mb-3" onSubmit={submitReviewHandler}>
      <Form.Group className="mb-1" controlId="rating">
        <Form.Label><strong>Give your rating</strong></Form.Label>
      <RatingComponent rating={rating} setRating={setRating}/>
      </Form.Group>

      <Form.Group className="mb-2" controlId="commment">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} required value={comment} onChange={(e)=>setComment(e.target.value)}  />
      </Form.Group>
    
      <Button variant="primary" disabled={loadingCreateReview} type="submit">
        Submit
      </Button>
    </Form>

        ):(<Link to={'/login'}><Message>Sign in</Message></Link>)}
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
       <ListGroup variant='flush'>
      {product.reviews.map(review=>{
        return (<ListGroup.Item key={review._id}>
            <Rating value={review.rating}/>
            <strong>{review.comment.replace(/"/g, "")}</strong>
            <p><small>{review.name}</small></p>
            <p><small>{review.createdAt.substring(0,10)}</small></p>
              </ListGroup.Item>)
      })}
      </ListGroup> 
       
       </Col>
    </Row>
    </>)
    }
   
    </>
  )
}

export default ProductScreen