import React, { useState } from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection'
// import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductsList'
import '../Styles/shop.css'
import useGetFirestoreData from '../custom-hooks/useGetFirestoreData'


export const Shop = () => {

    const [productsData, setProductsData] = useState(null)
    const [products, loading ] = useGetFirestoreData("products")
    const filterHandler = (e) => {
        const result = products.filter((item) => item.category ===  e.target.value)
        setProductsData(result)
    }
    const sorthandler = (e) => {
        if (e.target.value === 'ascending') {
            const result = [...products].sort((a,b) => a.price - b.price)
            setProductsData(result)
        } else if (e.target.value === 'descending') {
            const result = [...products].sort((a,b) => b.price - a.price)
            setProductsData(result)
        } else {
            setProductsData([])
        }
    }
    const searchHandler = (e) => {
        if (e.target.value === "" ) {
            setProductsData([])
        } else {
            const searchedTerm = e.target.value
            const result = products.filter(item => item.productName.toLowerCase().includes(searchedTerm.toLowerCase()))
            setProductsData(result)
        }
    }


    return (
        <Helmet title={"Shop"}>
            <CommonSection title={'products'}/>
            <section className="pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="filter__widget">
                                <select
                                    onChange={filterHandler}>
                                    <option>Filter By Category</option>
                                    <option value="sofa">Sofa</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="chair">Chair</option>
                                    <option value="watch">Watch</option>
                                    <option value="wireless">Wireless</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 text-end">
                            <div className="filter__widget">
                                <select
                                    onChange={sorthandler}>
                                    <option>Sort By Category</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="search__box">
                                <input type="text"
                                    placeholder='Search...'
                                    onChange={searchHandler}/>
                                <span>
                                    <i class="ri-search-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
            {
                loading ? null :
                <section className='pt-5'>
                    <div className="container">
                        <div className="row">
                            {
                                productsData?.length === 0 ? <h1 className='text-center fs-4'>No products are found!</h1>
                                : <ProductsList data={productsData}/>
                            }
                        </div>
                    </div>
                </section>
            }
        </Helmet>
    )
}
