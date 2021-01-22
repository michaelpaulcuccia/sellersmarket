import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
//import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import registerImage from '../appImages/registerImage.png';


const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    //get userRegister from state using useSelector Hook from redux
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault();

        //check password
        if (password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            //Dispatch Register
            dispatch(register(name, email, password))
        }
    };

    return (
        // <FormContainer>
        //     <h1>Sign Up</h1>

        //     {message && <Message variant='danger'>{message}</Message>}
        //     {error && <Message variant='danger'>{error}</Message>}
        //     {loading && <Loader />}

        //     <Form onSubmit={submitHandler}>

        //         <Form.Group controlId='name'>
        //             <Form.Label>Name</Form.Label>
        //             <Form.Control
        //                 type="name"
        //                 placeholder='Enter Name'
        //                 value={name}
        //                 onChange={(event) => setName(event.target.value)}>
        //             </Form.Control>
        //         </Form.Group>

        //         <Form.Group controlId='email'>
        //             <Form.Label>Email Address</Form.Label>
        //             <Form.Control
        //                 type="email"
        //                 placeholder='Enter Email'
        //                 value={email}
        //                 onChange={(event) => setEmail(event.target.value)}>
        //             </Form.Control>
        //         </Form.Group>

        //         <Form.Group controlId='password'>
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control
        //                 type="password"
        //                 placeholder='Enter Password'
        //                 value={password}
        //                 onChange={(event) => setPassword(event.target.value)}>
        //             </Form.Control>
        //         </Form.Group>

        //         <Form.Group controlId='confirmPassword'>
        //             <Form.Label>Confirm Password</Form.Label>
        //             <Form.Control
        //                 type="password"
        //                 placeholder='Confirm Password'
        //                 value={confirmPassword}
        //                 onChange={(event) => setConfirmPassword(event.target.value)}>
        //             </Form.Control>
        //         </Form.Group>

        //         <Button type='submit' variant='primary'>Register</Button>

        //     </Form>

        //     <Row className='py-3'>
        //         <Col>
        //             Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        //         </Col>
        //     </Row>

        // </FormContainer>

        <Row>

            <Col>
                <Image src={registerImage} fluid style={{ paddingTop: '3%', borderRadius: '7%' }} />
            </Col>

            <Col>
                <h1>Sign Up</h1>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder='Enter Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Register</Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                        Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>

            </Col>

        </Row>
    )
}

export default RegisterScreen
