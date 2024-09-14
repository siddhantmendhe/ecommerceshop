import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {  useGetTopProductsQuery } from '../slices/productApiSlice';
import Message from './Message';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Loader from './Loader';

const ProductCarousels = () => {
   
    const { data, isLoading, error } = useGetTopProductsQuery();




   
      return isLoading ? <Loader/> : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <Carousel pause='hover' className='bg-primary mb-4'>
          {data.products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className='carousel-caption'>
                  <h2 className='text-white text-right'>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      );
}

export default ProductCarousels
