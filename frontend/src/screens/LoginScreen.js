import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import loginImage from '../appImages/loginImage.jpg';


const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    //get userLogin from state using useSelector Hook from redux
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {

        //redirect if already logged in
        //if not logged in, userInfo is null
        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault();
        //Dispatch Login
        dispatch(login(email, password));
    };

    return (

        <Row>

            <Col>
                <Image src={loginImage} fluid style={{ paddingTop: '3%', borderRadius: '7%' }} />
            </Col>

            <Col>

                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <h1>Sign In</h1>

                <Form onSubmit={submitHandler} className='py-3'>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Sign In</Button>

                </Form>
                   New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    )
}

export default LoginScreen
