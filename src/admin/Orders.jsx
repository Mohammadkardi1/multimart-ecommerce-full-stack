import React from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'



export const Orders = () => {
    return (
        <Helmet title="Orders">
            <Container>
                <Row>
                    <Col lg='12' className='text-center py-5'>
                        <h3 className='fw-bold'>Orders</h3>
                    </Col>
                </Row>
            </Container>
        </Helmet> 
    )
}
