import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {

    //get userLogin from State, then deconstruct to pullout userInfo 
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand ><i className='fas fa-icicles'></i> iceMarket</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="ml-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-basket"></i> cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user-circle"></i> login</Nav.Link>
                                </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </header>
    )
}

export default Header;