import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CommonSection  from '../components/UI/CommonSection'
import '../Styles/product-details.css'
import { motion } from 'framer-motion'
import {Helmet} from '../components/Helmet/Helmet'
import ProductList from '../components/UI/ProductsList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/CartSlice'
import {toast} from 'react-toastify'
import { db } from '../firebaseConfig'
import { doc,  getDoc } from 'firebase/firestore'
// import products from '../assets/data/products'
import useGetFirestoreData from '../custom-hooks/useGetFirestoreData'

export const ProductDetails = () => {

    const {id } = useParams()
    const dispatch = useDispatch()
    const [products, loading ] = useGetFirestoreData("products")
    const docRef = doc(db, 'products', id )
    const [product, setProduct] = useState({})

    useEffect(()=> {
        const getProduct = async() => {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                console.log('no product!')
            }
        } 
        getProduct()
        console.log("q111111111111")
    }, [])

    console.log("222222222222222")


    const relatedProducts = products.filter(item => item.category === product.category )
    const [tab,setTab] = useState('desc')
    const [rating, setRating] = useState(null)
    const reviewUser = useRef('')
    const reviewMsg = useRef('')

    useEffect(() => {
        window.scrollTo(0,0)
    }, [id])

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image:product.imgUrl, 
            productName:product.productName,
            price:product.price,
        }))
        toast.success('product is added successfully')
    }


    const submithandler = (e) => {
        e.preventDefault()
        const reviewUserName = reviewUser.current.value
        const reviewUserMsg = reviewMsg.current.value
        const reviewObj = {
            userName : reviewUserName,
            text: reviewUserMsg,
            rating,
        }

        toast.success('Review is submitted successfully')
        e.current.reset()
    }



    const reviews = [
        {
            username: "Mohammad Kardi",
            rating: "3.5",
            text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ullam corrupti vitae aliquam in itaque fugit soluta necessitatibus rerum exercitationem, nam velit magnam explicabo expedita obcaecati earum totam libero laboriosam."
        },
        {
            username: "Ali Youns",
            rating: "4.0",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit cum odio placeat tenetur ea ipsa necessitatibus, recusandae cumque deleniti ratione."
        }
    ]

    return (
        <Helmet title ={product.productName}>
            <CommonSection title={product.productName}/>
            <section className='pt-0 pb-0'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <img src={product.imgUrl} alt="" />
                        </div>
                        <div className="col-lg-6">
                            <div className="product__details">
                                <h2>{product.productName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span><i className="ri-star-fill"></i></span>
                                        <span><i className="ri-star-fill"></i></span>
                                        <span><i className="ri-star-fill"></i></span>
                                        <span><i className="ri-star-fill"></i></span>
                                        <span><i className="ri-star-half-line"></i></span>
                                    </div>
                                    <p>
                                        (<span>4.5 </span> ratings)
                                    </p>
                                </div>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className='product__price'>${product.price}</span>
                                    <span>Category: {product.category}</span>
                                </div>
                                <p className='mt-3'>{product.shortDesc}</p>
                                <motion.button whileHover={{scale:1.1}}
                                    className="shop__btn"
                                    onClick={addToCart}>
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
                                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`}
                                    onClick={() => setTab('desc')}>
                                    Description
                                </h6>
                                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}
                                    onClick={() => setTab('rev')}>
                                        Reviews
                                    Reviews (2)
                                </h6>
                            </div>
                            {
                                tab === "desc" ? 
                                <div className="tab__content mt-5">
                                    <p>{product.description}</p>
                                </div> 
                                : 
                                <div className='product__review mt-5'>
                                    <div className="review__wrapper">
                                        <ul>
                                            {
                                                reviews?.map( (item, index) => (
                                                    <li key={index} className='mb-4'>
                                                        <h6>{item.username}</h6>
                                                        <span>{item.rating} (rating)</span>
                                                        <p>{item.text}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <div className="review__form">
                                            <h4>Leave your experience</h4>
                                            <form action="" onSubmit={submithandler}>
                                                <div className="form__group">
                                                    <input 
                                                        type="text" 
                                                        placeholder='Enter name'
                                                        ref={reviewUser}
                                                        required/>
                                                </div>
                                                <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                    <motion.span whileHover={{scale:1.2}}
                                                        onClick={() => setRating(1)}>
                                                        1<i className="ri-star-fill"></i>
                                                    </motion.span>
                                                    <motion.span whileHover={{scale:1.2}}
                                                        onClick={() => setRating(2)}>
                                                        2<i className="ri-star-fill"></i>
                                                    </motion.span>
                                                    <motion.span whileHover={{scale:1.2}}
                                                        onClick={() => setRating(3)}> 
                                                        3<i className="ri-star-fill"></i>
                                                    </motion.span>
                                                    <motion.span whileHover={{scale:1.2}}
                                                        onClick={() => setRating(4)}>
                                                        4<i className="ri-star-fill"></i>
                                                    </motion.span>
                                                    <motion.span whileHover={{scale:1.2}}
                                                        onClick={() => setRating(5)}>
                                                        5<i className="ri-star-fill"></i>
                                                    </motion.span>
                                                </div>
                                                <div className="form__group">
                                                    <textarea 
                                                        rows={4} 
                                                        type="text" 
                                                        placeholder='Review Message...'
                                                        ref={reviewMsg}
                                                        required/>
                                                </div>
                                                <motion.button whileHover={{scale:1.2}}
                                                    className="shop__btn"
                                                    type='submit'>
                                                    Submit
                                                </motion.button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="col-lg-12 mt-5  text-center">
                            <h2 className="related__title">
                                You might also like
                            </h2>
                        </div>
                        <ProductList data={relatedProducts}/>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
