import React from 'react'
import {motion} from 'framer-motion'
import '../../Styles/product-card.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const ProductCard = ({item}) => {

    const navigate = useNavigate()
    const addToCart = () => {
        console.log("add To Cart")
    }

    const clickHandler = () => {
        navigate(`/shop/${item._id}`)
    }
    return (
        <div className="col-md-4 col-lg-3 bm-2">
            <div className='product__item  '>
                {/* <div className="product__img" onClick={clickHandler} role='button'>
                    <motion.img whileHover={{scale:1.1}} src={item.imgUrl} alt="" />
                </div> */}
                <div className="aspect-square w-full overflow-hidden rounded-xl group" onClick={clickHandler}>
                    <img className="object-cover h-full w-full group-hover:scale-110 transition cursor-pointer" src={item.imgUrl}/>
                </div>

                <div className='p-2 prouct__info'>
                    <h3 className="product__name">
                        <Link to={`/shop/${item.id}`}>
                            {item.productName}
                        </Link>
                    </h3>
                    <span className=''>{item.category}</span>
                </div>
                <div className="product__card-bottom d-flex align-items-center 
                    justify-content-between p-2">
                    <div className="price">${item.price}</div>
                    <motion.span whileHover={{scale:1.1}} onClick={addToCart} role='button'>
                        <i className="ri-add-line"></i>
                    </motion.span>
                    
                </div>
                
            </div>
        </div>
    )
}

export default ProductCard