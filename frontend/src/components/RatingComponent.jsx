import React from 'react'
import {  FaStar } from 'react-icons/fa'

const RatingComponent = ({rating,setRating}) => {
  return (
    <div>
    {[1, 2, 3, 4, 5].map((star) => {
      return (  
        <span key={star}
          className='start'
          style={{
            cursor: 'pointer',
            color: rating >= star ? 'gold' : 'gray',
            fontSize: `35px`,
          }}
          onClick={() => {
            setRating(star)
          }}
        >
          {' '}
          <FaStar />{' '}
        </span>
      )
    })}
  </div>
  )
}

export default RatingComponent
