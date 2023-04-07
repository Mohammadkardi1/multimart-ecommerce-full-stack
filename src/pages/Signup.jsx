import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import { Form, FormGroup } from 'reactstrap'
import { Link, useLocation} from 'react-router-dom'
import '../Styles/login.css'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { auth ,storage, db } from '../firebaseConfig'
import { setDoc, doc } from 'firebase/firestore'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {  useForm } from 'react-hook-form'




export const Signup = () => {




    // const [username,setUsername ] =useState('')
    // const [email,setEmail ] =useState('')
    // const [password,setPassword ] =useState('')
    // const [file,setFile ] =useState(null)




    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/home'
    const {register, handleSubmit, formState: {errors} } = useForm()


    useEffect(()=> {
        window.scrollTo(0,0)
    })


    const validateImageType = (value) => {
        if (!value[0]) {
          // No file selected
            return true;
        }
        const file = value[0];
        const types = ['image/jpeg', 'image/png']
        if ( ! types.includes(file.type)  ) {
          // Invalid file type
        return 'Please upload a valid image file JPG or PNG';
        }
        // Valid file type
        return true;
    }





    const Signup = async (data) => {
        // e.preventDefault()
        console.log(data)
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
            const storageRef = ref(storage, `images/${Date.now() + data.username}`)
            const uplaodTask = uploadBytesResumable(storageRef, data.file[0])
            uplaodTask.on(
                (error)=> {
                    toast.error(error.message)
                }, 
                ()=> {
                    getDownloadURL(uplaodTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(user, {
                            displayName:data.username,
                            photoURL: downloadURL,
                        })
                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid,
                            displayName: data.username,
                            email: data.email,
                            photoURL: downloadURL
                        })
                    })
                })
            toast.success("Acount has been created")
            setLoading(false)
            navigate(redirectPath, {replace:true})

            
        } catch(error) {
            setLoading(false)
            const errorCode = error.code
            const errorMessage = error.message
            toast.error('something went wrong')
        }

    }



    return (
        <Helmet title={"Signup"}>
            <section>
                <div className="container">
                    <div className="row">
                        {
                            loading ? <div className="col-12 text-center fw-bold">
                                <h5>Loading...</h5>
                            </div> :
                            <div className="col-lg-6 m-auto text-center" >
                                <h3 className='fw-bold fs-4 mb-4'>Signup</h3>
                                <Form className='auth__form' onSubmit={handleSubmit(Signup)}>
                                    <FormGroup className='form__group'>
                                        <input 
                                            type="text"  
                                            id="username"
                                            name="username"
                                            placeholder='Username'
                                            // value={username}
                                            // onChange={e => setUsername(e.target.value)}
                                            {...register("username", {
                                                required: "Please enter username",
                                                minLength: {
                                                    value: 6,
                                                    message: "username must be at least 5 characters long"
                                                }
                                            })}/>
                                            <p className={`mt-2 text-start error-message ${errors.username?.message ? "visible" : "invisible"}`}>
                                                {errors.username?.message}
                                            </p>
                                    </FormGroup>
                                    <FormGroup className='form__group'>
                                        <input 
                                            type="text"
                                            id = "email"
                                            name="email"
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
                                            <p className={`mt-2 text-start error-message ${errors.email?.message ? "visible" : "invisible"}`}>
                                                {errors.email?.message}
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
                                    <FormGroup  className='form__group'>
                                        <label htmlFor="File" className="text-white d-block mt-5 text-start">
                                            Choose your profile picture
                                        </label>
                                        <input 
                                            type="file"  
                                            id="file"
                                            name='file'
                                            accept='image/*'
                                            // onChange={e => setFile(e.target.files[0])}
                                            {...register("file", {
                                                required: "Please enter the iamge of the price",
                                                validate: validateImageType
                                            }
                                            )}
                                        />
                                        {errors.image && <span>Please upload a valid image file (jpg or png)</span>}
                                        <p className={`mt-2 text-start error-message ${errors.file?.message ? "visible" : "invisible"}`} >
                                            {errors.file?.message}!
                                        </p>
                                    </FormGroup>
                                    <button className="shop__btn log__btn"
                                        type='submit'>
                                        Create an account
                                    </button>
                                    <p>
                                        Already have an account? <Link to='/login'>Login</Link> 
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
