import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {

    const dispatch = useDispatch();

    //useSelector takes in an arrow function and returns a part of state
    const productList = useSelector(state => state.productList);
    //destructure
    const { loading, error, products } = productList;


    useEffect(() => {
        //axios.get('/api/products')
        dispatch(listProducts());
    }, [dispatch]);

    // console.log(products)

    let toolsArr = [];
    let cramponsArr = [];
    let harnessArr = [];
    let ropesArr = [];

    products.forEach(item => {
        if (item.category === 'Tools') {
            toolsArr.push(item)
        } else if (item.category === 'Crampons') {
            cramponsArr.push(item)
        } else if (item.category === 'Harness') {
            harnessArr.push(item)
        } else {
            ropesArr.push(item)
        }
    })


    return (
        <>
            <h1>Latest Items</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :

                <>
                    <div className='py-3'>
                        <h3>Ice Tools</h3>
                    </div>
                    <Row>
                        {toolsArr.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    <div className='py-3'>
                        <h3>Crampons</h3>
                    </div>
                    <Row>
                        {cramponsArr.map(product => (

                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>



                        ))}
                    </Row>

                    <div className='py-3'>
                        <h3>Harnesses</h3>
                    </div>
                    <Row>
                        {harnessArr.map(product => (

                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    <div className='py-3'>
                        <h3>Ropes</h3>
                    </div>
                    <Row>
                        {ropesArr.map(product => (

                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>

                        ))}
                    </Row>
                </>
            }
        </>
    )
}

export default HomeScreen;