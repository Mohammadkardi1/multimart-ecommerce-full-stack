import React, { useState, useEffect } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
import ProductsList from '../components/UI/ProductsList'
import '../Styles/shop.css'
import { useDispatch } from 'react-redux';
import { getFilteredProducts } from './../redux/thunks/productThunks';
import { useSelector } from 'react-redux';
import ErrorModel from '../components/Model/ErrorModel'
import LoadingModel from './../components/Model/LoadingModel';


export const Shop = () => {

    const disptach = useDispatch()

    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const { products, productLoading, productError } = useSelector(state => state.product)

    const filterHandler = (e) => {
        setCategory(e.target.value)
    }

    const sorthandler = (e) => {
        setSort(e.target.value)
    }

    const searchHandler = (e) => {
        setSearchTerm(e.target.value)
    }


    const fetchFilteredProducts = async () => {
        try {
            const queryParams = new URLSearchParams()
            
            if (sort) { queryParams.append('sort', sort) }
            if (category) { queryParams.append('category', category) }
            if (searchTerm) { queryParams.append('searchTerm', searchTerm)} 
            
            await disptach(getFilteredProducts(queryParams.toString()))
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchFilteredProducts()
    }, [category, sort, searchTerm]); 


    return (
        <Helmet title={"Shop"}>

            <CommonSection title={'products'}/>

            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3 mb-2 mb-lg-0">
                            <div className="filter__widget">
                                <select onChange={filterHandler}>
                                    <option value="" disabled selected={category === ''}>Filter By Category</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-2 mb-lg-0 text-md-end">
                            <div className="filter__widget">
                                <select onChange={sorthandler }>
                                    <option value="" disabled  selected={sort === ''}>Sort By Price</option>
                                    <option value="Ascending">Ascending</option>
                                    <option value="Descending">Descending</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="search__box">
                                <input type="text" placeholder='Search...' onChange={searchHandler}/>
                                <span><i className="ri-search-line"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='pt-5'>
                <div className="container">
                    {productLoading && !productError && <LoadingModel styles={"h-[40vh]"}/>}
                    {productError && !productLoading && <ErrorModel errorMsg={productError} styles={"h-[40vh]"}/> }
                    {!productLoading && !productError && 
                    <div className="row mb-4">
                        <ProductsList data={products}/>
                    </div>
                    }
                </div>
            </section>
        </Helmet>
    )
}
