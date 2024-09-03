import React from 'react'
import { useGetProductsQuery } from '../../slices/productApiSlice'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { LinkContainer } from 'react-router-bootstrap';

const ProductListScreen = () => {
    const {data, isLoading, isError}= useGetProductsQuery();
    console.log(data);
    const deleteHandler=(id)=>{
        console.log('id', id)
    }
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' >
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

   
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
                <th>CATEGORY</th>
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
                  <td>{product.category}</td>
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
