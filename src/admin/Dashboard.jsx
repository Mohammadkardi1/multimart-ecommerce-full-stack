import React, {useEffect} from 'react'
import { Helmet } from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../Styles/dashboard.css'
import useGetFirestoreData from '../custom-hooks/useGetFirestoreData'
import { Link } from 'react-router-dom'

export const Dashboard = () => {


    const [getProductsData, getProductsLoading] = useGetFirestoreData("products")
    const [getUsersData, getUsersLoading ] = useGetFirestoreData("users")

    useEffect(()=> {
        window.scrollTo(0,0)
    })

    return (
        <Helmet title={'Dashboard'}>
            <Container>
                <Row className='py-5 g-4'>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="revenue__box box">
                            <h6>Total Sales</h6>
                            <span>$7890</span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="order__box box">
                            <h6>Orders</h6>
                            <span>89</span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="products__box box">
                            <h6>Total Products</h6>
                            <span className={`${getProductsLoading ? 'invisible': 'visible'}`}>{getProductsData.length}</span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="users__box box">
                            <h6>Total Users</h6>
                            <span className={`${getUsersLoading ? 'invisible': 'visible'}`}>{getUsersData.length}</span>
                        </div>
                    </div>
                    <div className='col-12 pt-5 pb-3'>
                        <Link to='/home'>
                            Back to home
                        </Link>
                    </div>
                </Row>
            </Container>
            

        </Helmet>
    )
}
