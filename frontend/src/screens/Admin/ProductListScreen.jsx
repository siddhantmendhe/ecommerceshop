import React, { useState } from 'react'
import {  useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import CustomToast from '../../components/CustomToast';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { useSelector } from 'react-redux';

const ProductListScreen = () => {
  const [alert, setAlert]=useState(false); // to track alert
  const [alertDone, setAlertDone]=useState(false); // to track successful alert
  const pageNumber=useParams();
  const searchValue=useSelector(state=>state.controls.search)
  

  const [errTemp, setErrTemp]=useState('');
    const {data,refetch, isLoading, isError}= useGetProductsQuery({pageNumber, searchValue });
    const [createProduct, {isLoading:createProductLoading}]= useCreateProductMutation();
    const [deleteProduct, {isLoading:loadingDelete}]= useDeleteProductMutation();
    console.log(data);
    const deleteHandler=async(id)=>{
      if(window.confirm("Are you sure you want to delete the product?"))
        try {
          await deleteProduct(id);
          refetch()
        
        } catch (error) {
          
        }
    }
    const createProducthandler=async()=>{
        if(window.confirm("Are you sure you want to add a new product ?")){
             await createProduct();
             refetch();
             
          setAlertDone(true);
          setTimeout(() => {
            setAlertDone(false);
          }, 5000);
      setErrTemp(`New product created`)

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
      {loadingDelete&&<Loader/>}

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
              {data.products.map((product) => (
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
                      disabled={loadingDelete}
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.maxPageNum} pageName="productlist" isAdmin={true}/>
        </>
      )}
    </>
  )
}

export default ProductListScreen
