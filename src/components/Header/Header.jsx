import React, {useRef, useEffect} from 'react'
import './header.css'
import logo from '../../assets/images/eco-logo.png'
import { Link, useLocation, NavLink, useNavigate, Navigate } from 'react-router-dom'
import userIcon from '../../assets/images/user-icon.png'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'
import {auth} from '../../firebaseConfig'
import useAuth from '../../custom-hooks/UseAuth'
import { signOut } from 'firebase/auth'
import {toast} from 'react-toastify'




const nav__items = [
    {
        path: "home",
        display: "Home"
    },
    {
        path: "shop",
        display: "Shop"
    },
    {
        path: "cart",
        display: "Cart"
    }
]




export const Header = () => {

    const menuRef = useRef(null)
    const navigate = useNavigate()
    const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const profileActionRef = useRef(null)


    const location = useLocation()

    // const user = auth.currentUser

    const {currentUser} = useAuth()

    

    const navigateToCart = () => {
        navigate('/cart')
    }

    const menuToggle = () => {
        menuRef.current.classList.toggle('active__menu')
    }

    const toggleProfileActions = () =>{
        profileActionRef.current.classList.toggle('show__profileActions')
        console.log('asasasas')
    }

    const signoutHandler = () => {
        signOut(auth).then(() => {
            toast.success('You is signed out')
        }).catch((error) => {
            toast.error(error.message)
        })
    }

    // const clickhandler = () => {
    //     console.log('asasasasa4444444')
    //     const state = { path: '/dashboard' };
    //     // return <Navigate to='/dashboard' state={{  path :'/dashboard'}}/>
    //     return <Navigate to={{ pathname: '/new-url', state: state }} />
        
        
    // }

    return (
        <div className="header py-3">
            <div className='container'>
                <div className="row">
                    <div className="nav__wrapper">
                        <Link to="home">
                            <div className="logo">
                                <img src={logo} alt="logo" />
                                <div>
                                    <h1>Multimart</h1>
                                    {/* <p>since 1995</p> */}
                                </div>
                            </div>
                        </Link>
                        <div className="navigation" ref={menuRef}>

                            <ul className="menu p-3 p-md-0" 
                            // onClick="event.stopPropagation()"
                            >
                                <li className="w-100 text-end d-block d-md-none" >
                                    <i 
                                        className="ri-close-fill display-6" 
                                        onClick={menuToggle} 
                                        role="button">
                                    </i>
                                </li>
                                {
                                    nav__items.map((item, index) => (
                                        <li key={index} className="w-100 text-start py-2 nav__item">

                                            <NavLink to={item.path} 
                                                className={(navClass) => navClass.isActive ? "nav__active": ""}>
                                                {item.display}
                                            </NavLink>
                                        </li>

                                    ))
                                }
                            </ul>
                        </div>

                        <div className="nav__icons">
                            {/* <span className="fav__icon">
                                <i class="ri-heart-line"></i>
                                <span className='badge'>1</span>
                            </span> */}
                            <span className="cart__icon" onClick={navigateToCart}>
                                <i class="ri-shopping-bag-line"></i>
                                <span className='badge'>{totalQuantity}</span>
                            </span>

                            <div className='profile'>
                                <motion.img 
                                    whileHover={{scale: 1.2}} 
                                    src={currentUser? currentUser.photoURL : userIcon} 
                                    alt=""
                                    onClick={toggleProfileActions} />
                                <div 
                                    className='profile__actions' 
                                    ref={profileActionRef}
                                    onClick={toggleProfileActions}>
                                    {
                                        currentUser ? 
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <span onClick={signoutHandler}>Logout</span> 
                                            <Link to='dashboard'>Dashboard</Link>
                                        </div>
                                        : <div className='d-flex align-items-center justify-content-center flex-column'>
                                                <Link to='/signup' state={{path: location.pathname}}>
                                                    Signup
                                                </Link>
                                                <Link to='/login' state={{path: location.pathname}}>
                                                    Login
                                                </Link>
                                                <Link to='/dashboard'>
                                                    Dashboard
                                                </Link>
                                        </div>
                                    }
                                </div>
                            </div>



                            <div className="mobile__menu">
                                <span onClick={menuToggle}>
                                    <i class="ri-menu-line"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
