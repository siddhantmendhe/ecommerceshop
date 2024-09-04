import React, { useState } from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
const CustomToast = ({variant ,message}) => {
  const classtext=`bg-${variant}`;
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  
  return (
    <>
       <ToastContainer position="top-end"  className="p-3" style={{ zIndex: 1 }}>
        <Toast className="d-inline-block m-1" bg={variant} show={showA} onClose={toggleShowA} > 
          
          <Toast.Header > 
           
            <strong className="me-auto">Notification</strong>
           
          </Toast.Header>
          <Toast.Body className={'text-white'}>{message}</Toast.Body>
        </Toast>
    
      </ToastContainer>
    </>
  )
}

export default CustomToast
