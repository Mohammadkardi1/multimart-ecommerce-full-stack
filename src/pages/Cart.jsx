import React from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import '../Styles/cart.css'
import CommonSection from '../components/UI/CommonSection'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCart } from './../redux/thunks/cartThunks'
import { showToastFailure, showToastSuccess } from './../utils/toastUtils'
import { authThunks } from './../redux/slices/authSlice'



export const Cart = () => {

    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.auth)    

    const deletehandler = async (productID) => {
        try {
            const res = await dispatch(removeCart(productID))
            if (!res.error) {
              dispatch(authThunks.syncLocalStorage())
              showToastSuccess("The product has been removed successfully!", { position: "top-right", autoClose: 3000 })
            } else {
              showToastFailure("System error! Please try again.", { position: "top-right", autoClose: 3000 })
            }
          } catch (error) {
            console.log(error.message)
    }}


    return (
    <Helmet title={"Cart"}>
        <CommonSection title={'Shopping Cart'}/>
        <section className="pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">

                        {loggedInUser?.cart?.length > 0  &&
                        <table className='table bordered'>
                            <thead>
                                <tr className="fw-bold">
                                    <td>Image</td>
                                    <td>Title</td>
                                    <td>Price</td>
                                    <td>Qty</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                            {loggedInUser?.cart?.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item?.productID?.imgUrl} alt="" /></td>
                                    <td>{item?.productID?.productName}</td>
                                    <td>{item?.price}</td>
                                    <td>{item?.quantity}</td>
                                    <td>
                                        <div onClick={() => deletehandler(item?.productID?._id)}>
                                            <motion.i whileTap={{scale:1.5}} className="ri-delete-bin-line"></motion.i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        }


                    </div>
                    <div className="col-lg-3 pt-4 pt-lg-0">
                        <div>
                            <h6 className='d-flex align-items-center justify-content-between'>
                                Subtotal
                                {loggedInUser?.totalAmount ?
                                <span className='fs-4 fw-bold'>${loggedInUser?.totalAmount}</span>
                                : 
                                <span className='fs-4 fw-bold'>$0</span>
                                }
                            </h6>
                            <h6 className='d-flex align-items-center justify-content-between'>
                                Total Quantity
                                <span className='fs-4 fw-bold'>{loggedInUser?.totalQuantity}</span>
                            </h6>
                        </div>
                        <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
                        <div>
                            <button className="shop__btn w-100">
                                <Link to='/checkout'>Checkout</Link>
                            </button>
                            <button className="shop__btn w-100 mt-3">
                                <Link to='/shop'>Continue Shopping</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Helmet>
    )
}
