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
        profileActionRef.current.classList.toggle('show__profileActions')
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
                                <li key={index} onClick={menuToggle} className="w-100 text-start py-2 nav__item">
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
                            <span className='badge'>{loggedInUser?.totalQuantity}</span>
                        </span>
                        <div className='profile'>
                            <motion.img whileHover={{scale: 1.2}} onClick={toggleProfileActions} src={loggedInUser?.photoURL ? loggedInUser?.photoURL : userIcon} 
                                 />
                            <div className='profile__actions' ref={profileActionRef}>
                                {loggedInUser?.username ? 
                                <div className="d-flex align-items-center justify-content-center flex-column">
                                    {loggedInUser?.role === "Seller" ? 
                                    <Link to='/dashboard' onClick={toggleProfileActions}>Dashboard</Link>: null 
                                    }
                                    <Link to='#' onClick={logoutHandler}>Logout</Link> 
                                </div>: 
                                <div className='d-flex align-items-center justify-content-center flex-column'>
                                    <Link to='/login' onClick={toggleProfileActions} state={{path: location.pathname}}>Login</Link>
                                    <Link to='/register' onClick={toggleProfileActions} state={{path: location.pathname}}>Register</Link>
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
