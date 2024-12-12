import React from 'react'
import './Footer.css'
import logo from '../../assets/images/eco-logo.png'
import { ListGroup, ListGroupItem } from 'reactstrap'
import {Link} from 'react-router-dom'


export const Footer = () => {

    const year = new Date().getFullYear()
    return (
        <footer className='footer mt-5'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-4 mb-4">
                        <div className="logo">
                            {/* <img src={logo} alt="logo" /> */}
                            <div>
                                <h1 className='text-white'>Multimart</h1>
                                <p>since 1995</p>
                            </div>
                        </div>
                        <p className="footer__text">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem recusandae exercitationem, illum accusantium saepe maiores beatae laborum tempora optio debitis.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-2 mb-3">
                        <div className="footer__quick-links">
                            <h4 className='quick__links-title'>Categories</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='#'>Mobile Phone</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='#'>Modern Sofa</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='#'>Arm Chair</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='#'>Smart Watches</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-2 mb-3">
                        <div className="footer__quick-links">
                            <h4 className='quick__links-title'>Links</h4>
                            <ListGroup className='mb-3'>
                                <ListGroupItem className='ps-0 border-0'>
                                    <Link to='/shop'>Shop</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='/cart'>Cart</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='/login'>Login</Link>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0'>
                                    <Link to='#'>Privacy Policy</Link>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="footer__quick-links">
                            <h4 className='quick__links-title'>Contact</h4>
                            <ListGroup className='mb-3 footer__contact'>
                                <ListGroupItem className='ps-0 border-0  d-flex align-items-center gap-2'>
                                    <span><i className="ri-map-pin-line"></i></span>
                                    <p>7 April St, Latakia, Syria</p>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0  d-flex align-items-center gap-2'>
                                    <span><i className="ri-phone-line"></i></span>
                                    <p>+963 945 238 961</p>
                                </ListGroupItem>
                                <ListGroupItem  className='ps-0 border-0  d-flex align-items-center gap-2'>
                                    <span><i className="ri-mail-line"></i></span>
                                    <p>mohammadkardi1@gmail.com</p>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </div>
                    <div className="col-lg-12 mb-4">
                        <div className="footer__copyright">
                            Copyright {year} developed by Mohammad Kardi. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
