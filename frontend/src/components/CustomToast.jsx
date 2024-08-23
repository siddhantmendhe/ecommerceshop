import React from 'react'
import {Toast, ToastContainer} from 'react-bootstrap'
const CustomToast = ({message}) => {
  return (
    <>
       <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast bg='danger'> 
          <Toast.Header className='bg-danger text-white'> 
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{message}</strong>
           
          </Toast.Header>
          
        </Toast>
    
      </ToastContainer>
    </>
  )
}

export default CustomToast
