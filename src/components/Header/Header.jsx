import React, {useRef} from 'react'
import './header.css'
import logo from '../../assets/images/eco-logo.png'
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom'
import userIcon from '../../assets/images/user-icon.png'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { authThunks } from './../../redux/slices/authSlice';


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
    const dispatch = useDispatch()


    const { loggedInUser } = useSelector(state => state.auth)


    const navigateToCart = () => {
        navigate('/cart')
    }
    const menuToggle = () => {
        menuRef.current.classList.toggle('active__menu')
    }
    const toggleProfileActions = () =>{
        profileActionRef.current.classList.toggle('show__profileActions')
    }


    const logoutHandler = () => {
        dispatch(authThunks.logout())
    }

    return (
    <div className="header py-3">
        <div className='container'>
            <div className="row">
                <div className="nav__wrapper">
                    <Link to="home">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <div className='d-none d-sm-block'><h1>Multimart</h1></div>
                        </div>
                    </Link>
                    <div className="navigation" ref={menuRef}>
                        <ul className="menu p-3 p-md-0" >
                            <li className="w-100 text-end d-block d-md-none" >
                                <i className="ri-close-fill display-6" onClick={menuToggle} role="button"></i>
                            </li>
                            {nav__items.map((item, index) => (
                                <li key={index} className="w-100 text-start py-2 nav__item">
                                    <NavLink to={item.path} 
                                        className={(navClass) => navClass.isActive ? "nav__active": ""}>
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="nav__icons">
                        <span className="cart__icon" onClick={navigateToCart}>
                            <i className="ri-shopping-bag-line"></i>
                            <span className='badge'>{totalQuantity}</span>
                        </span>
                        <div className='profile'>
                            <motion.img whileHover={{scale: 1.2}} src={loggedInUser? loggedInUser.photoURL : userIcon} 
                                onClick={toggleProfileActions} />
                            <div className='profile__actions' ref={profileActionRef}onClick={toggleProfileActions}>
                                {loggedInUser ? 
                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                        <Link to='/dashboard'>Dashboard</Link>
                                        <span onClick={logoutHandler}>Logout</span> 
                                    </div>: 
                                    <div className='d-flex align-items-center justify-content-center flex-column'>
                                        <Link to='/register' state={{path: location.pathname}}>Register</Link>
                                        <Link to='/login' state={{path: location.pathname}}>Login</Link>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="mobile__menu">
                            <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
