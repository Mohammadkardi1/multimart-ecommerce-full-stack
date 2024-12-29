import {useState} from 'react'
import {motion} from 'framer-motion'
import '../../Styles/product-card.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addCart } from './../../redux/thunks/cartThunks';
import { authThunks } from './../../redux/slices/authSlice';
import { showToastFailure, showToastSuccess } from './../../utils/toastUtils';
import { useDispatch } from 'react-redux';
import { PopUpModel } from './../Model/PopUpModel';


const ProductCard = ({item}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isModelOpen, setIsModelOpen] = useState(false)

    const addToCart = async (productID, price) => {
        if (!JSON.parse(localStorage.getItem('profile'))?.data?._id ) {
            setIsModelOpen(true)
            return
        }
        try {
            const res = await dispatch(addCart({productID, price}))
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

    const clickHandler = () => {
        navigate(`/shop/${item?._id}`)
    }
    
    return (
    <>
        <div className="col-md-4 col-lg-3 bm-2">
            <div className='product__item  '>
                {/* <div className="product__img" onClick={clickHandler} role='button'>
                    <motion.img whileHover={{scale:1.1}} src={item?.imgUrl} alt="" />
                </div> */}
                <div className="aspect-square w-full overflow-hidden rounded-xl group" onClick={clickHandler}>
                    <img className="object-cover h-full w-full group-hover:scale-110 transition cursor-pointer" src={item?.imgUrl}/>
                </div>

                <div className='p-2 prouct__info'>
                    <h3 className="product__name">
                        <Link to={`/shop/${item?.id}`}>
                            {item?.productName}
                        </Link>
                    </h3>
                    <span className=''>{item?.category}</span>
                </div>
                <div className="product__card-bottom d-flex align-items-center 
                    justify-content-between p-2">
                    <div className="price">${item?.price}</div>
                    <motion.span whileHover={{scale:1.1}} onClick={() => addToCart(item?._id, item?.price)} role='button'>
                        <i className="ri-add-line"></i>
                    </motion.span>
                    
                </div>
                
            </div>
        </div>
        <PopUpModel
            isModelOpen={isModelOpen} 
            setIsModelOpen={setIsModelOpen} 
            message="Please log in to add this product to your cart."/>
    </>
    )
}

export default ProductCard