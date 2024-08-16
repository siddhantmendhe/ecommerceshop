import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder';
const Loader = () => {
  return (
    <div>
        <Placeholder as="p" animation="glow" >
        <Placeholder xs={12} bg="success"/>
      </Placeholder>
    </div>
  )
}

export default Loader
