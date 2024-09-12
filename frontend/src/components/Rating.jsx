
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';


const Rating = ({value, text}) => {
  let star=[];

    for (let i = 1; i <= 5; i++) {
      if(value>=i){
      star.push(<FaStar key={i}/>) 
      }
      else{
        if(value<=(i-0.1)&&value>=(i-0.9)){
          star.push( <FaStarHalfAlt key={i}/>)

        }
        else{
          star.push(<FaRegStar key={i}/>)

        }

      }
    }
  
 
  return (
    <div className='rating'>

    {/* <span>
    {value>= 1?<FaStar/>: value>=0.5 ? <FaStarHalfAlt/>: <FaRegStar/>}
    </span>
    <span>
    {value>= 2?<FaStar/>: value>=1.5 ? <FaStarHalfAlt/>: <FaRegStar/>}
    </span>    
    <span>
    {value>= 3?<FaStar/>: value>=2.5 ? <FaStarHalfAlt/>: <FaRegStar/>}
    </span>    
    <span>
    {value>= 4?<FaStar/>: value>=3.5 ? <FaStarHalfAlt/>: <FaRegStar/>}
    </span>    
    <span >
    {value>= 5?<FaStar/>: value>=4.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
    </span>         */}
    {star}
 
 

    <span className='rating-text'>{text && text}</span>
    </div>
  )
}

export default Rating