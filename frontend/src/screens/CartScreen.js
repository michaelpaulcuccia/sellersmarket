import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    //console.log(qty)
    //?qty=1

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        //if not logged in, directed login. else, directed to shipping
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>

            <Col md={8}>
                <h1 className='cartScreen_shoppingCartH1'>Shopping Cart</h1>
                <p>Free shipping when you order $1,000 or more of merchandise</p>
                {cartItems.length === 0 ?
                    <Message>Your Cart is Empty <Link to='/'>Go Back</Link> </Message>
                    :
                    (<ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as='select'
                                            value={item.qty}
                                            onChange={(event) => dispatch(addToCart(item.product, Number(event.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2
                                className='cartScreen_subtotalh2'>
                                Subtotal ({cartItems.reduce((accumulator, current) => accumulator + current.qty, 0)}) items
                            </h2>
                            ${cartItems.reduce((accumulator, current) => accumulator + current.qty * current.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className="btn-block"
                                disabled={cart.cartItems.length === 0}
                                onClick={checkoutHandler}>
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;