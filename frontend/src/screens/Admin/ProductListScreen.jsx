import React, { useState } from 'react'
import {  useCreateProductMutation, useGetProductsQuery } from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import CustomToast from '../../components/CustomToast';

const ProductListScreen = () => {
  const [alert, setAlert]=useState(false); // to track alert
  const [alertDone, setAlertDone]=useState(false); // to track successful alert
  const [errTemp, setErrTemp]=useState('');
    const {data,refetch, isLoading, isError}= useGetProductsQuery();
    const [createProduct, {isLoading:createProductLoading, isError:createProductError}]= useCreateProductMutation();
  

    console.log(data);
    const deleteHandler=(id)=>{
        console.log('id', id)
    }
    const createProducthandler=async()=>{
      
        if(window.confirm("Are you sure you want to add a new product ?")){
           
             try {
              await createProduct();
              refetch();
             } catch (error) {
        
              setAlert(false);
           
       
             }
     
            if(alert){setAlertDone(true);
          setTimeout(() => {
            setAlertDone(false);
          }, 5000);
          setErrTemp(`New product created`)}
     

        }else{
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 5000);
    setErrTemp(`New product creation canceled`);
        }
     
    
    }
 
  return (
    <>
    {alert &&<CustomToast variant='danger' message={errTemp}>

  </CustomToast>}
  {alertDone &&<CustomToast variant='success' message={errTemp}> 
   
  </CustomToast>}
 
 { createProductError&&<Message variant='danger' >Error while creating new product</Message>}
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProducthandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {createProductLoading&&<Loader/>}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
           
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </>
      )}
    </>
  )
}

export default ProductListScreen
