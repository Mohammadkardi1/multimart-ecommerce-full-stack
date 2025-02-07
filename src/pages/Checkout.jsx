import React from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Form, FormGroup } from 'reactstrap'
import '../Styles/checkout.css'
import { useSelector } from 'react-redux'




export const Checkout = () => {

    const { loggedInUser } = useSelector(state => state.auth)

    return (
        <Helmet title={"Checkout"}>
            <CommonSection title={"Checkout"}/>
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h6 className='mb-4 fw-bold'>
                                Billing Information
                            </h6>
                            <Form className='billing__form'>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Name' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="email" placeholder='Email' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="number" placeholder='Phone number' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Street address' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='City' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Postal Code' />
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <input type="text" placeholder='Country' />
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="col-lg-4">
                            <div className="checkout__cart">
                                <h6>Total Qty: <span>{loggedInUser?.totalQuantity} items</span></h6>
                                <h6>Subtotal: <span>${loggedInUser?.totalAmount}</span></h6>
                                <h6>
                                    <span>
                                        Shipping:<br/> 
                                        free shipping
                                    </span>
                                    <span>$0</span>
                                </h6>
                                <h4>Total Cost: <span>${loggedInUser?.totalAmount}</span></h4>
                                <button className="shop__btn auth__btn w-100">
                                    Please an order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
