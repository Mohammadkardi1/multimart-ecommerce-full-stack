import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import { Helmet } from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
import '../Styles/all-product.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from './../redux/thunks/productThunks';
import { authThunks } from './../redux/slices/authSlice';
import { showToastFailure, showToastSuccess } from './../utils/toastUtils';
import LoadingModel from '../components/Model/LoadingModel'
import ErrorModel from './../components/Model/ErrorModel';



export const AllProduct = () => {

    const { loggedInUser } = useSelector(state => state.auth)
    const { productLoading } = useSelector(state => state.product)
    const dispatch = useDispatch()




    const deleteHandler = async (productID) => {
        try {
            const res = await dispatch(deleteProduct(productID))
            if (!res.error) {
              dispatch(authThunks.syncLocalStorage())
              showToastSuccess("The product has been deleted successfully!", { position: "top-right", autoClose: 3000 })
            } else {
              showToastFailure("System error! The product wasn't submitted. Please try again.", { position: "top-right", autoClose: 3000 })
            }
          } catch (error) {
            console.log(error.message)
          }
    }

    return (
        <Helmet title={'All Products'}>
            <Container>

                {loggedInUser?.products?.length !== 0 ?
                <Row>
                    <Col lg='12' className='text-center py-5'>
                        <h3 className='fw-bold'>All Products</h3>
                    </Col>

                    <Col lg="12 text-center">
                        {loggedInUser?.products  ? 
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
                            {loggedInUser?.products?.map((item, index) => (
                                <tr key={index}>
                                    <td className=''>
                                        <img src={item?.imgUrl} alt=""/>
                                    </td>
                                    <td >{item?.productName}</td>
                                    <td>${item?.price}</td>
                                    <td>{item?.category}</td>
                                    <td>
                                        <button className='shop__btn p-1 m-0' style={{'background':"red"}} 
                                            onClick={() => deleteHandler(item?._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <div className="text-center">
                            <h5 className="py-5 ">No Product Found</h5>
                        </div> 
                        }
                    </Col>

                </Row>
                :
                <ErrorModel errorMsg={"You have not added any products yet."} styles={"h-[40vh]"}/>
                }

                {productLoading && <LoadingModel isFixed={true}/>}

                <Col className='col-12 pt-5 pb-3'>
                        <Link to='/home'>Back to home</Link>
                </Col>
            </Container>
        </Helmet>
    )
}
