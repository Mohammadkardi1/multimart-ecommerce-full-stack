import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import {db, storage} from '../firebaseConfig'
import {collection, deleteDoc, doc} from 'firebase/firestore'
// import useGetFirestoreData from '../custom-hooks/useGetFirestoreData'
import { Helmet } from '../components/Helmet/Helmet'
import {toast} from 'react-toastify'
import {ref, deleteObject} from 'firebase/storage'
import { Link } from 'react-router-dom'
import '../Styles/all-product.css'
import products from './../assets/data/products';



export const AllProduct = () => {


    const deleteHandler = async (item) => {
        try {
            await deleteDoc(doc(collection(db, "products"), item.id))
            const storageRef = ref(storage, item.imgUrl)
            await deleteObject(storageRef)
            toast.success("Product successfully deleted")
        } catch(error) {
            toast.error('Error deleting product')
        }
    }

    return (
        <Helmet title={'All Products'}>
            <Container>
                <Row>
                    <Col lg='12' className='text-center py-5'>
                        <h3 className='fw-bold'>All Products</h3>
                    </Col>


  
                        
                    <Col lg="12">
                        {
                            products.length === 0 ? 
                                <div className="text-center">
                                    <h5 className="py-5 ">No Product Found</h5>
                                </div> 
                            : 
                            <table className="table bordered">
                                <thead>
                                    <tr className="fw-bold">
                                        <td>Image</td>
                                        <td>Name</td>
                                        <td>Price</td>
                                        <td>Category</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img src={item.imgUrl} alt=""/>
                                            </td>
                                            <td>{item.productName}</td>
                                            <td>${item.price}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <button 
                                                    className='shop__btn p-1 m-0'
                                                    style={{'background':"red"}}
                                                    onClick={() => deleteHandler(item)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                    </Col>

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
