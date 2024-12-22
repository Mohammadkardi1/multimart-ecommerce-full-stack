import React, {useState, useEffect} from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import HeroImg from '../assets/images/hero-img.png'
import '../Styles/home.css'
import {Link, useLocation} from 'react-router-dom'
import {motion} from 'framer-motion'
import Services from '../services/Services'
import ProductsList from '../components/UI/ProductsList'
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock'
import products from './../assets/data/products';
import { useSelector } from 'react-redux';
import { authThunks } from './../redux/slices/authSlice';
import { useDispatch } from 'react-redux'



export const Home =  () => {

    const [trendingProducts, setTrendingProducts] = useState([])
    const [bestSalesProducts, setBestSalesProducts] = useState([])
    const [mobileProducts, setMobileProducts] = useState([])
    const [wirelessProducts, setWirelessProducts] = useState([])
    const [popularProducts, setPopularProducts] = useState([])
    const year = new Date().getFullYear()
    // const [products, loading ] = useGetFirestoreData("products")

    const location = useLocation()
    const dispatch = useDispatch()

    const { loggedInUser } = useSelector(state => state.auth)


    useEffect(() => {
        const filterTrendingProducts = products.filter(item => item.category === 'chair')
        setTrendingProducts(filterTrendingProducts)

        const filterBestSalesProducts = products.filter(item => item.category === 'sofa')
        setBestSalesProducts(filterBestSalesProducts)

        const filterMobileProducts = products.filter(item => item.category === 'mobile')
        setMobileProducts(filterMobileProducts)

        const filterWirelessProducts = products.filter(item => item.category === 'wireless')
        setWirelessProducts(filterWirelessProducts)

        const filterPopularProducts = products.filter(item => item.category === 'watch')
        setPopularProducts(filterPopularProducts)

    },[products])



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
                                <Link to='shop'>
                                    SHOP NOW
                                </Link>
                            </motion.button> */}
                            {loggedInUser ? 
                            <div className="d-flex align-items-center  flex-row gap-3">
                                {/* <span onClick={logoutHandler}>Logout</span> 
                                <Link to='/dashboard'>Dashboard</Link> */}
                                
                                <motion.button whileHover={{scale:1.2}} className="shop__btn  p-2 " onClick={logoutHandler}>
                                        Logout
                                </motion.button>
                                <motion.button whileHover={{scale:1.2}} className="shop__btn p-2 ">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </motion.button>
                            </div>
                            : 
                            <div className='d-flex align-items-center  flex-row gap-3'>
                                
                                <motion.button whileHover={{scale:1.2}} className="shop__btn  p-2 ">
                                    <Link to='/register' state={{path: location.pathname}}>Register</Link>
                                </motion.button>
                                <motion.button whileHover={{scale:1.2}} className="shop__btn p-2 ">
                                    <Link to='/login' state={{path: location.pathname}}>Login</Link>
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
        {trendingProducts.length !== 0 ? 
            <section className='trending_products pt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center" >
                            <h2 className="section__title mb-4">Trending Products</h2>
                        </div>
                        <ProductsList data={trendingProducts}/>
                    </div>
                </div>
            </section> : null
        }
        {bestSalesProducts.length !== 0 ?
        <section className="best__sales pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center" >
                        <h2 className="section__title mb-4">
                            Best Sales
                        </h2>
                    </div>
                    <ProductsList data={bestSalesProducts}/>
                </div>
            </div>
        </section> : null 
        }
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
        {mobileProducts.length !==  0 ? 
        <section className="new__arivals pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center" >
                        <h2 className="section__title mb-4">New Arivals</h2>
                    </div>
                    <ProductsList data={mobileProducts}/>
                </div>
            </div>
        </section> : null 
        }
        {wirelessProducts.length !==  0 ? 
        <section className="new__arivals pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center" >
                        <h2 className="section__title mb-4">Electronic  Products</h2>
                    </div>
                    <ProductsList data={wirelessProducts}/>
                </div>
            </div>
        </section> : null 
        }
        {popularProducts.length !== 0 ? 
        <section className="popular__category pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center" >
                        <h2 className="section__title mb-4">Popular Products</h2>
                    </div>
                    <ProductsList data={popularProducts}/>
                </div>
            </div>
        </section> : null 
        }
    </Helmet>
    )
}
