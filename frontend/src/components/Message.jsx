import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  return (
    <>
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading></Alert.Heading>
        <p>
          {children}
        </p>
      </Alert>
    </>
  )
}

export default Message
