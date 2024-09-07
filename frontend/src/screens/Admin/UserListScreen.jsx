import React, { useState } from 'react'
import CustomToast from '../../components/CustomToast'
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../slices/userApiSlice';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const UserListScreen = () => {
    const [alert, setAlert]=useState(false); // to track alert
    const [alertDone, setAlertDone]=useState(false); // to track successful alert
  
    const [errTemp, setErrTemp]=useState('');
    const {data,refetch, isLoading, isError}=useGetAllUsersQuery();
    //delete user mutation
    const [deleteUser,{isLoading:loadingDelete}]= useDeleteUserMutation();
    console.log(data);
    const deleteHandler=async(id)=>{
      if(window.confirm('are sure you want to delete user?')){
        try {
          await deleteUser(id);
          refetch();
        } catch (error) {
          
        }

      }
    }
    const createUserhandler=()=>{
      console.log('create user')
    }
  return (
    <>
    {alert &&<CustomToast variant='danger' message={errTemp}>

  </CustomToast>}
  {alertDone &&<CustomToast variant='success' message={errTemp}> 
   
  </CustomToast>}
  
      <Row className='align-items-center'>
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createUserhandler}>
            <FaPlus /> Create user
          </Button>
        </Col>
      </Row>

    
      

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{isError}</Message>
      ) : (
        <>   {loadingDelete&&<Loader/>}
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Email</th>
           
                <th>Is Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}</td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      disabled={loadingDelete}
                      
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen
