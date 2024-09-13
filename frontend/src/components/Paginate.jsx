import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({page, pages ,pageName,isAdmin}) => {
  return (
    <>
       <Pagination>
        {[...Array(pages).keys()].map(number=>{
            return(
                <LinkContainer key={number+1} to={isAdmin? `/admin/${pageName}/${number+1}`:`/page/${number+1}`}>
                        <Pagination.Item key={number+1} active={number+1 === page}>{number+1}</Pagination.Item>
                </LinkContainer>
            )
        })}
       </Pagination>
    </>
  )
}

export default Paginate
