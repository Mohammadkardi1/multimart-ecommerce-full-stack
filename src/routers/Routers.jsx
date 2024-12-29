import {Routes, Route, Navigate } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Shop } from '../pages/Shop'
import { Cart } from '../pages/Cart'
import { ProductDetails } from '../pages/ProductDetails'
import { Checkout } from '../pages/Checkout'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
// import ProtectedRoute from './DashboardRoute'
import { AddProduct } from '../admin/AddProduct'
import {AllProduct} from '../admin/AllProduct'
import { Dashboard } from '../admin/Dashboard'
import { Users } from '../admin/Users'
import DashboardRoute from './DashboardRoute'
import VerifyEmail from '../pages/VerifyEmail';
import AuthenticationProtect from './AuthenticationProtect'
import NotFoundPage from '../pages/NotFoundPage';
import { Orders } from '../admin/Orders';


export const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="home"/>}/>
            <Route path='home' element={<Home/>}/>



            <Route path='login' element={<AuthenticationProtect><Login/></AuthenticationProtect>}/>
            <Route path='register' element={<AuthenticationProtect><Register/></AuthenticationProtect>}/>
            <Route path='api/auth/:id/verify/:token' element={<AuthenticationProtect><VerifyEmail/></AuthenticationProtect>}/>


            <Route path='shop' element={<Shop/>}/>
            <Route path='shop/:productID' element={<ProductDetails/>}/>
            <Route path='cart' element={<Cart/>}/>


            <Route path='checkout' element={<Checkout/>} />


            <Route path='dashboard' element={<DashboardRoute/>}>
                <Route index element={<Navigate to="main" replace />}/>
                <Route path='main' element={<Dashboard/>} />
                <Route path='all-products' element={<AllProduct/>}/>
                <Route path='add-product' element={<AddProduct/>}/>
                <Route path='users' element={<Users/>}/>
                {/* <Route path='dashboard/orders' element={<Orders/>}/> */}
            </Route>


            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}
