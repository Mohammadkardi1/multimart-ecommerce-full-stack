import React, {useEffect} from 'react'
import HeroImg from '../../assets/images/hero-img.png'
import '../../Styles/home.css'
import {Link, useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import Services from '../../services/Services'
import counterImg from '../../assets/images/counter-timer-img.png'
import Clock from '../../components/UI/Clock'
import { useSelector } from 'react-redux';
import { authThunks } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux'
import {getTrendingProducts, getBestSalesProducts, getMobileProducts, getPopularProducts } from '../../redux/thunks/productThunks'
import { Helmet } from './../../components/Helmet/Helmet';
import ProductShowcase from './ProductShowcase';





export const Home =  () => {

    const year = new Date().getFullYear()

    const location = useLocation()
    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.auth)
    const { trendingProducts, bestSalesProducts, mobileProducts, popularProducts } = useSelector(state => state.product)


    useEffect(() => {
        dispatch(getTrendingProducts(4))
        dispatch(getBestSalesProducts(5))
        dispatch(getMobileProducts(2))
        // dispatch(getWirelessProducts(4))
        dispatch(getPopularProducts(3))
    },[])

    const logoutHandler = () => {
        try {
            dispatch(authThunks.logout())
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <Helmet title={"Home"}>
        <section className='hero__section'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="hero__content pb-4">
                            <p className="hero__subtitle">Trending product in {year}</p>
                            <h2>Make Your Interior More Minimlistic & Modern</h2>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat ab veniam facere, similique ex, iure dignissimos explicabo autem labore doloremque blanditiis ea dolorem ratione, ducimus facilis? At explicabo iusto eum?</p>
                            {/* <motion.button whileHover={{scale:1.2}} 
                                className="shop__btn">
                                <Link to='/shop'>
                                    SHOP NOW
                                </Link>
                            </motion.button> */}
                            {loggedInUser?.username ? 
                            <div className="d-flex align-items-center  flex-row gap-3">
                                {/* <span onClick={logoutHandler}>Logout</span> 
                                <Link to='/dashboard'>Dashboard</Link> */}
                                
                                <motion.button whileHover={{scale:1.2}} className="shop__btn  p-2 " onClick={logoutHandler}>
                                        Logout
                                </motion.button>
                                {loggedInUser?.role === "Seller" ? 
                                <motion.button whileHover={{scale:1.2}} className="shop__btn p-2 ">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </motion.button>
                                : null
                                }
                            </div>
                            : 
                            <div className='d-flex align-items-center  flex-row gap-3'>
                                <motion.button whileHover={{scale:1.2}} className="shop__btn p-2 ">
                                    <Link to='/login' state={{path: location.pathname}}>Login</Link>
                                </motion.button>    
                                <motion.button whileHover={{scale:1.2}} className="shop__btn  p-2 ">
                                    <Link to='/register' state={{path: location.pathname}}>Register</Link>
                                </motion.button>

                                {/* <motion.button whileHover={{scale:1.2}} className="shop__btn p-2 ">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </motion.button> */}
                            </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="hero__img"><img src={HeroImg}/></div>
                    </div>
                </div>
            </div>
        </section>
        <Services/>



        <ProductShowcase title="Trending Products" products={trendingProducts} />
        <ProductShowcase title="Best Sales" products={bestSalesProducts} />



        <section className="timer__count p-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 count-down-col " >
                        <div className="clock__top-content">
                            <h4 className='text-white fs-6 mb-2 d-block'>Limited Offer</h4>
                            <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
                        </div>
                        <Clock/>
                        <motion.button whileHover={{scale:1.1}} className='shop__btn store__btn'>
                            <Link to='/shope'>Visit Store</Link>
                        </motion.button>
                    </div>
                    <div className="col-12 col-lg-6 text-end counter__img">
                        <img src={counterImg} alt="" />
                    </div>
                </div>
            </div>
        </section>


        <ProductShowcase title="New Arivals" products={mobileProducts} />
        {/* <ProductShowcase title="Electronic  Products" products={wirelessProducts} /> */}
        <ProductShowcase title="Popular Products" products={popularProducts} />
    </Helmet>
    )
}
