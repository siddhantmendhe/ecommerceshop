import React from 'react'
import { Helmet } from 'react-helmet-async'

const HelmetComponent = ({title}) => {
  return (
    <Helmet>
       <title>{title}</title>
    </Helmet>
  )
}
HelmetComponent.defaultProps={
    title:"Welcome to shop"
}

export default HelmetComponent
