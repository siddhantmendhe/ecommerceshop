import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import CustomToast from '../../components/CustomToast';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../slices/userApiSlice';

const UserEditScreen = () => {
    const [alert, setAlert]=useState(false); // to track alert
    const [alertDone, setAlertDone]=useState(false); // to track successful alert
    const [errTemp, setErrTemp]=useState('');
    const {id:userId}= useParams();
    const navigate= useNavigate();
    const {data: user, refetch, isLoading, error}= useGetUserByIdQuery(userId);
    const [updateUser,{isLoading:loadingUpdate}]= useUpdateUserMutation();

    const [name, setName]= useState('');
    const [email, setEmail]=useState('');
    const [isAdmin, setAdmin]=useState(false);

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAdmin(user.isAdmin);
        }
     
    },[user])

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            await updateUser({userId ,name,email, isAdmin});
            refetch()
                 
          setAlertDone(true);
          setTimeout(() => {
            setAlertDone(false);
          }, 5000);
      setErrTemp(`User Updated `)
        } catch (err) {
         
        }

    
    }

  

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
      Go Back
    </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {alert && <Message variant='danger'>Product update</Message>}
      {alertDone &&<Message variant='success'>
        user updated
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

          <Form.Group controlId='email'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin'>
          <Form.Label>isAdmin</Form.Label>
          <Form.Check 
            type="checkbox"
            value={isAdmin} 
            checked={isAdmin}
            onChange={(e)=>setAdmin(!isAdmin)}
          />
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

export default UserEditScreen
