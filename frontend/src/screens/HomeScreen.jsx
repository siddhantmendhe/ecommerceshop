
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import AlertPage from '../components/AlertPage';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from 'react-redux';
import ProductCarousels from '../components/ProductCarousels';
import { updateSearch } from '../slices/appControlls';
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />

const HomeScreen = () => {
  const {pageNumber}=useParams()
  const dispatch=useDispatch()
  const searchValue=useSelector(state=>state.controls.search)

  const handleSearchBack=async(e)=>{
    e.preventDefault()
    dispatch(updateSearch(''))
    console.log(1)
    

  }
  const  {data, isLoading, isError}=useGetProductsQuery({pageNumber, searchValue });

  return (
    <>
        
        {searchValue===''?(<ProductCarousels/>):( <Link className='btn btn-light my-3'  onClick={(e)=>handleSearchBack(e)}>Go Back</Link>)}

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