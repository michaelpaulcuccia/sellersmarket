import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


const ProfileScreen = ({ history }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    //get userDetails from state using useSelector Hook from redux
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    //get user orders from state using useSelector Hook from redux
    //renamed
    const orderMyList = useSelector(state => state.orderMyList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

    //for checking if user is logged in
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    //updated profile success message value - boolean
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        //redirect to login if not logged in
        if (!userInfo) {
            history.push('/login')
        } else {
            //check for user, from userDetails
            if (!user || !user.name || success) {
                //navbar update...
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                //pass 'profile' instead of id
                dispatch(getUserDetails('profile'))
                //get all user orders
                dispatch(listMyOrders());
            } else {
                //set form fields
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (event) => {
        event.preventDefault();

        //check password
        if (password !== confirmPassword) {
            setMessage('Passwords Do Not Match')
        } else {
            //Dispatch Updated Profile
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    };

    return (
        <Row>

            <Col md={3}>

                <h2>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Successfully Updated</Message>}
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

                    <Button type='submit' variant='primary'>Update</Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }}></i>}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>
    )
}

export default ProfileScreen
