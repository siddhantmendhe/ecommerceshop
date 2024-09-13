
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import AlertPage from '../components/AlertPage';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

const HomeScreen = () => {
  const pageNumber=useParams()
  const  {data, isLoading, isError}=useGetProductsQuery(pageNumber);

  return (
    <>
    {isLoading?(<Loader/>):isError?(<AlertPage/>):<>
    <h1>Latest Products</h1>
      <Row>
        
        {data.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate page={data.page} pages={data.maxPageNum} isAdmin={false}/>
      </>}
      
    </>
  );
};

export default HomeScreen;