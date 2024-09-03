import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Col, Row, Table,Form } from 'react-bootstrap'
import {  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useProfileUpdateMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice'

const ProfileScreen = () => {
    const [alert, setAlert]=useState(false); // to track alert
    const [alertDone, setAlertDone]=useState(false); // to track successful alert
    const [errTemp, setErrTemp]=useState('');    
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const {userInfo}= useSelector(state=>state.auth);
    const dispatch= useDispatch()

    //set name and email if already logged in
    useEffect(()=>{
        
            setName(userInfo.name);
            setEmail(userInfo.email);
        
    },[userInfo, userInfo.name, userInfo.email]);

    //update profile mutaion 
    const [profileUpdate, {isLoading:loadingUpdateProfile}]= useProfileUpdateMutation();
  
   
    
    const submitHandler=async(e)=>{
      e.preventDefault();
    try {
        if(password!==confirmPassword){

        }
        else{
          const res= await profileUpdate({name, email, password}).unwrap();
          //set localstorage for userInfo
          dispatch(setCredentials({...res}))
      }
        
        setAlertDone(true);
        setTimeout(() => {
          setAlertDone(false);
        }, 5000);
    setErrTemp(`Profile update successfully done`)
    } catch (err) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
  setErrTemp(`Error ${err?.data?.message||err}`)
    }

    }
  return (
    <Row>
    <Col md={3}>
    {alert &&<Message variant='danger'>
   {errTemp}
  </Message>}
  {alertDone &&<Message variant='success'>
   {errTemp}
  </Message>}
      <h2>User Profile</h2>

      <Form onSubmit={submitHandler}>
       <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
        {loadingUpdateProfile && <Loader />}
      </Form>
    </Col>
    <Col md={9}>
     
  
    </Col>
  </Row>
  )
}

export default ProfileScreen
