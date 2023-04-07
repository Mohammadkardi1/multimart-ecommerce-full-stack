import {Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Shop } from '../pages/Shop'
import { Cart } from '../pages/Cart'
import { ProductDetails } from '../pages/ProductDetails'
import { Checkout } from '../pages/Checkout'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'
// import ProtectedRoute from './DashboardRoute'
import { AddProduct } from '../admin/AddProduct'
import {AllProduct} from '../admin/AllProduct'
import { Dashboard } from '../admin/Dashboard'
import { Users } from '../admin/Users'
import ProductedRoute from './ProtuctedRoute'
import DashboardRoute from './DashboardRoute'

export const Routers = () => {
    return (
        <Routes>
            {/* <Route path='/' element={<Navigate to="home"/>}/> */}
            <Route path='home' element={<Home/>}/>
            <Route path='shop' element={<Shop/>}/>
            <Route path='shop/:id' element={<ProductDetails/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route 
                path='checkout' 
                element={
                <ProductedRoute> 
                    <Checkout/> 
                </ProductedRoute>
            } />



            <Route path='dashboard' element={<DashboardRoute/>}>
                <Route index element={<Dashboard/>}/>
                <Route  path='main' element={<Dashboard/>} />
                <Route path='all-products' element={<AllProduct/>}/>
                <Route path='add-product' element={<AddProduct/>}/>
                <Route path='users' element={<Users/>}/>
                {/* <Route path='dashboard/orders' element={<Orders/>}/> */}
            </Route>



            <Route path='login' element={<Login/>}/>
            <Route path='signup' element={<Signup/>}/>
        </Routes>
    )
}
