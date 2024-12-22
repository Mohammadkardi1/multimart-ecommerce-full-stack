import React, { useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import { Form, FormGroup } from 'reactstrap'
import { Link} from 'react-router-dom'
import '../Styles/login.css'
import { usernameValidator, emailValidator, passwordValidator } from '../utils/validator'


import {  useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { authThunks } from './../redux/slices/authSlice';
import uploadImageToCloudinary from './../utils/uploadImageToCloudinary';
import { registerUser } from './../redux/thunks/authThunks';
import LoadingModel from './../components/Model/LoadingModel';



export const Register = () => {


    const dispatch = useDispatch()
    const { authError, authLoading } = useSelector((state) => state.auth)
    const {register, handleSubmit, formState: {errors} } = useForm()


    useEffect(()=> {
        window.scrollTo(0,0)
    }, [])



    const registerHandler = async (userInfo) => {
        dispatch(authThunks.setLoading(true))
        
        // const photoURL = await uploadImageToCloudinary(userInfo?.photoURL[0])

        // userInfo = {...userInfo , photoURL: photoURL.secure_url}
        userInfo = {...userInfo , photoURL: "aajbsh"}

        try {
            const res = await dispatch(registerUser(userInfo))

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <Helmet title={"Register"}>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center" >
                            <h3 className='fw-bold fs-4 mb-4'>Register</h3>
                            <Form className='auth__form' onSubmit={handleSubmit(registerHandler)}>
                                <FormGroup className='form__group'>
                                    <label className="text-white d-block mb-1 text-start">Name</label>
                                    <input type="text" placeholder='Username'
                                        {...register("username", usernameValidator)}/>
                                        <p className={`mt-2 text-start error-message ${errors.username?.message ? "visible" : "invisible"}`}>
                                            {errors.username?.message}
                                        </p>
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <label className="text-white d-block mt-2 mb-1 text-start">Email</label>
                                    <input type="text" placeholder='Enter your email'
                                        {...register('email', emailValidator)}/>
                                        <p className={`mt-2 text-start error-message ${errors.email?.message ? "visible" : "invisible"}`}>
                                            {errors.email?.message}
                                        </p>
                                </FormGroup>
                                <FormGroup className='form__group'>
                                    <label className="text-white d-block mt-2 mb-1 text-start">Password</label>
                                    <input type="password" placeholder='Enter your password'
                                        {...register("password", {validate: passwordValidator})}/>
                                    <p className={`mt-2 text-start error-message ${errors.password?.message ? "visible" : "invisible"}`}>
                                        {errors.password?.message}
                                    </p>
                                </FormGroup>
                                <FormGroup  className='form__group'>
                                    <label className="text-white d-block mt-5 text-start">Choose your profile picture</label>
                                    <input type="file"
                                        {...register("photoURL", {
                                            // required: "Select a Photo",
                                            // validate: imageTypeValidator
                                        })}/>
                                    <p className={`mt-2 text-start error-message ${errors.photoURL?.message ? "visible" : "invisible"}`} >
                                        {errors.photoURL?.message}
                                    </p>
                                </FormGroup>
                                <button className="shop__btn log__btn" disabled={authLoading}>
                                    {authLoading ? <LoadingModel/> : "Register"}
                                </button>
                                <p className={`mt-2 text-center error-message ${authError ? "visible" : "invisible"}`}>
                                    {authError}
                                </p>
                                <p>Already have an account? <Link to='/login'>Login</Link></p>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
