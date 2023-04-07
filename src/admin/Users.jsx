import React, {useState, useEffect} from 'react'
import { auth,  storage, db } from '../firebaseConfig'
import {Container, Row, Col } from 'reactstrap'
import { Helmet } from '../components/Helmet/Helmet'
import { toast } from 'react-toastify'
import useGetFirestoreData from '../custom-hooks/useGetFirestoreData'
import { ref, deleteObject } from 'firebase/storage'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import useAuth from '../custom-hooks/UseAuth'
import { Link } from 'react-router-dom'
import '../Styles/all-product.css'


export const Users = () => {
    

    const [data, loading ] = useGetFirestoreData('users')


    return (
        <Helmet title={'Users'}>
        <Container>
            <Row>
                <Col lg='12' className='text-center py-5'>
                    <h3 className='fw-bold'>Users</h3>
                </Col>
                {
                    loading ? 
                    <Col lg="12" className="text-center">
                        <h5 className='py-5'>Loading...</h5>
                    </Col> :    <Col lg="12">
                        {
                            data.length === 0 ? 
                                <div className="text-center">
                                    <h5 className="py-5 ">No Users Found</h5>
                                </div> 
                            : 
                            <table className="table bordered">
                                <thead>
                                    <tr className="fw-bold">
                                        <td>Image</td>
                                        <td>Username</td>
                                        <td>Email</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.photoURL} alt=""/>
                                            </td>
                                            <td>{item.displayName}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                </Col>
                }
                <Col className='col-12 pt-5 pb-3'>
                    <Link to='/home'>
                        Back to home
                    </Link>
                </Col>
            </Row>
        </Container>
    </Helmet>
    )
}
