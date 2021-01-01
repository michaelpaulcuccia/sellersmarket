import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import sellersMarket from './images/sellersMarket.jpg';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Sellers Market</h1>
          <img src={sellersMarket} alt='market'
            style={{ display: 'block', position: 'fixed', marginLeft: 'auto', marginRight: 'auto', width: '50%', opacity: '.5' }}
          />
        </Container>
      </main>
      <Footer />
    </>

  )
}

export default App
