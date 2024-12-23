import React, { useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import { Form, FormGroup } from 'reactstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../Styles/login.css'
import { useForm } from 'react-hook-form'
import {emailValidator} from './../utils/validator'
import { useSelector, useDispatch } from 'react-redux';
import { showToastSuccess } from './../utils/toastUtils';
import { loginUser } from '../redux/thunks/authThunks'
import { authThunks } from './../redux/slices/authSlice';



export const Login = () => {

    
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { authError } = useSelector(state => state.auth)

    const {register,  handleSubmit, formState: {errors} } = useForm()
    
    const redirectPath = location.state?.path || '/home'


    useEffect(()=> {
        window.scrollTo(0,0)
        dispatch(authThunks.clearAuthError())
    }, [])


    const loginHandler = async (userInfo) => {
        try {
            const res = await dispatch(loginUser(userInfo))
            if (!res.error) {
              showToastSuccess("You have logged in successfully!", { position: "top-right", autoClose: 3000 })
              navigate(redirectPath, {replace :true})
            }
          } catch (error) {
            console.log(error.message)
          }
      
    }



    return (
        <Helmet title={"Login"}>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto text-center" >
                            <h3 className='fw-bold fs-4 mb-4'>Login</h3>
                            <Form className='auth__form' onSubmit={handleSubmit(loginHandler)}>
                                <FormGroup className='form__group'>
                                    <label className="text-white d-block mt-2 mb-1 text-start">Email</label>
                                    <input type="text" placeholder='Enter your email'
                                        {...register('email', emailValidator)}/>
                                    <p className={`mt-2 text-start error-message  ${errors.email?.message ? " visible" : "invisible"}`}>
                                        {errors.email?.message}!
                                    </p>
                                </FormGroup>
                                <FormGroup  className='form__group'>
                                    <label className="text-white d-block mt-2 mb-1 text-start">Password</label>
                                    <input type="password" placeholder='Enter your password'
                                        {...register("password", 
                                            {required: "Enter Password"})}/>
                                    <p className={`mt-2 text-start error-message ${errors.password?.message ? "visible" : "invisible"}`}>
                                        {errors.password?.message}.
                                    </p>
                                </FormGroup>
                                <button className="shop__btn log__btn mt-2" type='submit'>Login</button>
                                <div className='text-center'>
                                    <p className={`error-message ${authError ? "visible" : "invisible"}`}>
                                        {authError}.
                                    </p>
                                </div>
                                <p>
                                    Don't have an account? <Link to='/register'>Create an account</Link> 
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
