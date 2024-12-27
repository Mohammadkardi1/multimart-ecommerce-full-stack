import React, { useState, useRef, useEffect } from 'react'
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

export const ProductDetails = () => {

    const { productID } = useParams()
    const dispatch = useDispatch()


    const { trendingProducts, product, productError, productLoading } = useSelector(state => state.product)


    useEffect(()=> {
        dispatch(getProductByID(productID))
        dispatch(getTrendingProducts(4))

    }, [])


    useEffect(() => {
        window.scrollTo(0,0)
    }, [productID])




    const addToCart = () => {
        console.log("add to cart")
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
                        <div className="col-lg-6"><img src={product?.imgUrl} alt="" /></div>
                        <div className="col-lg-6">
                            <div className="product__details">
                                <h2>{product?.productName}</h2>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className='product__price'>${product?.price}</span>
                                    <span>Category: {product?.category}</span>
                                </div>
                                <p className='mt-3'>{product?.shortDesc}</p>
                                <motion.button whileHover={{scale:1.1}} className="shop__btn" onClick={addToCart}>
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
                                <h6 className='active__tab'>Description</h6>
                            </div>
                            <div className="tab__content mt-3">
                                <p>{product?.description}</p>
                            </div> 


                        </div>
                        <div className="col-lg-12 mt-5  text-center">
                            <h2 className="related__title">
                                You might also like
                            </h2>
                        </div>
                        <ProductList data={trendingProducts}/>
                    </div>
                </div>
            </section>
            </>
            }
        </Helmet>
    )
}
