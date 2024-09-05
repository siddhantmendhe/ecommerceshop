import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useEditProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productApiSlice';
import Message from '../../components/Message';
import CustomToast from '../../components/CustomToast';
const ProductEditScreen = () => {
    const [alert, setAlert]=useState(false); // to track alert
    const [alertDone, setAlertDone]=useState(false); // to track successful alert
    const [errTemp, setErrTemp]=useState('');
    const {id:productId}= useParams();
    const navigate= useNavigate();
    const {data: product, refetch, isLoading, error}= useGetProductDetailsQuery(productId);
    const [editProduct,{isLoading:loadingUpdate}]= useEditProductMutation();
    const [uploadProductImage,{isLoading:loadingUpload}]=useUploadProductImageMutation();

    const [name, setName]= useState('');
    const [price, setPrice]=useState(0);
    const [image,setImage]= useState('');
    const [brand, setBrand]= useState('');
    const [description, setDescription]=useState('');
    const [countInStock, setCountInStock]= useState(0);

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    },[product])

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            await editProduct({data:{productId ,name,price,image,brand,description, countInStock}});
            refetch()
                 
          setAlertDone(true);
          setTimeout(() => {
            setAlertDone(false);
          }, 5000);
      setErrTemp(`Product Updated `)
        } catch (err) {
         
        }

    
    }

    const uploadFileHandler= async(e)=>{
      const formData= new FormData();
      formData.append('image',e.target.files[0]);
      try {
        const res= await uploadProductImage(formData).unwrap();
        console.log(res);
        setImage(res.image);
      } catch (err) {
        console.log(err.error);
      }

    }

  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>
      Go Back
    </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {alert && <Message variant='danger'>Product update</Message>}
      {alertDone &&<Message variant='success'>
        Product updated
  </Message>}
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
               <Form.Control type='file'
            label='Choose file'
            onChange={uploadFileHandler}>
            </Form.Control>
      
           
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
         
          </Form.Group>
         

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            style={{ marginTop: '1rem' }}
          >
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  </>
  )
}

export default ProductEditScreen
