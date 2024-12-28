import React, { useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import '../Styles/cart.css'
import CommonSection from '../components/UI/CommonSection'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserCart, removeCart } from './../redux/thunks/cartThunks';
import { showToastFailure, showToastSuccess } from './../utils/toastUtils';



export const Cart = () => {

    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.auth)
    const { cartDetails } = useSelector(state => state.cart)

    console.log(cartDetails)


    



    const deletehandler = async (productID) => {
        try {
            const res = await dispatch(removeCart(productID))
            if (!res.error) {
            //   dispatch(authThunks.syncLocalStorage())
              showToastSuccess("The product has been removed successfully!", { position: "top-right", autoClose: 3000 })
            } else {
              showToastFailure("System error! Please try again.", { position: "top-right", autoClose: 3000 })
            }
          } catch (error) {
            console.log(error.message)
          }
    }

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    return (
    <Helmet title={"Cart"}>
        <CommonSection title={'Shopping Cart'}/>
        <section className="pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
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
                        {cartDetails?.cart?.map((item, index) => (
                            <tr key={index}>
                                <td><img src={item.productID.imgUrl} alt="" /></td>
                                <td>{item.productID.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <div onClick={() => deletehandler(item.productID._id)}>
                                        <motion.i whileTap={{scale:1.5}} className="ri-delete-bin-line"></motion.i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    </div>
                    <div className="col-lg-3 pt-4 pt-lg-0">
                        <div>
                            <h6 className='d-flex align-items-center justify-content-between'>
                                Subtotal
                                <span className='fs-4 fw-bold'>${cartDetails?.totalAmount}</span>
                            </h6>
                            <h6 className='d-flex align-items-center justify-content-between'>
                                Total Quantity
                                <span className='fs-4 fw-bold'>{cartDetails?.totalQuantity}</span>
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
