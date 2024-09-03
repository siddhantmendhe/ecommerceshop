import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Form } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');
    const {userInfo}= useSelector(state=>state.auth);

    //set name and email if already logged in
    useEffect(()=>{
        if( userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    },[userInfo, userInfo.name, userInfo.email]);

    const submitHandler=()=>{
    console.log(1);
    }
  return (
    <Row>
    
  </Row>
  )
}

export default ProfileScreen
