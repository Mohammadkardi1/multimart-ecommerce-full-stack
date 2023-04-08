import React from 'react'
import productImg from '../../assets/images/arm-chair-01.jpg'
import {motion} from 'framer-motion'
import '../../Styles/product-card.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {cartActions} from '../../redux/slices/CartSlice'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


const ProductCard = ({item}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.productName,
            imgUrl: item.imgUrl,
            price: item.price
        }))
        toast.success('product is added successfully');
    }

    const clickHandler = () => {
        navigate(`/shop/${item.id}`)
    }
    return (
        <div className="col-md-4 col-lg-3 bm-2">
            <div className='product__item'>
                <div className="product__img" onClick={clickHandler} role='button'>
                    <motion.img whileHover={{scale:1.1}} src={item.imgUrl} alt="" />
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
                    <span onClick={addToCart} role='button'>
                        <i class="ri-add-line"></i>
                    </span>
                    
                </div>
                
            </div>
        </div>
    )
}

export default ProductCard