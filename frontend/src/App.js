import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div aria-live="polite"
    aria-atomic="true"
    className=" position-relative"
    style={{ minHeight: '240px' }}>
    <Header/>
    <main className='py-3'>
      <Container>
     <Outlet/>

      </Container>
    </main>
    <Footer/>
    </div>
  )
}

export default App