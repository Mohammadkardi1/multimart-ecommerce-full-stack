import React from 'react'
import {Container, Row, Col,  Form, FormGroup } from 'reactstrap'
import { Helmet } from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom'
import { nameValidator, priceValidator } from './../utils/validator';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from './../redux/thunks/productThunks';
import { showToastFailure, showToastSuccess } from './../utils/toastUtils';
import uploadImageToCloudinary from './../utils/uploadImageToCloudinary';
import { productThunks } from './../redux/slices/productSlice';
import LoadingModel from '../components/Model/LoadingModel';
import { authThunks } from './../redux/slices/authSlice';



export const AddProduct = () => {


    const dispatch = useDispatch()

    const { productLoading } = useSelector(state => state.product)

    const {register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {
            category: ""
        }
    })

    const addProductHandler = async (productInfo) => {
        try {

            dispatch(productThunks.setLoading(true))

            const imgUrl = await uploadImageToCloudinary(productInfo?.imgUrl[0])
    
            productInfo = {...productInfo , imgUrl: imgUrl.secure_url}

            const res = await dispatch(addProduct(productInfo))

            if (!res.error) {
              dispatch(authThunks.syncLocalStorage())
              reset()
              showToastSuccess("Your product has been submitted successfully!", { position: "top-right", autoClose: 3000 })
            } else {
              showToastFailure("System error! Your product wasn't submitted. Please try again.", { position: "top-right", autoClose: 3000 })
            }
          } catch (error) {
            console.log(error.message)
          }
    }

    return (
        <Helmet title={'Add Product'}>
            <Container>
                <Row>
                    <Col lg='12' className='text-center py-5'>
                        <h3 className='fw-bold'>Add Products</h3>
                    </Col>
                    <Col lg="12">
                    <Form onSubmit={handleSubmit(addProductHandler)}>
                        <FormGroup className="form__group">
                            <label className="d-block mb-1 text-start text-primaryColor font-semibold">Product Name</label>
                            <input type='text' placeholder="e.g. Double sofa"
                                {...register("productName", nameValidator)}/>
                            <p className={`mt-2 text-start error-message ${errors.productName?.message ? "visible" : "invisible"}`}>
                                {errors.productName?.message}
                            </p>
                        </FormGroup>
                        <FormGroup className="form__group">
                            <label className="d-block mb-1 text-start text-primaryColor font-semibold">Short Description</label>
                            <input type='text' placeholder="e.g. Lorem...."
                                    {...register("shortDosc", {required: "Write short desc"})}/>
                            <p className={`mt-2 text-start error-message ${errors.shortDosc?.message ? "visible" : "invisible"}`}>
                                {errors.shortDosc?.message}
                            </p>
                        </FormGroup>
                        <FormGroup className="form__group">
                            <label className="d-block mb-1 text-start text-primaryColor font-semibold">Description</label>
                            <textarea rows="4" type='text' placeholder="e.g. lorem..."
                                    {...register("description", {required: "Write description"})}/>
                            <p className={`mt-2 text-start error-message ${errors.description?.message ? "visible" : "invisible"}`}>
                                {errors.description?.message}
                            </p>
                        </FormGroup>
                        <div className='d-flex align-items-center justify-content-between gap-5'>
                            <FormGroup className="form__group w-50">
                                <label className="d-block mb-1 text-start text-primaryColor font-semibold">Price</label>
                                <input type='text' placeholder="e.g. $100"
                                     {...register("price", priceValidator)}/>
                                <p className={`mt-2 text-start error-message ${errors.price?.message ? "visible" : "invisible"}`}>
                                    {errors.price?.message}.
                                </p>
                            </FormGroup>
                            <FormGroup className="form__group w-50">
                                <label className="d-block mb-1 text-start text-primaryColor font-semibold">Category</label>
                                <select {...register("category", {required: "Select category"})}>
                                    <option value="" disabled >Select Category</option>
                                    <option value="Furniture" >Furniture</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                                <p className={`mt-2 text-start error-message ${errors.category?.message ? "visible" : "invisible"}`}>
                                    {errors.category?.message}.
                                </p>
                            </FormGroup>
                        </div>
                        <FormGroup className="form__group">
                                <label className="d-block mb-1 text-start text-primaryColor font-semibold mt-4">Product Image</label>
                                <input type='file' style={{"width": "auto", "border":"none"}}
                                    {...register("imgUrl", {required: "Select product image"})}/>
                                <p className={`mt-2 text-start error-message ${errors.imgUrl?.message ? "visible" : "invisible"}`}>
                                    {errors.imgUrl?.message}
                                </p>
                        </FormGroup>
                        <button className='shop__btn' type='submit'>
                            {productLoading ? <LoadingModel color={"#ddd"}/> : "Add Product"}
                        </button>
                    </Form>
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
