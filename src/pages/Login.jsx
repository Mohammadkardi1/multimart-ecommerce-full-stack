import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Form, FormGroup } from 'reactstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../Styles/login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebaseConfig'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { FirebaseError } from 'firebase/app'




export const Login = () => {

    // const [email,setEmail ] =useState('')
    // const [password,setPassword ] =useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {register,  handleSubmit, formState: {errors}  } = useForm()
    const redirectPath = location.state?.path || '/home'
    const [logInError, setLogInError] = useState("")

    // console.log("location.state?.path",  location.state?.path)
    // console.log("redirectPath", redirectPath)
    // console.log("location.pathname",  typeof location.pathname)

    useEffect(()=> {
        window.scrollTo(0,0)
    })

    const signIn = async (data) => {
        // e.preventDefault()
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email,data.password )
            const user = userCredential.user
            console.log(user)
            setLoading(false)
            toast.success('successfully logged in')
            navigate(redirectPath, {replace :true})
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorCode = error.code
                if (errorCode === 'auth/wrong-password') {
                    setLogInError("Your email or password is incorrect. Please try again or reset your password.")
                } else if (errorCode === 'auth/user-not-found') {
                    setLogInError("The email you entered is not registered. Please verify your email or sign up if you're new to our service.")
                } else {
                    setLogInError("You can't login something went wrong")
                }
            }
            setLoading(false)
            // toast.error(error.message)
        }

    }
    return (
        <Helmet title={"Login"}>
            <section>
                <div className="container">
                    <div className="row">
                        {
                            loading ? <div className="col-12 text-center">
                                <h5 className='fw-500'>Loading...</h5>
                            </div> :
                            <div className="col-lg-6 m-auto text-center" >
                                <h3 className='fw-bold fs-4 mb-4'>Login</h3>
                                <Form className='auth__form' onSubmit={handleSubmit(signIn)}>
                                    <FormGroup className='form__group'>
                                        <input 
                                            type="text"
                                            name= "email"
                                            id="email"
                                            placeholder='Enter your email'
                                            // value={email}
                                            // onChange={e => setEmail(e.target.value)}
                                            {...register('email', {
                                                required: "Please Enter Email",
                                                pattern: {
                                                    value:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                                                    message: "Please Enter A Valid Email"
                                                }
                                            })}/>
                                        <p className={`mt-2 text-start error-message  ${errors.email?.message ? "visible" : "invisible"}`}>
                                            {errors.email?.message}!
                                        </p>
                                    </FormGroup>
                                    <FormGroup  className='form__group'>
                                        <input 
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder='Enter your password'
                                            // value={password}
                                            // onChange={e => setPassword(e.target.value)}

                                            {...register("password", {
                                                required: "Please Enter Password",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters long"
                                                }
                                            })}
                                            />
                                            <p className={`mt-2 text-start error-message ${errors.password?.message ? "visible" : "invisible"}`}>
                                                {errors.password?.message}!
                                            </p>
                                    </FormGroup>
                                    <button className="shop__btn log__btn mt-2"
                                        type='submit'>
                                        Login
                                    </button>

                                    <div className='text-center'>
                                        <p className={`error-message ${logInError ? "visible" : "invisible"}`}>
                                            {logInError}
                                        </p>
                                    </div>

                                    <p>
                                        Don't have an account? <Link to='/signup'>Create an account</Link> 
                                    </p>
                                </Form>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
