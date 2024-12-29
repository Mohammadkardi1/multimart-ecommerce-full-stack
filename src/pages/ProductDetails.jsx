import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommonSection  from '../components/UI/CommonSection'
import '../Styles/product-details.css'
import { motion } from 'framer-motion'
import {Helmet} from '../components/Helmet/Helmet'
import ProductList from '../components/UI/ProductsList'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { getProductByID, getTrendingProducts } from '../redux/thunks/productThunks'
import LoadingModel from './../components/Model/LoadingModel';
import ErrorModel from './../components/Model/ErrorModel';
import { addCart } from './../redux/thunks/cartThunks';
import { authThunks } from './../redux/slices/authSlice';
import { showToastFailure, showToastSuccess } from './../utils/toastUtils';
import { PopUpModel } from './../components/Model/PopUpModel';

export const ProductDetails = () => {

    const { productID } = useParams()
    const dispatch = useDispatch()

    const { trendingProducts, product, productError, productLoading } = useSelector(state => state.product)

    const [isModelOpen, setIsModelOpen] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(getProductByID(productID))
        dispatch(getTrendingProducts(4))
    }, [productID])


    const addToCart = async (productID) => {
        if (!JSON.parse(localStorage.getItem('profile'))?.data?._id ) {
            setIsModelOpen(true)
            return
        }
        try {
            const res = await dispatch(addCart({productID, price: product.price}))
            if (!res.error) {
              dispatch(authThunks.syncLocalStorage())
              showToastSuccess("The product has been added successfully!", { position: "top-right", autoClose: 3000 })
            } else {
              showToastFailure("System error! Please try again.", { position: "top-right", autoClose: 3000 })
            }
          } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <Helmet title ={product?.productName}>
            <CommonSection title={product?.productName}/>

            {productLoading && !productError && <LoadingModel styles={"h-[40vh]"}/>}

            {productError && !productLoading && <ErrorModel errorMsg={productError} styles={"h-[40vh]"}/> }

            {!productLoading && !productError && 
            <>
            <section className='pt-0 pb-0'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mt-3">
                        {/* <img src={product?.imgUrl} alt="" /> */}
                            <div className="aspect-square w-full overflow-hidden rounded-xl">
                                <img className="object-cover  w-full"
                                        src={product?.imgUrl}/>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="product__details">
                                <h2>{product?.productName}</h2>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className='product__price'>${product?.price}</span>
                                    <span>{product?.category}</span>
                                </div>
                                <p className='mt-3'>{product?.shortDesc}</p>
                                <motion.button whileHover={{scale:1.1}} className="shop__btn" onClick={() => addToCart(product?._id)}>
                                    Add to Cart
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6 className='active__tab mt-4'>Description</h6>
                            </div>
                            <div className="tab__content mt-2">
                                <p className=' text-gray-700'>{product?.description}</p>
                            </div>
                        </div>
                        <div className="col-lg-12 mt-5  text-start">
                            <h2 className="related__title">
                                You may also like
                            </h2>
                        </div>
                        <ProductList data={trendingProducts}/>
                    </div>
                </div>
            </section>

            <PopUpModel
                isModelOpen={isModelOpen} 
                setIsModelOpen={setIsModelOpen} 
                message="Please log in to add this product to your cart."/>
            </>
            }
        </Helmet>
    )
}
