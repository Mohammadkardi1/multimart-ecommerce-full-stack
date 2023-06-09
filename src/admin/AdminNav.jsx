import React, { useRef } from 'react'
import { Container, Row, Col } from 'reactstrap'
import useAuth from '../custom-hooks/UseAuth'
import '../Styles/admin-nav.css'
import {NavLink , Link } from 'react-router-dom'
import userIcon from '../assets/images/user-icon.png'


const admin__nav = [
    {
        display:'Dashboard',
        path: "/dashboard/main"
    },
    {
        display:'All Products',
        path: "/dashboard/all-products"
    },
    {
        display:'Add Product',
        path: "/dashboard/add-product"
    },
    {
        display:'Users',
        path: "/dashboard/users"
    },
]



export const AdminNav = () => {

    const {currentUser} = useAuth()

    return (
        <> 
            <header className='admin__header'>
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top g-0">
                            <div className="logo ">
                                <Link to='/home'>
                                    <h2>Multimart</h2>
                                </Link>
                            </div>
                            <div className='admin__nav-top-right '>
                                <img src={currentUser ?  currentUser.photoURL :userIcon  } 
                                    alt="" />
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            <section className="admin__menu p-4">
                <Container>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list m-0 p-0 flex-column gap-4 flex-md-row gap-md-0">
                                {
                                    admin__nav.map((item, index) => (
                                        <li className='admin__menu-item' key={index}>
                                            <NavLink 
                                                to={item.path}
                                                index={index}
                                                className={(navClass) => navClass.isActive ? "nav__active" : ""}>
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                </Container>
            </section>
        </>
    )
}
