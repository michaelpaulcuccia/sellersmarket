import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <i className='fas fa-icicles'></i> iceMarket
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
