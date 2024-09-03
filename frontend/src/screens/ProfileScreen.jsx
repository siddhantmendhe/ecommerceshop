import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Col, Row } from 'react-bootstrap'
import { Form } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const {userInfo}= useSelector(state=>state.auth);
    const submitHandler=()=>{
    console.log(1);
}
  return (
    <Row>
    <h1>Profile page</h1>
  </Row>
  )
}

export default ProfileScreen
