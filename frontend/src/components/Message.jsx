import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  return (
    <>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {children}
        </p>
      </Alert>
    </>
  )
}

export default Message
