import  { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { Link,  useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader'
import CustomToast from '../components/CustomToast';


const LoginScreen = () => {
  const [alert, setAlert]=useState(false); // to track alert
  const [errTemp, setErrTemp]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] =useState('');
  const [password, setPassword]=useState('');
  const [login ,{isLoading}]=useLoginMutation();
  // const obj=useLoginMutation();
  // console.log('obj:',obj)

  //getting value from store
  const {userInfo}=useSelector(state=> state.auth);


  //check if is there any redirect param in url

  const [URLSearchParams]= new useSearchParams();
  const redirect=URLSearchParams.get('redirect')|| '/';
  useEffect(()=>{
   
   
    if(userInfo){
    
      navigate(redirect);

    }
  },[userInfo,redirect,navigate]);

 


const submitHandler= async(e)=>{
  e.preventDefault();
  try {
    
    const response=await login({email,password}).unwrap();
    dispatch(setCredentials({...response}));
  } catch (err) {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
    setErrTemp(err?.data?.message||err)
    console.log(err?.data?.message||err);
  }

}
  return (
    <FormContainer >
    <h1>Sign In</h1>
  <div >{alert?   (<CustomToast veriant="danger" message={errTemp}/>):''}</div>

    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
         onChange={(e)=>setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button  type='submit' variant='primary' disabled={isLoading}>
        Sign In
      </Button>
      </Form>
      <Row className='py-3'>
        <Col>
        New Customer? <Link to={URLSearchParams.get('redirect')?`/register?/redirect=${redirect}`:`/register`}>Register</Link>
        </Col>

      </Row>
      {isLoading &&<Loader/>}

      </FormContainer>
      
      
  )
}

export default LoginScreen
