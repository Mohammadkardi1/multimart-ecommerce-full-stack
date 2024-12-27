import React from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import '../Styles/cart.css'
import CommonSection from '../components/UI/CommonSection'
import { motion } from 'framer-motion'
import {cartActions} from '../redux/slices/CartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import products from './../assets/data/products';



export const Cart = () => {

    const cartItems = products
    const totalAmount = useSelector(state => state.cart.totalAmount)
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const dispatch = useDispatch()
    const deletehandler = (item) => {
        dispatch(cartActions.deleteItem(item.id))
    }

    return (
        <Helmet title={"Cart"}>
            <CommonSection title={'Shopping Cart'}/>
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            {cartItems.length === 0 ? <h2 className='fs-4 text-center'>No item added to the cart</h2>
                                : 
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
                                        {
                                            cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td><img src={item.imgUrl} alt="" /></td>
                                                    <td>{item.productName}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        <div onClick={() => deletehandler(item)}>
                                                            <motion.i whileTap={{scale:1.5}}
                                                            className="ri-delete-bin-line">
                                                            </motion.i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                            </table>
                            }
                        </div>
                        <div className="col-lg-3 pt-4 pt-lg-0">
                            <div>
                                <h6 className='d-flex align-items-center justify-content-between'>
                                    Subtotal
                                    <span className='fs-4 fw-bold'>${totalAmount}</span>
                                </h6>
                                <h6 className='d-flex align-items-center justify-content-between'>
                                    Total Quantity
                                    <span className='fs-4 fw-bold'>{totalQuantity}</span>
                                </h6>
                            </div>
                            <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
                            <div>
                                <button className="shop__btn w-100">
                                    <Link to='/checkout'>
                                        Checkout
                                    </Link>
                                </button>
                                <button className="shop__btn w-100 mt-3">
                                    <Link to='/shop'>
                                        Continue Shopping
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
