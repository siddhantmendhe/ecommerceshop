
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import AlertPage from '../components/AlertPage';
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

const HomeScreen = () => {
  const  {data: products, isLoading, isError}=useGetProductsQuery();

  return (
    <>
    {isLoading?(<Loader/>):isError?(<AlertPage/>):<>
    <h1>Latest Products</h1>
      <Row>
        
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      </>}
      
    </>
  );
};

export default HomeScreen;